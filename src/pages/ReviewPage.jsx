import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import WholesalerNavbar from '../components/WholesalerNavbar';
import orderService from '../services/order.service';

const ReviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems, getCartTotal, clearCart, isCartLoading } = useCart();
    const [timeRemaining, setTimeRemaining] = useState(14 * 60 + 32); // 14:32 in seconds
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

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

    // Use shipping details from previous step
    const deliveryDetails = location.state?.deliveryDetails;

    // If no delivery details are found in state, redirect back to shipping
    useEffect(() => {
        if (!deliveryDetails && cartItems.length > 0) {
            navigate('/checkout/shipping');
        }
    }, [deliveryDetails, cartItems, navigate]);

    if (!deliveryDetails) return null;

    const subtotal = getCartTotal();
    const shipping = deliveryDetails.shippingFee;
    const vatRate = 0.075;
    const vat = subtotal * vatRate;
    const total = subtotal + shipping + vat;

    const formatPrice = (price) => `₦${price.toLocaleString()}`;

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
            
            // DO NOT clear the local cart context here, because PaymentPage currently relies 
            // on local cartItems to display the order summary and total price!
            // clearCart();
            
            // Navigate to payment page, pass the created order id 
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
            <div className="min-h-screen font-display flex items-center justify-center bg-background-light">
                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (cartItems.length === 0 && !isSubmitting) {
        // If we just submitted the cart, cartItems might become 0, so wait for redirect.
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
                            <p className="text-primary font-semibold text-sm uppercase tracking-wider">STEP 3 OF 4</p>
                            <p className="text-slate-500 text-sm font-medium">Review Order</p>
                        </div>
                        <div className="relative h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs font-medium text-slate-400 mt-1">
                            <span className="text-primary">Cart</span>
                            <span className="text-primary">Shipping</span>
                            <span className="text-slate-900 font-bold">Review</span>
                            <span>Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-slate-900 text-3xl font-black">Review Your Order</h1>
                            <p className="text-slate-500 text-base">Please verify your delivery details and items before confirming payment.</p>
                        </div>

                        {/* Delivery Details Section */}
                        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">local_shipping</span>
                                    <h3 className="text-slate-900 font-bold text-lg">Delivery Details</h3>
                                </div>
                                <Link to="/checkout/shipping" className="text-primary hover:text-blue-600 text-sm font-semibold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-base">edit</span>
                                    Edit
                                </Link>
                            </div>
                            <div className="p-6 grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">SHIPPING TO</p>
                                        <p className="text-slate-900 font-medium text-lg">{deliveryDetails.address}</p>
                                        <p className="text-slate-500">{deliveryDetails.city}</p>
                                        <p className="text-slate-500 mt-1">{deliveryDetails.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">METHOD</p>
                                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                            <span className="material-symbols-outlined text-sm">rocket_launch</span>
                                            {deliveryDetails.method} ({deliveryDetails.methodDuration})
                                        </div>
                                    </div>
                                </div>

                                {/* Map Placeholder */}
                                <div className="relative h-40 w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200 group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white p-2 rounded-full shadow-lg">
                                            <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-medium text-slate-600">
                                        Lagos, Nigeria
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Order Items Section */}
                        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                                <h3 className="text-slate-900 font-bold text-lg">Order Items ({cartItems.length})</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider bg-slate-50">
                                            <th className="px-6 py-3 font-semibold">Product</th>
                                            <th className="px-6 py-3 font-semibold text-center">Qty</th>
                                            <th className="px-6 py-3 font-semibold text-right">Unit Price</th>
                                            <th className="px-6 py-3 font-semibold text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {cartItems.map((item) => (
                                            <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className="h-16 w-16 flex-shrink-0 rounded-lg bg-slate-100 border border-slate-200 bg-cover bg-center"
                                                            style={{ backgroundImage: `url(${item.image})` }}
                                                        ></div>
                                                        <div>
                                                            <p className="text-slate-900 font-semibold">{item.name}</p>
                                                            <p className="text-slate-500 text-sm">SKU: {item.sku}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-slate-100 text-slate-800">
                                                        {item.quantity}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right text-slate-600">
                                                    {formatPrice(item.unitPrice)}
                                                </td>
                                                <td className="px-6 py-4 text-right font-semibold text-slate-900">
                                                    {formatPrice(item.unitPrice * item.quantity)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                                            <span className="text-slate-900 font-bold text-lg">Total</span>
                                            <span className="text-2xl font-black text-slate-900 tracking-tight">
                                                {formatPrice(total)}
                                            </span>
                                        </div>
                                    </div>

                                    {submitError && (
                                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
                                            {submitError}
                                        </div>
                                    )}

                                    <button
                                        onClick={handleConfirmOrder}
                                        disabled={isSubmitting}
                                        className={`w-full text-white font-bold py-4 px-6 rounded-lg shadow-md transition-all transform flex items-center justify-center gap-2 ${
                                            isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-600 active:scale-[0.99]'
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Confirm Order & Pay</span>
                                                <span className="material-symbols-outlined">arrow_forward</span>
                                            </>
                                        )}
                                    </button>

                                    <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs">
                                        <span className="material-symbols-outlined text-sm">lock</span>
                                        <span>Payments are secure and encrypted</span>
                                    </div>
                                </div>

                                <div className="bg-slate-50 px-6 py-4 text-center border-t border-slate-200">
                                    <Link to="/cart" className="text-primary text-sm font-medium hover:underline">
                                        Return to cart
                                    </Link>
                                </div>
                            </div>

                            <div className="text-center pt-2">
                                <p className="text-sm text-slate-500">Need help with your order?</p>
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

export default ReviewPage;
