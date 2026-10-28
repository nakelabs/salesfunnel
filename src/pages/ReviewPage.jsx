import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import WholesalerNavbar from '../components/WholesalerNavbar';
import orderService from '../services/order.service';

const ReviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems, getCartTotal, isCartLoading } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Use shipping details from previous step
    const deliveryDetails = location.state?.deliveryDetails;

    useEffect(() => {
        if (!deliveryDetails && cartItems.length > 0) {
            navigate('/checkout/shipping');
        }
    }, [deliveryDetails, cartItems, navigate]);

    if (!deliveryDetails) return null;

    const subtotal = getCartTotal();
    const shipping = deliveryDetails.shippingFee || 0;
    const vatRate = 0.075;
    const vat = subtotal * vatRate;
    const total = subtotal + shipping + vat;

    const formatPrice = (price) => `₦${Number(price || 0).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const handleConfirmOrder = async () => {
        try {
            setIsSubmitting(true);
            setSubmitError(null);
            
            const isDelivery = deliveryDetails.selectedShipping === 'delivery';
            const fullAddress = deliveryDetails.address 
                ? `${deliveryDetails.address}${deliveryDetails.city ? ', ' + deliveryDetails.city : ''}`
                : '';

            const payload = {
                notes: deliveryDetails.instructions || "",
                delivery_address: isDelivery ? fullAddress : "",
                is_delivery: isDelivery,
                contact_name: deliveryDetails.name || "",
                contact_phone_no: deliveryDetails.phone || ""
            };

            const response = await orderService.create(payload);
            navigate('/checkout/payment', { state: { orderId: response.id || response.order_id } });
        } catch (error) {
            console.error('Failed to create order:', error);
            setSubmitError('An error occurred while creating your order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (!isCartLoading && cartItems.length === 0 && !isSubmitting) {
            navigate('/cart');
        }
    }, [cartItems.length, isCartLoading, isSubmitting, navigate]);

    if (isCartLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="w-10 h-10 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    const steps = [
        { num: 1, label: 'Cart', status: 'completed' },
        { num: 2, label: 'Shipping', status: 'completed' },
        { num: 3, label: 'Review', status: 'current' },
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Review Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Review Your Order</h1>
                            <p className="text-slate-500 text-sm mt-0.5">Please verify your items and delivery destination before payment.</p>
                        </div>

                        {submitError && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
                                {submitError}
                            </div>
                        )}

                        {/* Delivery Destination Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-150 mb-3">
                                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600 text-[18px]">local_shipping</span>
                                    <span>Delivery Information</span>
                                </h3>
                                <Link to="/checkout/shipping" className="text-xs font-bold text-blue-600 hover:underline">
                                    Edit
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                <div>
                                    <span className="text-slate-400 block mb-0.5">Destination Address</span>
                                    <p className="font-semibold text-slate-800">
                                        {deliveryDetails.address} {deliveryDetails.city && `— ${deliveryDetails.city}`}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-slate-400 block mb-0.5">Receiving Manager</span>
                                    <p className="font-semibold text-slate-800">
                                        {deliveryDetails.name} • {deliveryDetails.phone}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-slate-400 block mb-0.5">Fulfillment Method</span>
                                    <p className="font-semibold text-slate-800">{deliveryDetails.method}</p>
                                </div>
                                {deliveryDetails.instructions && (
                                    <div>
                                        <span className="text-slate-400 block mb-0.5">Delivery Notes</span>
                                        <p className="text-slate-600 italic">{deliveryDetails.instructions}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Items Table */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                            <div className="px-5 py-3.5 border-b border-slate-150 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-slate-900">
                                    Items in Order ({cartItems.length})
                                </h3>
                                <Link to="/cart" className="text-xs font-bold text-blue-600 hover:underline">
                                    Edit Cart
                                </Link>
                            </div>
                            <div className="divide-y divide-slate-150">
                                {cartItems.map((item) => {
                                    const unitPrice = item.price_per_case || item.price || item.unitPrice || 0;
                                    const itemTotal = unitPrice * item.quantity;
                                    return (
                                        <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-150 p-1.5 flex-shrink-0 flex items-center justify-center">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                    ) : (
                                                        <span className="material-symbols-outlined text-slate-300 text-lg">inventory_2</span>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                                                    <p className="text-[11px] text-slate-500">
                                                        Qty: <span className="font-semibold text-slate-800">{item.quantity} cases</span> × {formatPrice(unitPrice)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <span className="text-xs font-bold text-slate-900">{formatPrice(itemTotal)}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sticky top-36">
                            <h2 className="text-base font-bold text-slate-900 mb-5">Final Summary</h2>

                            <div className="space-y-3 text-xs pb-5 border-b border-slate-150">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
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
                                    <span className="text-sm font-bold text-slate-900">Total Due</span>
                                    <span className="text-2xl font-black text-slate-900">{formatPrice(total)}</span>
                                </div>
                                <p className="text-[11px] text-slate-400 text-right">Protected by Escrow</p>
                            </div>

                            {/* Escrow Guarantee Box */}
                            <div className="my-5 p-3.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5">
                                <span className="material-symbols-outlined text-[18px] text-emerald-600 flex-shrink-0 mt-0.5">verified_user</span>
                                <p className="text-[11px] leading-relaxed">
                                    <strong className="font-bold">Escrow Guarantee:</strong> Funds are securely held until you inspect and accept your goods.
                                </p>
                            </div>

                            <button
                                onClick={handleConfirmOrder}
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Creating Order…</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Confirm Order & Pay Now</span>
                                        <span className="material-symbols-outlined text-[16px]">lock</span>
                                    </>
                                )}
                            </button>

                            <Link
                                to="/checkout/shipping"
                                className="w-full mt-2.5 py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 block"
                            >
                                Back to Shipping
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReviewPage;
