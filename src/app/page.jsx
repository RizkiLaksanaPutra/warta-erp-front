'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const body = await res.json();
            if (res.ok) {
                router.push('/dashboard');
            } else {
                alert(body?.errors || 'Login failed');
            }
        } catch (err) {
            alert('Login error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-sm">
                <Image src="/logo.png" alt="Logo" width={200} height={200} className="mb-5" />

                <div className="text-center mb-5">
                    <h1 className="font-semibold text-2xl">Welcome</h1>
                    <p>Sign in to your account</p>
                </div>

                <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="mt-1 block w-full rounded-lg border border-primary px-4 py-2 focus:border-secondary focus:ring-2 focus:ring-secondary outline-none"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="mt-2 block w-full rounded-lg border border-primary px-4 py-2 focus:border-secondary focus:ring-2 focus:ring-secondary outline-none"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-5 bg-primary text-white font-semibold py-2 rounded-lg hover:bg-secondary transition cursor-pointer"
                    >
                        {loading ? 'wait' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
