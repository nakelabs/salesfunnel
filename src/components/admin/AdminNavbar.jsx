import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState(null);

    const navigation = [
        {
            section: 'User Management',
            items: [
                { name: 'Wholesalers', path: '/admin/wholesalers' },
                { name: 'Distributors', path: '/admin/distributors' },
                { name: 'Approval Queue', path: '/admin/approvals', badge: 3 }
            ]
        },
        {
            section: 'Operations',
            items: [
                { name: 'Live Orders', path: '/admin/orders' },
                { name: 'Payments', path: '/admin/payments', badge: 5 },
                { name: 'SLA Monitor', path: '/admin/sla' }
            ]
        },
        {
            section: 'Tools',
            items: [
                { name: 'Manual Override', path: '/admin/override' },
                { name: 'Code Reset', path: '/admin/codes' }
            ]
        }
    ];

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    const isActiveSection = (section) => {
        return section.items.some(item => location.pathname === item.path);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            <div className="flex h-16 items-center justify-between px-6 lg:px-8">
                {/* Logo */}
                <Link to="/admin" className="flex items-center gap-3">
                    <img src="/images/logo.png" alt="SalesFunnel" className="h-14 w-auto" />
                    <p className="text-xs font-medium text-slate-500">Admin Portal</p>
                </Link>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center gap-6">
                    <Link
                        to="/admin/dashboard"
                        className={`text-sm font-semibold transition-colors ${location.pathname === '/admin' || location.pathname === '/admin/dashboard'
                            ? 'text-slate-900'
                            : 'text-slate-600 hover:text-primary'
                            }`}
                    >
                        Dashboard
                    </Link>

                    {navigation.map((section) => (
                        <div
                            key={section.section}
                            className="relative"
                        >
                            <button
                                onClick={() => setOpenDropdown(openDropdown === section.section ? null : section.section)}
                                className={`text-sm font-semibold transition-colors flex items-center gap-1 ${isActiveSection(section)
                                    ? 'text-slate-900'
                                    : 'text-slate-600 hover:text-primary'
                                    }`}
                            >
                                {section.section}
                                <span className="material-symbols-outlined text-[16px]">
                                    {openDropdown === section.section ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {openDropdown === section.section && (
                                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                                    {section.items.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setOpenDropdown(null)}
                                            className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${isActivePath(item.path)
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            <span>{item.name}</span>
                                            {item.badge && (
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isActivePath(item.path)
                                                    ? 'bg-primary text-white'
                                                    : 'bg-red-100 text-red-600'
                                                    }`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Admin User & Logout */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-[20px]">account_circle</span>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-semibold text-slate-900">Admin User</p>
                            <p className="text-[10px] text-slate-500">admin@salesfunnel.com</p>
                        </div>
                    </div>
                    <Link
                        to="/admin/login"
                        className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        <span className="hidden sm:inline">Logout</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
