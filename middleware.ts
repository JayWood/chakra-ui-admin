import csrf from 'edge-csrf';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// initalize protection function
const csrfProtect = csrf({
    cookie: {
        secure: process.env.NODE_ENV === 'production',
    },
});

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // csrf protection
    const csrfError = await csrfProtect(request, response);

    // check result
    if (csrfError) {
        request.nextUrl.searchParams.set('from', request.nextUrl.pathname)
        request.nextUrl.pathname = '/unauthorized'

        return NextResponse.redirect(request.nextUrl)
    }

    return response;
}
