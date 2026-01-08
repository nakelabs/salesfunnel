import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ShippingPage = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal } = useCart();
    const [selectedAddress, setSelectedAddress] = useState('primary');
    const [selectedShipping, setSelectedShipping] = useState('express');
    const [timeRemaining, setTimeRemaining] = useState(14 * 60 + 32); // 14:32 in seconds

    const [contactInfo, setContactInfo] = useState({
        name: 'Chinedu Okafor',
        phone: '+234 801 234 5678',
        instructions: ''
    });

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const addresses = [
        {
            id: 'primary',
            name: 'Shop 4, Alaba International Market (Primary)',
            address: 'Ojo, Lagos State, Nigeria',
            phone: '+234 801 234 5678'
        },
        {
            id: 'warehouse',
            name: 'Warehouse B, Trade Fair Complex',
            address: 'Badagry Expressway, Lagos, Nigeria',
            phone: '+234 809 876 5432'
        }
    ];

    const shippingMethods = [
        {
            id: 'express',
            name: 'Express Delivery',
            duration: '2-3 Business Days',
            fee: 5000,
            icon: 'rocket_launch'
        },
        {
            id: 'standard',
            name: 'Standard Delivery',
            duration: '5-7 Business Days',
            fee: 2500,
            icon: 'local_shipping'
        },
        {
            id: 'pickup',
            name: 'Self Pickup',
            duration: 'Pick up from our central warehouse in Ikeja (Mon-Fri, 9am-5pm)',
            fee: 0,
            icon: 'storefront'
        }
    ];

    const subtotal = getCartTotal();
    const vatRate = 0.075;
    const vat = subtotal * vatRate;
    const shippingFee = shippingMethods.find(m => m.id === selectedShipping)?.fee || 0;
    const total = subtotal + vat + shippingFee;

    const formatPrice = (price) => `₦${price.toLocaleString()}`;

    const handleProceed = () => {
        // Navigate to review page (to be created)
        navigate('/checkout/review');
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="bg-background-light min-h-screen font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-3 shadow-sm">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="size-8 text-primary">
                            <span className="material-symbols-outlined text-3xl">inventory_2</span>
                        </div>
                        <h2 className="text-slate-900 text-xl font-bold">SalesFunnel</h2>
                    </div>

                    <nav className="hidden md:flex flex-1 justify-end gap-8 items-center">
                        <div className="flex items-center gap-8">
                            <Link to="/dashboard" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">
                                Dashboard
                            </Link>
                            <Link to="/orders" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">
                                Orders
                            </Link>
                            <a className="text-slate-600 hover:text-primary transition-colors text-sm font-medium" href="#">
                                Wallet
                            </a>
                            <a className="text-slate-600 hover:text-primary transition-colors text-sm font-medium" href="#">
                                Settings
                            </a>
                        </div>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="text-right hidden lg:block">
                                <p className="text-xs font-medium text-slate-900">Shop 4, Alaba Market</p>
                                <p className="text-[10px] text-slate-500">ID: SF-8821</p>
                            </div>
                            <div className="bg-primary/10 rounded-full size-10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">account_circle</span>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-6 py-8">
                {/* Progress Indicator */}
                <div className="mb-8 max-w-3xl mx-auto">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-end mb-1">
                            <p className="text-primary font-semibold text-sm uppercase tracking-wider">STEP 2 OF 4</p>
                            <p className="text-slate-500 text-sm font-medium">Shipping Information</p>
                        </div>
                        <div className="relative h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs font-medium text-slate-400 mt-1">
                            <span className="text-primary">Cart</span>
                            <span className="text-slate-900 font-bold">Shipping</span>
                            <span>Review</span>
                            <span>Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-slate-900 text-3xl font-black">Shipping Details</h1>
                            <p className="text-slate-500 text-base">Select your delivery address and preferred shipping method.</p>
                        </div>

                        {/* Delivery Address Section */}
                        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">location_on</span>
                                    <h3 className="text-slate-900 font-bold text-lg">Delivery Address</h3>
                                </div>
                                <button className="text-primary hover:text-blue-600 text-sm font-semibold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-base">add</span>
                                    Add New Address
                                </button>
                            </div>
                            <div className="p-6 grid gap-4">
                                {addresses.map((address) => (
                                    <label
                                        key={address.id}
                                        className={`relative flex items-start p-4 cursor-pointer rounded-lg border-2 transition-colors ${selectedAddress === address.id
                                                ? 'border-primary bg-blue-50/30'
                                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className="flex items-center h-5">
                                            <input
                                                type="radio"
                                                name="address"
                                                checked={selectedAddress === address.id}
                                                onChange={() => setSelectedAddress(address.id)}
                                                className="h-4 w-4 text-primary border-slate-300 focus:ring-primary"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm flex-1">
                                            <div className="flex justify-between">
                                                <span className="font-bold text-slate-900 block">{address.name}</span>
                                                {selectedAddress === address.id && (
                                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                                )}
                                            </div>
                                            <span className="text-slate-500 block mt-1">
                                                {address.address}<br />
                                                {address.phone}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* Shipping Method Section */}
                        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">local_shipping</span>
                                    <h3 className="text-slate-900 font-bold text-lg">Shipping Method</h3>
                                </div>
                            </div>
                            <div className="p-6 grid gap-4 sm:grid-cols-2">
                                {shippingMethods.slice(0, 2).map((method) => (
                                    <label
                                        key={method.id}
                                        className={`relative flex flex-col p-4 cursor-pointer rounded-lg border-2 transition-colors h-full ${selectedShipping === method.id
                                                ? 'border-primary bg-blue-50/30'
                                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`material-symbols-outlined text-2xl ${selectedShipping === method.id ? 'text-primary' : 'text-slate-400'
                                                }`}>
                                                {method.icon}
                                            </span>
                                            <input
                                                type="radio"
                                                name="shipping_method"
                                                checked={selectedShipping === method.id}
                                                onChange={() => setSelectedShipping(method.id)}
                                                className="h-4 w-4 text-primary border-slate-300 focus:ring-primary"
                                            />
                                        </div>
                                        <span className="block text-sm font-bold text-slate-900 mb-1">{method.name}</span>
                                        <span className="block text-xs text-slate-500 mb-3">{method.duration}</span>
                                        <div className="mt-auto pt-2 border-t border-slate-200 flex justify-between items-center">
                                            <span className="text-xs font-medium text-slate-500">Fee</span>
                                            <span className="text-sm font-bold text-slate-900">{formatPrice(method.fee)}</span>
                                        </div>
                                    </label>
                                ))}

                                {/* Self Pickup - Full Width */}
                                <label
                                    className={`relative flex flex-col p-4 cursor-pointer rounded-lg border-2 transition-colors sm:col-span-2 ${selectedShipping === 'pickup'
                                            ? 'border-primary bg-blue-50/30'
                                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center h-5">
                                            <input
                                                type="radio"
                                                name="shipping_method"
                                                checked={selectedShipping === 'pickup'}
                                                onChange={() => setSelectedShipping('pickup')}
                                                className="h-4 w-4 text-primary border-slate-300 focus:ring-primary"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-slate-400">storefront</span>
                                                    <span className="block text-sm font-bold text-slate-900">Self Pickup</span>
                                                </div>
                                                <span className="text-sm font-bold text-green-600">Free</span>
                                            </div>
                                            <span className="block text-xs text-slate-500 mt-1 ml-8">
                                                Pick up from our central warehouse in Ikeja (Mon-Fri, 9am-5pm)
                                            </span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </section>

                        {/* Contact Person Section */}
                        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                    <h3 className="text-slate-900 font-bold text-lg">Contact Person</h3>
                                </div>
                            </div>
                            <div className="p-6 grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="contact-name">
                                        Full Name
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-slate-300 bg-white text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        id="contact-name"
                                        type="text"
                                        value={contactInfo.name}
                                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="contact-phone">
                                        Phone Number
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-slate-300 bg-white text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        id="contact-phone"
                                        type="tel"
                                        value={contactInfo.phone}
                                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="delivery-notes">
                                        Delivery Instructions (Optional)
                                    </label>
                                    <textarea
                                        className="w-full rounded-lg border-slate-300 bg-white text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        id="delivery-notes"
                                        placeholder="Gate code, directions, etc."
                                        rows="2"
                                        value={contactInfo.instructions}
                                        onChange={(e) => setContactInfo({ ...contactInfo, instructions: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-4">
                            {/* Stock Reserved Alert */}
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3">
                                <span className="material-symbols-outlined text-amber-600 shrink-0">timer</span>
                                <div>
                                    <p className="text-sm font-semibold text-amber-800">Stock Reserved</p>
                                    <p className="text-xs text-amber-700">
                                        Items in your cart are reserved for {formatTime(timeRemaining)} mins.
                                    </p>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-slate-900 font-bold text-lg mb-4">Order Summary</h3>

                                    <div className="mb-4 pb-4 border-b border-slate-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                                {cartItems.length} ITEMS
                                            </span>
                                            <Link to="/cart" className="text-xs text-primary hover:underline">
                                                View Cart
                                            </Link>
                                        </div>
                                        <div className="flex -space-x-2 overflow-hidden">
                                            {cartItems.slice(0, 3).map((item, index) => (
                                                <img
                                                    key={index}
                                                    alt={item.name}
                                                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                                                    src={item.image}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-slate-600">
                                            <span>Subtotal</span>
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-600">
                                            <span>Shipping</span>
                                            <span>{shippingFee === 0 ? <span className="text-green-600 font-semibold">Free</span> : formatPrice(shippingFee)}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-600">
                                            <span>VAT (7.5%)</span>
                                            <span>{formatPrice(vat)}</span>
                                        </div>
                                        <div className="h-px bg-slate-200 my-2"></div>
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-slate-900 font-bold text-lg">Total</span>
                                            <span className="text-2xl font-black text-slate-900 tracking-tight">
                                                {formatPrice(total)}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleProceed}
                                        className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-md transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
                                    >
                                        <span>Proceed to Review</span>
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>

                                <div className="bg-slate-50 px-6 py-4 text-center border-t border-slate-200">
                                    <Link to="/cart" className="text-primary text-sm font-medium hover:underline">
                                        Return to cart
                                    </Link>
                                </div>
                            </div>

                            <div className="text-center pt-2">
                                <p className="text-sm text-slate-500">Need help with shipping?</p>
                                <a className="text-sm font-medium text-slate-900 hover:text-primary transition-colors" href="#">
                                    Contact Wholesale Support
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ShippingPage;
