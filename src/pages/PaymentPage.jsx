import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import WholesalerNavbar from '../components/WholesalerNavbar';

const PaymentPage = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal } = useCart();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bank_transfer');
    const [billingIsSameAsShipping, setBillingIsSameAsShipping] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(12 * 60 + 5); // 12:05 in seconds

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

    const walletBalance = 45200; // Mock wallet balance
    const subtotal = getCartTotal();
    const shipping = 5000;
    const vatRate = 0.075;
    const vat = subtotal * vatRate;
    const total = subtotal + shipping + vat;

    const formatPrice = (price) => `₦${price.toLocaleString()}`;

    const paymentMethods = [];

    const handleProcessPayment = () => {
        // In a real app, this would initiate payment processing
        alert('Payment processing would happen here. Order will be created.');
        // navigate('/order-success');
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="bg-background-light min-h-screen font-display">
            {/* Shared Navbar */}
            <WholesalerNavbar />

            {/* Main Content */}
            <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-6 py-8">
                {/* Progress Indicator */}
                <div className="mb-8 max-w-3xl mx-auto">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-end mb-1">
                            <p className="text-primary font-semibold text-sm uppercase tracking-wider">STEP 4 OF 4</p>
                            <p className="text-slate-500 text-sm font-medium">Payment</p>
                        </div>
                        <div className="relative h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs font-medium text-slate-400 mt-1">
                            <span className="text-primary">Cart</span>
                            <span className="text-primary">Shipping</span>
                            <span className="text-primary">Review</span>
                            <span className="text-slate-900 font-bold">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-slate-900 text-3xl font-black">Select Payment Method</h1>
                            <p className="text-slate-500 text-base">Choose a secure payment method to complete your wholesale order.</p>
                        </div>

                        {/* Payment Methods Section */}
                        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">credit_card</span>
                                    <h3 className="text-slate-900 font-bold text-lg">Available Methods</h3>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                {paymentMethods.map((method) => (
                                    <label
                                        key={method.id}
                                        className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedPaymentMethod === method.id && !method.disabled
                                            ? 'border-primary bg-blue-50/30'
                                            : method.disabled
                                                ? 'border-slate-200 bg-slate-50/50 opacity-60 cursor-not-allowed'
                                                : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            className="sr-only"
                                            checked={selectedPaymentMethod === method.id && !method.disabled}
                                            onChange={() => !method.disabled && setSelectedPaymentMethod(method.id)}
                                            disabled={method.disabled}
                                        />

                                        <div className={`flex items-center justify-center size-12 rounded-full border shadow-sm shrink-0 ${selectedPaymentMethod === method.id && !method.disabled
                                            ? 'bg-white text-primary border-slate-200'
                                            : 'bg-slate-50 text-slate-500 border-slate-200'
                                            }`}>
                                            <span className="material-symbols-outlined">{method.icon}</span>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-bold text-slate-900 text-lg">{method.name}</span>
                                                {method.recommended && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                        Recommended
                                                    </span>
                                                )}
                                                {method.balance !== undefined && (
                                                    <span className="text-sm font-semibold text-slate-900 ml-auto">
                                                        Bal: {formatPrice(method.balance)}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-600">{method.description}</p>

                                            {method.badges && (
                                                <div className="flex gap-2 mt-1 opacity-60">
                                                    {method.badges.map((badge) => (
                                                        <span key={badge} className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 font-semibold">
                                                            {badge}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {method.error && method.disabled && (
                                                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-xs">error</span>
                                                    {method.error}
                                                </p>
                                            )}
                                        </div>

                                        <div className={`${selectedPaymentMethod === method.id && !method.disabled
                                            ? 'text-primary'
                                            : method.disabled
                                                ? 'text-slate-200 opacity-50'
                                                : 'text-slate-300'
                                            }`}>
                                            <span className="material-symbols-outlined text-2xl">
                                                {selectedPaymentMethod === method.id && !method.disabled ? 'check_circle' : 'radio_button_unchecked'}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* Payment Instructions Section */}
                        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                                <h3 className="text-slate-900 font-bold text-lg">Payment Instructions</h3>
                                <span className="text-xs text-slate-500 font-medium bg-slate-200 px-2 py-1 rounded">
                                    {selectedPaymentMethod === 'bank_transfer' ? 'Instant Bank Transfer' :
                                        selectedPaymentMethod === 'card' ? 'Card Payment' : 'Wallet Payment'}
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="flex gap-4 mb-6">
                                    <div className="shrink-0 pt-1">
                                        <span className="material-symbols-outlined text-primary">info</span>
                                    </div>
                                    <div className="text-sm text-slate-600">
                                        {selectedPaymentMethod === 'bank_transfer' && (
                                            <>
                                                <p className="mb-2">
                                                    A unique account number will be generated for this transaction on the next screen.
                                                    Please ensure you transfer the <strong>exact amount</strong> to avoid delays.
                                                </p>
                                                <ul className="list-disc pl-4 space-y-1 text-slate-500">
                                                    <li>The account number expires in 30 minutes.</li>
                                                    <li>Use your Order ID <strong>#SF-8821-ORD</strong> as the transfer remark/description.</li>
                                                    <li>Confirmation is usually instant but can take up to 5 minutes.</li>
                                                </ul>
                                            </>
                                        )}
                                        {selectedPaymentMethod === 'card' && (
                                            <>
                                                <p className="mb-2">
                                                    You will be redirected to Paystack's secure payment page to complete your payment.
                                                </p>
                                                <ul className="list-disc pl-4 space-y-1 text-slate-500">
                                                    <li>All card details are handled securely by Paystack.</li>
                                                    <li>We support Visa, Mastercard, and Verve cards.</li>
                                                    <li>Your payment will be confirmed instantly.</li>
                                                </ul>
                                            </>
                                        )}
                                        {selectedPaymentMethod === 'wallet' && (
                                            <>
                                                <p className="mb-2">
                                                    Your wallet balance will be debited immediately upon confirmation.
                                                </p>
                                                <ul className="list-disc pl-4 space-y-1 text-slate-500">
                                                    <li>Instant confirmation, no waiting time.</li>
                                                    <li>Transaction history will be updated in your wallet.</li>
                                                    <li>You can top up your wallet anytime from your dashboard.</li>
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                    <h4 className="text-sm font-bold text-amber-800 mb-2">Important Security Note</h4>
                                    <p className="text-xs text-amber-700 leading-relaxed">
                                        SalesFunnel will never ask for your card PIN or bank OTP over the phone.
                                        Please ensure you are paying into a "SalesFunnel" designated account.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Billing Address Checkbox */}
                        <div className="flex items-center gap-2 px-2">
                            <input
                                type="checkbox"
                                id="billing_same"
                                checked={billingIsSameAsShipping}
                                onChange={(e) => setBillingIsSameAsShipping(e.target.checked)}
                                className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                            />
                            <label htmlFor="billing_same" className="text-sm font-medium text-slate-700">
                                Billing address is the same as shipping address
                            </label>
                        </div>
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
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                                                ITEMS ({cartItems.length})
                                            </span>
                                            <Link to="/checkout/review" className="text-xs text-primary hover:underline">
                                                View details
                                            </Link>
                                        </div>
                                        <div className="flex -space-x-2 overflow-hidden">
                                            {cartItems.slice(0, 3).map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-cover bg-center bg-slate-200"
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-slate-600">
                                            <span>Subtotal</span>
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-600">
                                            <span>Shipping (Express)</span>
                                            <span>{formatPrice(shipping)}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-600">
                                            <span>VAT (7.5%)</span>
                                            <span>{formatPrice(vat)}</span>
                                        </div>
                                        <div className="h-px bg-slate-200 my-2"></div>
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-slate-900 font-bold text-lg">Total to Pay</span>
                                            <span className="text-2xl font-black text-slate-900 tracking-tight">
                                                {formatPrice(total)}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleProcessPayment}
                                        className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-md transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
                                    >
                                        <span>Pay {formatPrice(total)}</span>
                                        <span className="material-symbols-outlined">lock</span>
                                    </button>

                                    <div className="mt-4 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs text-center">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">verified_user</span>
                                            <span>Secured by Paystack</span>
                                        </div>
                                        <p className="text-[10px] opacity-70">
                                            By clicking "Pay", you agree to our Terms & Conditions.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 px-6 py-4 text-center border-t border-slate-200">
                                    <Link to="/checkout/review" className="text-primary text-sm font-medium hover:underline flex items-center justify-center gap-1">
                                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                                        Back to Review
                                    </Link>
                                </div>
                            </div>

                            <div className="text-center pt-2">
                                <p className="text-sm text-slate-500">Having trouble paying?</p>
                                <a className="text-sm font-medium text-slate-900 hover:text-primary transition-colors" href="#">
                                    Contact Payment Support
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PaymentPage;
