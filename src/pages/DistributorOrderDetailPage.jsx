import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DistributorNavbar from '../components/DistributorNavbar';
import distributorService from '../services/distributor.service';

const STATUS_CONFIG = {
    pending: { label: 'Pending', bg: 'bg-amber-100', text: 'text-amber-700', icon: 'schedule' },
    paid: { label: 'Paid', bg: 'bg-blue-100', text: 'text-blue-700', icon: 'payments' },
    approved: { label: 'Approved', bg: 'bg-purple-100', text: 'text-purple-700', icon: 'verified' },
    ready: { label: 'Ready for Pickup', bg: 'bg-emerald-100', text: 'text-emerald-700', icon: 'local_shipping' },
    completed: { label: 'Completed', bg: 'bg-green-100', text: 'text-green-700', icon: 'check_circle' },
    cancelled: { label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-700', icon: 'cancel' },
};

const STEPS = ['pending', 'paid', 'approved', 'ready', 'completed'];

const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('en-NG', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};

const formatCurrency = (value) => {
    const num = Number(value);
    if (isNaN(num)) return '₦0.00';
    return '₦' + num.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const DistributorOrderDetailPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusUpdating, setStatusUpdating] = useState(false);
    const [statusSuccess, setStatusSuccess] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await distributorService.getOrderDetails(orderId);
            setOrder(data);
        } catch (err) {
            console.error('Failed to fetch order:', err);
            setError(err.response?.data?.detail || 'Failed to load order details.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        try {
            setStatusUpdating(true);
            setStatusSuccess(false);
            await distributorService.updateOrderStatus(orderId, { status: newStatus });
            setOrder(prev => ({ ...prev, status: newStatus }));
            setStatusSuccess(true);
            setTimeout(() => setStatusSuccess(false), 3000);
        } catch (err) {
            console.error('Failed to update status:', err);
            alert(err.response?.data?.detail || 'Failed to update order status.');
        } finally {
            setStatusUpdating(false);
        }
    };

    const currentStepIndex = order ? STEPS.indexOf(order.status) : -1;

    // ── Render ──────────────────────────────────────────────────
    return (
        <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <DistributorNavbar />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back link */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary mb-6 transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back
                </button>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                        <p className="text-slate-500 text-sm">Loading order…</p>
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">error</span>
                        <p className="text-sm text-red-700 flex-1">{error}</p>
                        <button onClick={fetchOrder} className="text-sm font-semibold text-red-600 hover:text-red-800">Retry</button>
                    </div>
                )}

                {/* Order content */}
                {order && !loading && (
                    <>
                        {/* Header card */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6">
                            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Order</p>
                                    <h1 className="text-2xl font-black text-slate-900">
                                        #{order.order_number || orderId.slice(0, 8)}
                                    </h1>
                                </div>

                                {/* Status badge */}
                                {(() => {
                                    const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                                    return (
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${cfg.bg} ${cfg.text}`}>
                                            <span className="material-symbols-outlined text-base">{cfg.icon}</span>
                                            {cfg.label}
                                        </span>
                                    );
                                })()}
                            </div>

                            {/* Progress tracker */}
                            <div className="px-6 py-5">
                                <div className="flex items-center justify-between">
                                    {STEPS.map((step, idx) => {
                                        const cfg = STATUS_CONFIG[step];
                                        const done = idx <= currentStepIndex;
                                        const isCurrent = idx === currentStepIndex;
                                        return (
                                            <React.Fragment key={step}>
                                                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${done ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'
                                                        } ${isCurrent ? 'ring-2 ring-primary/30 ring-offset-2' : ''}`}>
                                                        {done ? <span className="material-symbols-outlined text-base">check</span> : idx + 1}
                                                    </div>
                                                    <span className={`text-[10px] sm:text-xs font-medium text-center ${done ? 'text-primary' : 'text-slate-400'}`}>
                                                        {cfg.label}
                                                    </span>
                                                </div>
                                                {idx < STEPS.length - 1 && (
                                                    <div className={`flex-1 h-0.5 mx-1 ${idx < currentStepIndex ? 'bg-primary' : 'bg-slate-200'}`} />
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Info grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Order Info */}
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Order Information</h2>
                                <dl className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-slate-500">Order Number</dt>
                                        <dd className="font-semibold text-slate-900">{order.order_number || '—'}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-slate-500">Total Amount</dt>
                                        <dd className="font-bold text-primary text-lg">{formatCurrency(order.total_amount)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-slate-500">Notes</dt>
                                        <dd className="font-medium text-slate-900 text-right max-w-[60%]">{order.notes || '—'}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-slate-500">Distributor</dt>
                                        <dd className="font-medium text-slate-900">{order.distributor_name || '—'}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Timeline */}
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Timeline</h2>
                                <dl className="space-y-3 text-sm">
                                    {[
                                        { label: 'Created', value: order.created_at },
                                        { label: 'Paid', value: order.paid_at },
                                        { label: 'Approved', value: order.approved_at },
                                        { label: 'Ready', value: order.ready_at },
                                        { label: 'Completed', value: order.completed_at },
                                        { label: 'Cancelled', value: order.cancelled_at },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex justify-between">
                                            <dt className="text-slate-500">{label}</dt>
                                            <dd className={`font-medium ${value ? 'text-slate-900' : 'text-slate-300'}`}>
                                                {formatDate(value)}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>

                        {/* Items table */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                            <div className="px-6 py-4 border-b border-slate-100">
                                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                    Order Items ({order.items?.length || 0})
                                </h2>
                            </div>

                            {order.items && order.items.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-200">
                                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Qty</th>
                                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Unit Price</th>
                                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {order.items.map((item, idx) => (
                                                <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-slate-400">{idx + 1}</td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-semibold text-slate-900">{item.product_name || '—'}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">{item.product_sku || '—'}</td>
                                                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">{item.quantity}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-700 text-right">{formatCurrency(item.unit_price)}</td>
                                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">{formatCurrency(item.subtotal)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr className="bg-slate-50 border-t border-slate-200">
                                                <td colSpan={5} className="px-6 py-4 text-sm font-bold text-slate-700 text-right">Total</td>
                                                <td className="px-6 py-4 text-lg font-black text-primary text-right">{formatCurrency(order.total_amount)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            ) : (
                                <div className="px-6 py-10 text-center text-sm text-slate-400">No items in this order.</div>
                            )}
                        </div>

                        {/* Actions */}
                        {order.status !== 'completed' && order.status !== 'cancelled' && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Update Status</h2>

                                {statusSuccess && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-green-600 text-lg">check_circle</span>
                                        <p className="text-sm text-green-700 font-medium">Status updated successfully!</p>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-3">
                                    {STEPS.filter((s) => STEPS.indexOf(s) > currentStepIndex).map((nextStatus) => {
                                        const cfg = STATUS_CONFIG[nextStatus];
                                        return (
                                            <button
                                                key={nextStatus}
                                                disabled={statusUpdating}
                                                onClick={() => handleStatusUpdate(nextStatus)}
                                                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors disabled:opacity-50 ${cfg.bg} ${cfg.text} border-current/20 hover:opacity-80`}
                                            >
                                                <span className="material-symbols-outlined text-base">{cfg.icon}</span>
                                                Mark as {cfg.label}
                                            </button>
                                        );
                                    })}

                                    <button
                                        disabled={statusUpdating}
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to cancel this order?')) {
                                                handleStatusUpdate('cancelled');
                                            }
                                        }}
                                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                                    >
                                        <span className="material-symbols-outlined text-base">cancel</span>
                                        Cancel Order
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default DistributorOrderDetailPage;
