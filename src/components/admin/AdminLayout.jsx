import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    const location = useLocation();

    const navigation = [
        {
            section: 'User Management',
            items: [
                { name: 'Wholesalers', path: '/admin/wholesalers', icon: 'group' },
                { name: 'Distributors', path: '/admin/distributors', icon: 'store' },
                { name: 'Approval Queue', path: '/admin/approvals', icon: 'approval', badge: 3 }
            ]
        },
        {
            section: 'Operations',
            items: [
                { name: 'Live Orders', path: '/admin/orders', icon: 'shopping_cart' },
                { name: 'Payments', path: '/admin/payments', icon: 'payments', badge: 5 },
                { name: 'SLA Monitor', path: '/admin/sla', icon: 'timer' }
            ]
        },
        {
            section: 'Tools',
            items: [
                { name: 'Manual Override', path: '/admin/override', icon: 'build' },
                { name: 'Code Reset', path: '/admin/codes', icon: 'lock_reset' }
            ]
        }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-screen">
                {/* Logo */}
                <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg p-2">
                            <span className="material-symbols-outlined text-white text-2xl">admin_panel_settings</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-900">SalesFunnel</h1>
                            <p className="text-xs font-medium text-slate-500">Admin Portal</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                    {navigation.map((section, idx) => (
                        <div key={idx} className={idx > 0 ? 'mt-6' : ''}>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                                {section.section}
                            </p>
                            <div className="space-y-1">
                                {section.items.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(item.path)
                                                ? 'bg-primary text-white'
                                                : 'text-slate-600 hover:bg-slate-100'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                            <span>{item.name}</span>
                                        </div>
                                        {item.badge && (
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isActive(item.path)
                                                    ? 'bg-white text-primary'
                                                    : 'bg-red-100 text-red-600'
                                                }`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Admin User */}
                <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary">account_circle</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">Admin User</p>
                            <p className="text-xs text-slate-500">admin@salesfunnel.com</p>
                        </div>
                    </div>
                    <Link
                        to="/admin/login"
                        className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
