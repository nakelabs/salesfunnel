import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

const DistributorSidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const navItems = [
        { path: '/distributor-dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: '/inventory', icon: 'package_2', label: 'Inventory' },
        { path: '/payments', icon: 'credit_card', label: 'Payments' },
        { path: '/settings', icon: 'settings', label: 'Settings' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
                style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
            >
                {/* Logo */}
                <div className="p-6 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <img src="/images/logo.png" alt="SalesFunnel" className="h-14 w-auto" />
                        <p className="text-slate-500 text-xs font-medium">Distributor Panel</p>
                    </div>

                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 flex flex-col gap-2 mt-6 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => onClose()}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(item.path)
                                ? 'bg-primary text-white shadow-md'
                                : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-slate-100">
                    <Link
                        to="/distributor-profile"
                        onClick={() => onClose()}
                        className="flex items-center gap-3 hover:bg-slate-50 p-3 rounded-xl transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-white shadow-sm">
                            <span className="material-symbols-outlined text-primary">account_circle</span>
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-sm font-semibold text-slate-900">James Wilson</p>
                            <p className="text-xs text-slate-500">Global Distributors</p>
                        </div>
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default DistributorSidebar;
