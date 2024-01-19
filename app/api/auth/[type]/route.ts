import { NextRequest, NextResponse } from 'next/server'
import { redirect, useSearchParams } from 'next/navigation'
import {
    getEveUrl,
    login,
    updateUser,
    validateToken,
} from '../../../../lib/eve-auth'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

type queryParams = {
    params: {
        type: 'login' | 'callback'
    }
}

const defaultApiHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
}

export async function GET(req: NextRequest, res: NextResponse) {
    if (0 > ['login', 'callback'].indexOf(res.params.type)) {
        return new Response(
            JSON.stringify({
                error: 'Not Found',
            }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'GET',
                    ...defaultApiHeaders,
                },
            }
        )
    }

    if (res.params.type == 'login') {
        redirect(getEveUrl('http://localhost:3000/api/auth/callback'))
    }

    if (req.nextUrl.searchParams.get('state') !== 'eve-auth') {
        return new Response(
            JSON.stringify({
                error: 'Not Authorized',
            }),
            {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'GET',
                    ...defaultApiHeaders,
                },
            }
        )
    }

    const result = await login(req.nextUrl.searchParams.get('code'))
    const responseData = result.data
    const decodedToken = await validateToken(responseData)

    const session = await getIronSession(req, res, {
        password: process.env.SECURE_SALT,
        cookieName: 'csrfToken',
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        },
    })

    session.username = decodedToken.name
    session.token = responseData.access_token

    await session.save()

    await updateUser(
        decodedToken,
        responseData.access_token,
        responseData.refresh_token
    )

    return NextResponse.redirect(new URL('/dashboard', req.url))
}
