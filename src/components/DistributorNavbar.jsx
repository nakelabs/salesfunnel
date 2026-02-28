import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';

const DistributorNavbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/distributor-dashboard', label: 'Dashboard' },
        { path: '/distributor-orders', label: 'Orders' },
        { path: '/inventory', label: 'Inventory' },
        { path: '/payments', label: 'Payments' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-slate-50 sticky top-0 z-50" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary p-2 rounded-lg">
                            <span className="material-symbols-outlined text-2xl">inventory_2</span>
                        </div>
                        <div>
                            <h1 className="text-slate-900 text-lg font-bold leading-tight">SalesFunnel</h1>
                            <p className="text-slate-500 text-xs font-medium">Distributor Panel</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(item.path)
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <Link to="/distributor-notifications" className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        </Link>

                        {/* User Profile */}
                        <Link to="/distributor-profile" className="flex items-center gap-3 hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-[20px]">account_circle</span>
                            </div>
                            <div className="hidden lg:block">
                                <p className="text-sm font-semibold text-slate-900">James Wilson</p>
                                <p className="text-xs text-slate-500">Global Distributors</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden pb-3 flex gap-1 overflow-x-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${isActive(item.path)
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default DistributorNavbar;
