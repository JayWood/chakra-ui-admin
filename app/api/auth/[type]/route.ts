import { NextRequest, NextResponse } from 'next/server'
import { redirect, useSearchParams } from 'next/navigation'
import { getEveUrl, login, validateToken } from '@/lib/eve-auth'
import { cookies } from 'next/headers'
import { updateUser } from '@/lib/db'

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

export async function POST(request: NextRequest, response: NextResponse) {
    if ('login' !== response.params.type) {
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

    redirect(getEveUrl('http://localhost:3000/api/auth/callback'))
}

export async function GET(req: NextRequest, res: NextResponse) {
    if ('callback' !== res.params.type) {
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

    await updateUser(
        decodedToken,
        responseData.access_token,
        responseData.refresh_token
    )

    const response = NextResponse.redirect(new URL('/dashboard', req.url))
    response.cookies.set('token', responseData.access_token, {
        secure: 'production' === process.env.NODE_ENV,
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
    })

    return response
}
