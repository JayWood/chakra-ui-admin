import { NextRequest } from 'next/server'
import { redirect, useSearchParams } from 'next/navigation'
import {
    getEveUrl,
    login,
    updateUser,
    validateToken,
} from '../../../../lib/eve-auth'

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

export async function GET(req: NextRequest, { params }: queryParams) {
    if (0 > ['login', 'callback'].indexOf(params.type)) {
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

    if (params.type == 'login') {
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

    await updateUser(
        decodedToken,
        responseData.access_token,
        responseData.refresh_token
    )

    return new Response('', {
        status: 303,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET',
            Location: '/dashboard',
            'Set-Cookie': `token=${responseData.access_token}; HttpOnly; Path=/; Secure; SameSite=Strict`,
            ...defaultApiHeaders,
        },
    })
}
