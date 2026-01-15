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
                        <div className="flex items-center justify-center size-10 rounded-lg bg-primary text-white">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h1 className="text-xl font-black tracking-tight text-slate-900">SalesFunnel</h1>
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
