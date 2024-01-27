import csrf from 'edge-csrf'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateAccessToken, validateToken } from '@/lib/eve-auth'

// initalize protection function
const csrfProtect = csrf({
    cookie: {
        secure: process.env.NODE_ENV === 'production',
    },
})

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // csrf protection
    const csrfError = await csrfProtect(request, response)

    // check result
    if (csrfError) {
        request.nextUrl.searchParams.set('from', request.nextUrl.pathname)
        request.nextUrl.pathname = '/unauthorized'

        return NextResponse.redirect(request.nextUrl)
    }

    const token = request.cookies.get('token')?.value
    const path = request.nextUrl.pathname
    if (token) {
        const validToken = await validateAccessToken(token).catch((e) => {
            return false
        })

        if (!validToken) {
            console.log('token invalid')
            request.nextUrl.pathname = '/'
            const r = NextResponse.redirect(request.nextUrl)
            r.cookies.delete('token')
            return r
        }
    }

    if (token && '/' === path) {
        console.log('wtf')
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if (path.startsWith('/dashboard')) {
        const x = request.cookies.get('token')
        console.log(x)
        if (!token) {
            console.log('no token wtf')
            request.nextUrl.pathname = '/'
            console.log(request.nextUrl.toString())
            return NextResponse.redirect(request.nextUrl)
        }
    }

    return response
}
