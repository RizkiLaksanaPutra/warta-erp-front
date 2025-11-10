// src/middleware.js
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = [
    '/',
    '/api/auth/login',
    '/api/auth/logout',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/_next/static',
    '/_next/image',
];

function isPublic(pathname) {
    return PUBLIC_PATHS.some((p) => {
        if (p === '/') return pathname === '/';
        return pathname.startsWith(p);
    });
}

export function proxy(req) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('token')?.value;

    if (isPublic(pathname)) {
        if (pathname === '/' && token) {
            const url = req.nextUrl.clone();
            url.pathname = '/dashboard';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = '/';
        url.searchParams.set('from', pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
