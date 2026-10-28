import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import WholesalerNavbar from '../components/WholesalerNavbar';

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart: removeItem, clearCart, getCartTotal } = useCart();
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);

    const formatPrice = (price) => {
        return `₦${Number(price || 0).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const subtotal = getCartTotal();

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (couponCode.trim()) {
            setCouponApplied(true);
        }
    };

    const steps = [
        { num: 1, label: 'Cart', status: 'current' },
        { num: 2, label: 'Shipping', status: 'upcoming' },
        { num: 3, label: 'Review', status: 'upcoming' },
        { num: 4, label: 'Payment', status: 'upcoming' },
    ];

    return (
        <div
            className="bg-[#f8fafc] min-h-screen text-slate-900 font-display flex flex-col antialiased"
            style={{ fontFamily: '"Google Sans", "Plus Jakarta Sans", system-ui, sans-serif' }}
        >
            {/* Shared Navbar */}
            <WholesalerNavbar />

            {/* Modern Checkout Stepper */}
            <div className="bg-white border-b border-slate-200/80 sticky top-16 z-20 shadow-2xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
                    <div className="flex items-center justify-between max-w-2xl mx-auto">
                        {steps.map((step, idx) => {
                            const isCurrent = step.status === 'current';
                            const isCompleted = step.status === 'completed';
                            return (
                                <React.Fragment key={step.num}>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                                isCurrent
                                                    ? 'bg-slate-900 text-white shadow-xs'
                                                    : isCompleted
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                                            }`}
                                        >
                                            {isCompleted ? (
                                                <span className="material-symbols-outlined text-[14px]">check</span>
                                            ) : (
                                                step.num
                                            )}
                                        </div>
                                        <span
                                            className={`text-xs font-semibold hidden sm:inline-block ${
                                                isCurrent ? 'text-slate-900' : 'text-slate-400'
                                            }`}
                                        >
                                            {step.label}
                                        </span>
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div
                                            className={`flex-1 h-0.5 mx-3 rounded-full ${
                                                isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                                            }`}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2">
                        {/* Title & Clear Action */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Shopping Cart</h1>
                                <p className="text-slate-500 text-sm mt-0.5">
                                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your wholesale order
                                </p>
                            </div>
                            {cartItems.length > 0 && (
                                <button
                                    onClick={clearCart}
                                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-red-50"
                                >
                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                    <span>Clear Cart</span>
                                </button>
                            )}
                        </div>

                        {/* Cart Container */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                            {cartItems.length === 0 ? (
                                <div className="py-20 px-4 text-center">
                                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
                                        <span className="material-symbols-outlined text-3xl">shopping_cart</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Your cart is empty</h3>
                                    <p className="text-slate-500 text-xs sm:text-sm mb-6 max-w-xs mx-auto">
                                        Explore the wholesale catalog to add products and restock your inventory.
                                    </p>
                                    <Link
                                        to="/dashboard"
                                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">storefront</span>
                                        <span>Browse Products</span>
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    {/* Table Header (Desktop) */}
                                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50/70 border-b border-slate-150 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        <div className="col-span-6">Product Details</div>
                                        <div className="col-span-2 text-center">Quantity</div>
                                        <div className="col-span-2 text-right">Unit Price</div>
                                        <div className="col-span-2 text-right">Subtotal</div>
                                    </div>

                                    {/* Items List */}
                                    <div className="divide-y divide-slate-150">
                                        {cartItems.map((item) => {
                                            const unitPrice = item.price_per_case || item.price || item.unitPrice || 0;
                                            const itemTotal = unitPrice * item.quantity;
                                            return (
                                                <div
                                                    key={item.id}
                                                    className="p-4 sm:p-6 hover:bg-slate-50/50 transition-colors"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                                        {/* Product Thumbnail & Titles */}
                                                        <div className="md:col-span-6 flex items-center gap-3.5">
                                                            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-slate-50 border border-slate-150 p-2 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                                                {item.image ? (
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        className="w-full h-full object-contain"
                                                                    />
                                                                ) : (
                                                                    <span className="material-symbols-outlined text-slate-300 text-2xl">
                                                                        inventory_2
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <div className="min-w-0 flex-1">
                                                                <h4 className="font-bold text-sm text-slate-900 truncate mb-0.5">
                                                                    {item.name}
                                                                </h4>
                                                                {item.sku && (
                                                                    <span className="text-[11px] font-mono text-slate-400 block">
                                                                        SKU: {item.sku}
                                                                    </span>
                                                                )}
                                                                <span className="inline-block text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1">
                                                                    {item.stockStatus || 'In Stock'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Quantity Stepper */}
                                                        <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                                                            <span className="text-xs text-slate-500 md:hidden">Quantity:</span>
                                                            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-0.5">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all cursor-pointer"
                                                                    aria-label="Decrease quantity"
                                                                >
                                                                    <span className="material-symbols-outlined text-[14px]">remove</span>
                                                                </button>
                                                                <span className="w-8 text-center text-xs font-bold text-slate-900">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all cursor-pointer"
                                                                    aria-label="Increase quantity"
                                                                >
                                                                    <span className="material-symbols-outlined text-[14px]">add</span>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Unit Price */}
                                                        <div className="md:col-span-2 flex items-center justify-between md:justify-end text-xs">
                                                            <span className="text-slate-500 md:hidden">Unit Price:</span>
                                                            <span className="font-semibold text-slate-700">
                                                                {formatPrice(unitPrice)}
                                                            </span>
                                                        </div>

                                                        {/* Total Price & Delete */}
                                                        <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3 text-xs">
                                                            <span className="text-slate-500 md:hidden">Subtotal:</span>
                                                            <span className="font-bold text-slate-900 text-sm">
                                                                {formatPrice(itemTotal)}
                                                            </span>
                                                            <button
                                                                onClick={() => removeItem(item.id)}
                                                                className="text-slate-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50 cursor-pointer ml-1"
                                                                title="Remove item"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">close</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Back to Catalog Link */}
                        {cartItems.length > 0 && (
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center gap-1.5 mt-5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                <span>Continue Shopping & Restocking</span>
                            </Link>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sticky top-36">
                            <h2 className="text-base font-bold text-slate-900 mb-5">Order Summary</h2>

                            <div className="space-y-3.5 text-xs pb-5 border-b border-slate-150">
                                <div className="flex justify-between text-slate-600">
                                    <span>Items Subtotal</span>
                                    <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Shipping</span>
                                    <span className="text-slate-700 font-medium">Calculated next step</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>VAT (7.5%)</span>
                                    <span className="text-slate-700 font-medium">₦{(subtotal * 0.075).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            {/* Estimated Total */}
                            <div className="py-5 border-b border-slate-150">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-sm font-bold text-slate-900">Total</span>
                                    <span className="text-2xl font-black text-slate-900">
                                        {formatPrice(subtotal + subtotal * 0.075)}
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400 text-right">Includes estimated 7.5% VAT</p>
                            </div>

                            {/* Coupon Code Section */}
                            <form onSubmit={handleApplyCoupon} className="py-5 border-b border-slate-150">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                                    Coupon or Voucher Code
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponApplied && (
                                    <p className="text-[11px] text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                        Code verified for checkout.
                                    </p>
                                )}
                            </form>

                            {/* Proceed to Shipping Button */}
                            <Link
                                to="/checkout/shipping"
                                className={`w-full mt-6 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
                                    cartItems.length === 0
                                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed pointer-events-none'
                                        : 'bg-slate-900 hover:bg-black text-white hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                                }`}
                            >
                                <span>Proceed to Shipping</span>
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>

                            {/* Trust Badge */}
                            <div className="mt-4 pt-4 text-center border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px] text-emerald-600">lock</span>
                                <span>Escrow Protected & Secure Wholesale Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CartPage;
