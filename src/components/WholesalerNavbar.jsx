import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const WholesalerNavbar = () => {
    const { getCartItemsCount } = useCart();
    const location = useLocation();

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    return (
        <header
            className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all"
            style={{ fontFamily: '"Google Sans", "Plus Jakarta Sans", system-ui, sans-serif' }}
        >
            <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo & Platform Tag */}
                <div className="flex items-center gap-3">
                    <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <img src="/images/logo.png" alt="SalesFunnel" className="h-8 w-auto object-contain" />
                    </Link>
                    <span className="hidden sm:inline-block px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-md border border-slate-200">
                        Wholesale
                    </span>
                </div>

                {/* Center Navigation Tabs */}
                <nav className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 shadow-inner">
                    <Link
                        to="/dashboard"
                        className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                            isActivePath('/dashboard')
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        Catalog
                    </Link>
                    <Link
                        to="/orders"
                        className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                            isActivePath('/orders')
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        My Orders
                    </Link>
                </nav>

                {/* Right Action Icons */}
                <div className="flex items-center gap-2">
                    {/* Cart Button */}
                    <Link
                        to="/cart"
                        className="relative flex items-center justify-center w-10 h-10 rounded-full text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-200"
                        title="Shopping Cart"
                    >
                        <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
                        {getCartItemsCount() > 0 && (
                            <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-md animate-pulse">
                                {getCartItemsCount()}
                            </span>
                        )}
                    </Link>

                    {/* Notifications Button */}
                    <Link
                        to="/notifications"
                        className="relative flex items-center justify-center w-10 h-10 rounded-full text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-200"
                        title="Notifications"
                    >
                        <span className="material-symbols-outlined text-[22px]">notifications</span>
                        <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm">
                            3
                        </span>
                    </Link>

                    {/* Profile */}
                    <Link
                        to="/profile"
                        className="flex items-center justify-center w-10 h-10 rounded-full text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-200"
                        title="My Profile"
                    >
                        <span className="material-symbols-outlined text-[24px]">account_circle</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default WholesalerNavbar;
