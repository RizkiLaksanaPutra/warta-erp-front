import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const body = await apiResponse.json();

        if (!apiResponse.ok) {
            return NextResponse.json({ errors: body?.errors || 'Login failed' }, { status: apiResponse.status });
        }

        const token = body?.data?.token;
        if (!token) return NextResponse.json({ errors: 'Token missing' }, { status: 500 });

        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ errors: e?.message || 'Internal error' }, { status: 500 });
    }
}
