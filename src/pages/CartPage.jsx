

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import WholesalerNavbar from '../components/WholesalerNavbar';

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart: removeItem, clearCart, getCartTotal } = useCart();
    const [couponCode, setCouponCode] = useState('');

    const formatPrice = (price) => {
        return `₦${price.toLocaleString()}`;
    };

    const subtotal = getCartTotal();

    return (
        <div className="bg-background-light min-h-screen font-display" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Shared Navbar */}
            <WholesalerNavbar />

            {/* Progress Steps */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="mb-6">
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">STEP 1 OF 4</p>
                        <p className="text-sm text-slate-500">Shopping Cart</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex flex-col items-center flex-1">
                            <div className="w-full bg-primary h-1 rounded-full"></div>
                            <p className="text-xs font-semibold text-primary mt-2">Cart</p>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                            <div className="w-full bg-slate-200 h-1 rounded-full"></div>
                            <p className="text-xs font-medium text-slate-400 mt-2">Shipping</p>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                            <div className="w-full bg-slate-200 h-1 rounded-full"></div>
                            <p className="text-xs font-medium text-slate-400 mt-2">Review</p>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                            <div className="w-full bg-slate-200 h-1 rounded-full"></div>
                            <p className="text-xs font-medium text-slate-400 mt-2">Payment</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h1 className="text-3xl font-black tracking-tight text-slate-900">Shopping Cart</h1>
                            <p className="text-slate-500 mt-1">Review the items in your cart before proceeding to shipping.</p>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                            {/* Cart Header */}
                            <div className="flex items-center justify-between p-4 border-b border-slate-200">
                                <h2 className="font-bold text-slate-900">Items ({cartItems.length})</h2>
                                {cartItems.length > 0 && (
                                    <button
                                        onClick={clearCart}
                                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                        Clear Cart
                                    </button>
                                )}
                            </div>

                            {/* Column Headers */}
                            {cartItems.length > 0 && (
                                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <div className="col-span-5">Product</div>
                                    <div className="col-span-2 text-center">QTY</div>
                                    <div className="col-span-2 text-right">Unit Price</div>
                                    <div className="col-span-2 text-right">Total</div>
                                    <div className="col-span-1"></div>
                                </div>
                            )}

                            {/* Cart Items List */}
                            <div className="divide-y divide-slate-200">
                                {cartItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 px-4">
                                        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">shopping_cart</span>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Your cart is empty</h3>
                                        <p className="text-slate-500 text-center mb-6">Add some products to get started!</p>
                                        <Link
                                            to="/dashboard"
                                            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                                        >
                                            Browse Products
                                        </Link>
                                    </div>
                                ) : (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors">
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                                {/* Product Info */}
                                                <div className="md:col-span-5 flex items-center gap-4">
                                                    <div className="flex-shrink-0 size-20 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-bold text-slate-900 truncate">{item.name}</h3>
                                                        <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                                                        <p className={`text-xs font-medium mt-1 ${item.stockStatus.includes('Low') ? 'text-amber-600' : 'text-green-600'
                                                            }`}>
                                                            {item.stockStatus}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Quantity Selector */}
                                                <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                                                    <div className="flex items-center rounded-lg border border-slate-300 bg-white">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="flex h-10 w-10 items-center justify-center text-slate-600 hover:text-primary hover:bg-slate-50"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">remove</span>
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                            className="w-12 h-10 border-0 text-center font-semibold text-slate-900 focus:ring-0"
                                                        />
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="flex h-10 w-10 items-center justify-center text-slate-600 hover:text-primary hover:bg-slate-50"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">add</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Unit Price */}
                                                <div className="md:col-span-2 text-left md:text-right">
                                                    <span className="text-sm md:hidden font-medium text-slate-500 mr-2">Unit Price:</span>
                                                    <span className="font-medium text-slate-900">{formatPrice(item.unitPrice)}</span>
                                                </div>

                                                {/* Total Price */}
                                                <div className="md:col-span-2 text-left md:text-right">
                                                    <span className="text-sm md:hidden font-medium text-slate-500 mr-2">Total:</span>
                                                    <span className="font-bold text-slate-900">{formatPrice(item.unitPrice * item.quantity)}</span>
                                                </div>

                                                {/* Remove Button */}
                                                <div className="md:col-span-1 flex justify-start md:justify-end">
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-slate-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined">close</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Continue Shopping Link */}
                        {cartItems.length > 0 && (
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center gap-2 mt-6 text-primary hover:text-blue-600 font-medium"
                            >
                                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                                Continue Shopping
                            </Link>
                        )}
                    </div>

                    {/* Cart Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Cart Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-500">
                                    <span>Shipping calculated at next step</span>
                                    <span>-</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-500">
                                    <span>VAT calculated at checkout</span>
                                    <span>-</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-200 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-slate-900">Subtotal</span>
                                    <span className="text-2xl font-black text-slate-900">{formatPrice(subtotal)}</span>
                                </div>
                                <p className="text-xs text-slate-500 text-right">Excluding shipping & taxes</p>
                            </div>

                            {/* Coupon Code */}
                            <div className="mb-6">
                                <p className="text-sm font-semibold text-slate-700 mb-2">HAVE A COUPON CODE?</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>


                            {/* Proceed Button */}
                            <Link
                                to="/checkout/shipping"
                                className={`w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors mb-4 ${cartItems.length === 0 ? 'opacity-50 pointer-events-none' : ''
                                    }`}
                            >
                                Proceed to Shipping
                                <span className="material-symbols-outlined">local_shipping</span>
                            </Link>

                            {/* Support Link */}
                            <div className="text-center text-sm text-slate-600">
                                <p className="mb-1">Questions about bulk pricing?</p>
                                <a href="#" className="text-primary font-semibold hover:underline">Contact Wholesale Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CartPage;
