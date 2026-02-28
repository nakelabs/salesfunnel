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
        <>
            {/* Simplified Header */}
            <header className="sticky top-0 z-50 w-full bg-slate-50">
                <div className="flex h-16 items-center justify-between px-6 lg:px-8">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-3">
                        <img src="/images/logo.png" alt="SalesFunnel" className="h-14 w-auto" />
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link
                            to="/dashboard"
                            className={`text-sm font-semibold transition-colors ${isActivePath('/dashboard') ? 'text-slate-900' : 'text-slate-600 hover:text-primary'
                                }`}
                        >
                            Catalog
                        </Link>
                        <Link
                            to="/orders"
                            className={`text-sm font-semibold transition-colors ${isActivePath('/orders') ? 'text-slate-900' : 'text-slate-600 hover:text-primary'
                                }`}
                        >
                            My Orders
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Link to="/cart" className="relative rounded-lg p-2.5 text-slate-600 hover:bg-slate-100 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">shopping_cart</span>
                            {getCartItemsCount() > 0 && (
                                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                    {getCartItemsCount()}
                                </span>
                            )}
                        </Link>
                        <Link to="/notifications" className="relative rounded-lg p-2.5 text-slate-600 hover:bg-slate-100 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                3
                            </span>
                        </Link>
                        <Link to="/profile" className="rounded-lg p-2.5 text-slate-600 hover:bg-slate-100 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">account_circle</span>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
};

export default WholesalerNavbar;
