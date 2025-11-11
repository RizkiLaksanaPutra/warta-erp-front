'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '/icons/dashboard.svg' },
    { href: '/dashboard/branches', label: 'Branches', icon: '/icons/branches.svg' },
    { href: '/dashboard/employees', label: 'Employees', icon: '/icons/employees.svg' },
];

export default function DashboardLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <div className="min-h-screen w-full flex">
            <aside className={`h-screen flex flex-col justify-between py-6 px-4 bg-gray text-font-secondary transition-all duration-300 ${ collapsed ? 'w-20' : 'w-64'}`}>
                <div className="flex items-center justify-between mb-10 ml-1">
                    {!collapsed && (
                        <div className="flex items-center gap-2">
                            <img src="/images/logo.png" className="h-10" />
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => setCollapsed((v) => !v)}
                        className={`p-1 rounded-lg cursor-pointer bg-white hover:shadow transition ${collapsed ? 'mx-auto' : ''}`}
                    >
                        <Image
                            src="/icons/chevron-right.svg"
                            alt="Toggle"
                            width={20}
                            height={20}
                            className={`h-auto transition-transform ${collapsed ? '' : 'rotate-180'}`}
                        />
                    </button>
                </div>
                <nav>
                    <ul className="space-y-1.5">
                        {navItems.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`group flex items-center gap-3 rounded-xl p-3 ${
                                            active ? 'bg-secondary text-font-primary' : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        <Image
                                            src={item.icon}
                                            alt=""
                                            width={20}
                                            height={20}
                                            className={`h-auto opacity-80 group-hover:opacity-100 ${active ? 'opacity-100' : ''}`}
                                        />
                                        {!collapsed && (
                                            <span className={`text-sm font-medium ${active ? 'text-font-primary' : ''}`}>
                                                {item.label}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="p-3 mt-auto">
                    <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
                        <div className="h-8 w-8 rounded-full bg-linear-to-tr from-indigo-400 to-indigo-600" />
                        {!collapsed && (
                            <div className="leading-tight">
                                <p className="text-sm font-semibold">Owner</p>
                                <p className="text-xs text-gray-500">owner@warteg.app</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            <main className="flex-1 min-h-screen">{children}</main>
        </div>
    );
}
