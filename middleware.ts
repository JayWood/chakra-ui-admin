import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'

export async function middleware(request: NextRequest) {
    const res = NextResponse.next()
    const session = await getIronSession(request, res, {
        password: process.env.SECURE_SALT,
        cookieName: 'csrfToken',
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        },
    })

    console.log(session.username)

    // if (!session?.username) {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }
}

export const config = {
    matcher: '/dashboard/:path*',
}
