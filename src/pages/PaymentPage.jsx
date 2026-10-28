import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import WholesalerNavbar from '../components/WholesalerNavbar';
import paymentService from '../services/payment.service';
import authService from '../services/auth.service';

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems, getCartTotal, isCartLoading } = useCart();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
    const [billingIsSameAsShipping, setBillingIsSameAsShipping] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(12 * 60); // 12 mins
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    // Countdown timer for inventory hold
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

    const subtotal = getCartTotal();
    const shipping = subtotal > 150000 ? 0 : 5000;
    const vatRate = 0.075;
    const vat = subtotal * vatRate;
    const total = subtotal + shipping + vat;

    const formatPrice = (price) => `₦${Math.round(price).toLocaleString()}`;

    const paymentMethods = [
        {
            id: 'card',
            name: 'Paystack Secure Checkout',
            description: 'Instant verification with Debit/Credit Card, Bank USSD, or Bank App.',
            icon: 'credit_card',
            badges: ['Visa', 'Mastercard', 'Verve'],
            recommended: true,
            available: true,
        },
        {
            id: 'bank_transfer',
            name: 'Direct Corporate Wire / Transfer',
            description: 'Direct wire to SalesFunnel escrow account. Verification takes 5-10 mins.',
            icon: 'account_balance',
            badges: ['NIP', 'RTGS'],
            available: false,
            badgeText: 'Coming Soon',
        },
        {
            id: 'wallet',
            name: 'SalesFunnel Credit Line',
            description: 'Net-30 / Net-60 procurement credit for verified wholesale merchants.',
            icon: 'account_balance_wallet',
            badges: ['Wholesale Only'],
            available: false,
            badgeText: 'Requires Approval',
        }
    ];

    const handleProcessPayment = async () => {
        try {
            setIsProcessing(true);
            setPaymentError(null);

            const user = authService.getCurrentUser();
            const token = localStorage.getItem('token');
            const emailOrToken = token || (user?.email || 'user@example.com');
            const amountInKobo = Math.round(total * 100);
            const distributorId = cartItems.length > 0 && cartItems[0]._raw ? cartItems[0]._raw.distributor_id : "";

            const payload = {
                email: emailOrToken,
                amount: amountInKobo,
                subaccount: distributorId || "string"
            };

            const response = await paymentService.initializePayment(payload);

            if (response && response.authorization_url) {
                window.location.href = response.authorization_url;
            } else if (response && response.data && response.data.authorization_url) {
                window.location.href = response.data.authorization_url;
            } else if (typeof response === 'string' && response.startsWith('http')) {
                window.location.href = response;
            } else {
                setPaymentError(`Unexpected response: ${JSON.stringify(response)}`);
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Payment initialization failed:', error);
            setPaymentError(error?.response?.data?.message || 'Payment service is unavailable. Please verify your connection or try again.');
            setIsProcessing(false);
        }
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
        { num: 2, label: 'Shipping', status: 'completed' },
        { num: 3, label: 'Review', status: 'completed' },
        { num: 4, label: 'Payment', status: 'current' },
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
                                            className={`text-xs font-medium hidden sm:inline ${
                                                isCurrent
                                                    ? 'text-slate-900 font-semibold'
                                                    : isCompleted
                                                    ? 'text-slate-600'
                                                    : 'text-slate-400'
                                            }`}
                                        >
                                            {step.label}
                                        </span>
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div
                                            className={`flex-1 h-0.5 mx-3 sm:mx-4 rounded-full transition-colors ${
                                                idx < 3 ? 'bg-emerald-500' : 'bg-slate-200'
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
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                            <span>Step 4 of 4</span>
                            <span>•</span>
                            <span>Settlement</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Complete Your Payment
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Choose your preferred payment method. Transactions are protected by SalesFunnel Escrow.
                        </p>
                    </div>

                    {/* Reservation timer badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-amber-50/80 border border-amber-200 rounded-xl text-amber-900 text-xs font-medium">
                        <span className="material-symbols-outlined text-amber-600 text-[18px]">timer</span>
                        <span>Inventory held: <strong className="font-bold text-amber-950 font-mono">{formatTime(timeRemaining)}</strong></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Payment Options */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Payment Options Selection */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
                            <h2 className="text-base font-bold text-slate-900 mb-1">Select Payment Method</h2>
                            <p className="text-xs text-slate-500 mb-5">
                                Select how you would like to settle this invoice.
                            </p>

                            <div className="space-y-3">
                                {paymentMethods.map((method) => {
                                    const isSelected = selectedPaymentMethod === method.id && method.available;
                                    return (
                                        <div
                                            key={method.id}
                                            onClick={() => method.available && setSelectedPaymentMethod(method.id)}
                                            className={`p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                                                !method.available
                                                    ? 'border-slate-200/60 bg-slate-50/60 opacity-60 cursor-not-allowed'
                                                    : isSelected
                                                    ? 'border-blue-600 bg-blue-50/20 cursor-pointer shadow-2xs'
                                                    : 'border-slate-200 hover:border-slate-300 bg-white cursor-pointer'
                                            }`}
                                        >
                                            {/* Radio circle */}
                                            <div className="pt-0.5">
                                                <div
                                                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                                        isSelected
                                                            ? 'border-blue-600 bg-blue-600'
                                                            : 'border-slate-300 bg-white'
                                                    }`}
                                                >
                                                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                                </div>
                                            </div>

                                            {/* Icon */}
                                            <div
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                                    isSelected
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-slate-100 text-slate-600'
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-[20px]">{method.icon}</span>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                                    <span className="text-sm font-bold text-slate-900">{method.name}</span>
                                                    {method.recommended && (
                                                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                            Recommended
                                                        </span>
                                                    )}
                                                    {method.badgeText && (
                                                        <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200 rounded-full">
                                                            {method.badgeText}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500 leading-relaxed mb-2">
                                                    {method.description}
                                                </p>
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    {method.badges.map((badge, bIdx) => (
                                                        <span
                                                            key={bIdx}
                                                            className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md"
                                                        >
                                                            {badge}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Payment Instructions Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="material-symbols-outlined text-blue-600 text-[20px]">verified</span>
                                <h3 className="text-sm font-bold text-slate-900">How Paystack Checkout Works</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="font-semibold text-slate-900 mb-1">1. Click Pay Now</div>
                                    <p className="text-slate-500">You'll be securely redirected to the certified Paystack gateway.</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="font-semibold text-slate-900 mb-1">2. Choose Channel</div>
                                    <p className="text-slate-500">Use your debit card, bank transfer, or USSD code.</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="font-semibold text-slate-900 mb-1">3. Instant Confirmation</div>
                                    <p className="text-slate-500">Funds are held in escrow while your order is packed and dispatched.</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                                <input
                                    type="checkbox"
                                    id="billing_same"
                                    checked={billingIsSameAsShipping}
                                    onChange={(e) => setBillingIsSameAsShipping(e.target.checked)}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-600 h-4 w-4"
                                />
                                <label htmlFor="billing_same" className="cursor-pointer">
                                    Billing address matches selected shipping address
                                </label>
                            </div>
                        </div>

                        {/* Security Guarantees */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl flex items-start gap-3">
                                <span className="material-symbols-outlined text-emerald-600 text-[22px] shrink-0">security</span>
                                <div>
                                    <h4 className="text-xs font-bold text-emerald-950">Escrow Protected</h4>
                                    <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                                        Payment is held securely in escrow and only released to distributor once delivery is confirmed.
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-100/60 border border-slate-200/80 rounded-2xl flex items-start gap-3">
                                <span className="material-symbols-outlined text-slate-700 text-[22px] shrink-0">lock</span>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-900">PCI-DSS Level 1 Encrypted</h4>
                                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                                        SalesFunnel never stores your credit card credentials. All transactions are 256-bit SSL encrypted.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Settlement Card */}
                    <div className="lg:col-span-4 sticky top-28">
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
                            <div>
                                <h3 className="text-base font-bold text-slate-900 mb-1">Invoice Summary</h3>
                                <p className="text-xs text-slate-500">Review your final invoice before payment.</p>
                            </div>

                            {/* Items count preview */}
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center">
                                        {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-900">{cartItems.length} Products</div>
                                        <div className="text-[11px] text-slate-500">Verified wholesale pricing</div>
                                    </div>
                                </div>
                                <Link
                                    to="/checkout/review"
                                    className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Review
                                </Link>
                            </div>

                            {/* Cost Breakdown */}
                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Logistics & Freight</span>
                                    <span className="font-medium text-slate-900">
                                        {shipping === 0 ? (
                                            <span className="text-emerald-600 font-bold">FREE</span>
                                        ) : (
                                            formatPrice(shipping)
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>VAT (7.5%)</span>
                                    <span className="font-medium text-slate-900">{formatPrice(vat)}</span>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                                    <span className="text-sm font-bold text-slate-900">Total Payable</span>
                                    <span className="text-2xl font-black text-slate-900 tracking-tight">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>

                            {/* Error notification */}
                            {paymentError && (
                                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">error</span>
                                    <span>{paymentError}</span>
                                </div>
                            )}

                            {/* Pay button */}
                            <button
                                type="button"
                                onClick={handleProcessPayment}
                                disabled={isProcessing || selectedPaymentMethod !== 'card'}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 ${
                                    isProcessing || selectedPaymentMethod !== 'card'
                                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                        : 'bg-slate-900 hover:bg-black text-white active:scale-[0.99] hover:shadow-md'
                                }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Connecting to Paystack...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Pay {formatPrice(total)} with Paystack</span>
                                        <span className="material-symbols-outlined text-[18px]">lock</span>
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                                <span className="material-symbols-outlined text-[14px] text-emerald-600">verified_user</span>
                                <span>Encrypted 256-bit checkout session</span>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                                <Link
                                    to="/checkout/review"
                                    className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                                    <span>Back to Review</span>
                                </Link>
                                <span className="text-[11px] text-slate-400">Step 4 of 4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PaymentPage;
