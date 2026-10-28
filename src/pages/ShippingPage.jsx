import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import WholesalerNavbar from '../components/WholesalerNavbar';
import profileService from '../services/profile.service';

const ShippingPage = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, isCartLoading } = useCart();
    const [selectedAddress, setSelectedAddress] = useState('business');
    const [selectedShipping, setSelectedShipping] = useState('delivery');

    const [businessAddress, setBusinessAddress] = useState('');
    const [profileLoading, setProfileLoading] = useState(true);

    const [customAddress, setCustomAddress] = useState({
        street: '',
        city: '',
        state: '',
        landmark: '',
    });

    const [contactInfo, setContactInfo] = useState({
        name: '',
        phone: '',
        instructions: ''
    });

    // Fetch wholesaler profile to get business address
    useEffect(() => {
        profileService.getWholesalerProfile().then((data) => {
            const profile = data.wholesaler_profile || {};
            setBusinessAddress(profile.business_address || data.address || '');
            if (data.full_name && !contactInfo.name) {
                setContactInfo(prev => ({ ...prev, name: data.full_name }));
            }
            if ((data.phone || profile.business_phone) && !contactInfo.phone) {
                setContactInfo(prev => ({ ...prev, phone: data.phone || profile.business_phone || '' }));
            }
        }).catch(() => { }).finally(() => setProfileLoading(false));
    }, []);

    const shippingMethods = [
        { id: 'delivery', name: 'Direct Doorstep Delivery', icon: 'local_shipping', duration: 'Dispatched directly to your address', fee: 0 },
        { id: 'pickup', name: 'Self Warehouse Pickup', icon: 'warehouse', duration: 'Pick up from regional distribution center', fee: 0 },
    ];

    const subtotal = getCartTotal();
    const vatRate = 0.075;
    const vat = subtotal * vatRate;
    const shippingFee = selectedShipping === 'pickup' ? 0 : (shippingMethods.find(m => m.id === selectedShipping)?.fee || 0);
    const total = subtotal + vat + shippingFee;

    const formatPrice = (price) => `₦${Number(price || 0).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const handleProceed = (e) => {
        e.preventDefault();
        const deliveryDetails = {
            address: selectedAddress === 'business' ? 'Business Address' : customAddress.street || 'Custom Address',
            city: selectedAddress === 'business' ? businessAddress : [customAddress.city, customAddress.state].filter(Boolean).join(', '),
            phone: contactInfo.phone,
            name: contactInfo.name,
            instructions: contactInfo.instructions,
            method: selectedShipping === 'pickup' ? 'Self Pickup' : 'Delivery',
            methodDuration: selectedShipping === 'pickup' ? 'Pick up from warehouse' : 'Delivered to your address',
            shippingFee: shippingFee,
            selectedShipping
        };
        navigate('/checkout/review', { state: { deliveryDetails } });
    };

    useEffect(() => {
        if (!isCartLoading && cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems.length, isCartLoading, navigate]);

    if (isCartLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="w-10 h-10 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return null;
    }

    const steps = [
        { num: 1, label: 'Cart', status: 'completed' },
        { num: 2, label: 'Shipping', status: 'current' },
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

            {/* Stepper */}
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
                <form onSubmit={handleProceed} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Shipping Form Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Delivery & Fulfillment</h1>
                            <p className="text-slate-500 text-sm mt-0.5">Select your destination address and dispatch preferences.</p>
                        </div>

                        {/* Shipping Method Cards */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                            <h3 className="text-sm font-bold text-slate-900 mb-3.5 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-600 text-[18px]">local_shipping</span>
                                <span>Fulfillment Method</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {shippingMethods.map((m) => {
                                    const isSelected = selectedShipping === m.id;
                                    return (
                                        <div
                                            key={m.id}
                                            onClick={() => setSelectedShipping(m.id)}
                                            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                                                isSelected
                                                    ? 'border-slate-900 bg-slate-50/70 shadow-xs'
                                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-slate-700 text-[20px]">{m.icon}</span>
                                                    <span className="text-xs font-bold text-slate-900">{m.name}</span>
                                                </div>
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-slate-900' : 'border-slate-300'}`}>
                                                    {isSelected && <div className="w-2 h-2 rounded-full bg-slate-900" />}
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-slate-500">{m.duration}</p>
                                            <span className="text-[11px] font-bold text-emerald-600 mt-2">Free Dispatch</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Address Selection */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                            <h3 className="text-sm font-bold text-slate-900 mb-3.5 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-600 text-[18px]">location_on</span>
                                <span>Delivery Destination</span>
                            </h3>

                            {/* Saved Address Option */}
                            <div className="space-y-3">
                                <div
                                    onClick={() => setSelectedAddress('business')}
                                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                        selectedAddress === 'business'
                                            ? 'border-slate-900 bg-slate-50/70 shadow-xs'
                                            : 'border-slate-200 hover:border-slate-300 bg-white'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold text-slate-900">Registered Business Address</span>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAddress === 'business' ? 'border-slate-900' : 'border-slate-300'}`}>
                                            {selectedAddress === 'business' && <div className="w-2 h-2 rounded-full bg-slate-900" />}
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 mt-1">
                                        {profileLoading ? 'Loading address…' : (businessAddress || 'No saved address found on profile.')}
                                    </p>
                                </div>

                                {/* Custom Address Option */}
                                <div
                                    onClick={() => setSelectedAddress('custom')}
                                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                        selectedAddress === 'custom'
                                            ? 'border-slate-900 bg-slate-50/70 shadow-xs'
                                            : 'border-slate-200 hover:border-slate-300 bg-white'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-slate-900">Ship to Another Address / Warehouse</span>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAddress === 'custom' ? 'border-slate-900' : 'border-slate-300'}`}>
                                            {selectedAddress === 'custom' && <div className="w-2 h-2 rounded-full bg-slate-900" />}
                                        </div>
                                    </div>

                                    {selectedAddress === 'custom' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200">
                                            <div className="sm:col-span-2">
                                                <input
                                                    type="text"
                                                    required={selectedAddress === 'custom'}
                                                    placeholder="Street Address or Warehouse Plot"
                                                    value={customAddress.street}
                                                    onChange={(e) => setCustomAddress({ ...customAddress, street: e.target.value })}
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    required={selectedAddress === 'custom'}
                                                    placeholder="City / Area"
                                                    value={customAddress.city}
                                                    onChange={(e) => setCustomAddress({ ...customAddress, city: e.target.value })}
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    required={selectedAddress === 'custom'}
                                                    placeholder="State (e.g. Lagos, Abuja)"
                                                    value={customAddress.state}
                                                    onChange={(e) => setCustomAddress({ ...customAddress, state: e.target.value })}
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recipient Contact Details */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                            <h3 className="text-sm font-bold text-slate-900 mb-3.5 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-600 text-[18px]">person</span>
                                <span>Receiving Contact</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">Receiving Manager Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        value={contactInfo.name}
                                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">Phone Number for Driver</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="e.g. 08012345678"
                                        value={contactInfo.phone}
                                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block font-semibold text-slate-700 mb-1">Delivery Notes / Gate Code (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Warehouse Gate B, Call before arrival"
                                        value={contactInfo.instructions}
                                        onChange={(e) => setContactInfo({ ...contactInfo, instructions: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sticky top-36">
                            <h2 className="text-base font-bold text-slate-900 mb-5">Order Breakdown</h2>

                            <div className="space-y-3 text-xs pb-5 border-b border-slate-150">
                                <div className="flex justify-between text-slate-600">
                                    <span>Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} cases)</span>
                                    <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Fulfillment</span>
                                    <span className="text-emerald-600 font-bold">Free</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>VAT (7.5%)</span>
                                    <span className="font-semibold text-slate-900">{formatPrice(vat)}</span>
                                </div>
                            </div>

                            <div className="py-5 border-b border-slate-150">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-sm font-bold text-slate-900">Total Payable</span>
                                    <span className="text-2xl font-black text-slate-900">{formatPrice(total)}</span>
                                </div>
                                <p className="text-[11px] text-slate-400 text-right">Escrow secured</p>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-6 py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                            >
                                <span>Continue to Review Order</span>
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </button>

                            <Link
                                to="/cart"
                                className="w-full mt-2.5 py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 block"
                            >
                                Back to Cart
                            </Link>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default ShippingPage;
