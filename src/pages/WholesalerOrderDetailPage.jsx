import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WholesalerNavbar from '../components/WholesalerNavbar';
import orderService from '../services/order.service';

const STATUS_CONFIG = {
    pending: { label: 'Pending Payment', bg: 'bg-amber-100', text: 'text-amber-700', icon: 'schedule' },
    paid: { label: 'Paid', bg: 'bg-blue-100', text: 'text-blue-700', icon: 'payments' },
    approved: { label: 'Approved', bg: 'bg-purple-100', text: 'text-purple-700', icon: 'verified' },
    ready_for_pickup: { label: 'Ready for Pickup', bg: 'bg-emerald-100', text: 'text-emerald-700', icon: 'local_shipping' },
    completed: { label: 'Completed', bg: 'bg-green-100', text: 'text-green-700', icon: 'check_circle' },
    cancelled: { label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-700', icon: 'cancel' },
};

const STEPS = ['pending', 'paid', 'approved', 'ready_for_pickup', 'completed'];

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

const WholesalerOrderDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await orderService.getById(id);
            setOrder(data);
        } catch (err) {
            console.error('Failed to fetch order:', err);
            setError(err.response?.data?.detail || 'Failed to load order details.');
        } finally {
            setLoading(false);
        }
    };

    const currentStepIndex = order ? Math.max(STEPS.indexOf(order.status), (order.status === 'ready' || order.status === 'ready_for_pickup' ? STEPS.indexOf('ready_for_pickup') : -1)) : -1;

    // Normalization mapping for standard steps format. The distributor used 'ready' and we use 'ready_for_pickup' in some places
    const getStatusKey = (s) => (s === 'ready' ? 'ready_for_pickup' : s);

    // ── Render ──────────────────────────────────────────────────
    return (
        <div className="bg-white min-h-screen text-slate-900 font-display transition-colors duration-200" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <WholesalerNavbar />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back link */}
                <button
                    onClick={() => navigate('/orders')}
                    className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary mb-6 transition-colors"
                >
                    &larr; Back to Orders
                </button>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                        <p className="text-slate-500 text-sm">Loading order details…</p>
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
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
                            <div className="bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Order Details</p>
                                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                                        #{order.order_number || id.slice(0, 8)}
                                    </h1>
                                </div>

                                {/* Status badge */}
                                {(() => {
                                    const rawStatus = getStatusKey(order.status);
                                    const cfg = STATUS_CONFIG[rawStatus] || STATUS_CONFIG.pending;
                                    return (
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${cfg.bg} ${cfg.text} shadow-sm`}>
                                            {cfg.label}
                                        </span>
                                    );
                                })()}
                            </div>

                            {/* Progress tracker */}
                            <div className="px-4 sm:px-6 py-6 sm:py-8 overflow-x-auto">
                                <div className="flex items-center justify-between min-w-[500px]">
                                    {STEPS.map((step, idx) => {
                                        const cfg = STATUS_CONFIG[step];
                                        const done = idx <= currentStepIndex;
                                        const isCurrent = idx === currentStepIndex;
                                        return (
                                            <React.Fragment key={step}>
                                                <div className="flex flex-col items-center gap-2 flex-shrink-0 relative z-10">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm ${done ? 'bg-primary text-white scale-110' : 'bg-slate-100 text-slate-400 border border-slate-200'
                                                        } ${isCurrent ? 'ring-4 ring-primary/20 ring-offset-2' : ''}`}>
                                                        {done ? '✓' : idx + 1}
                                                    </div>
                                                    <span className={`text-[10px] sm:text-xs font-bold text-center uppercase tracking-wider ${done ? 'text-primary' : 'text-slate-400'}`}>
                                                        {cfg.label}
                                                    </span>
                                                </div>
                                                {idx < STEPS.length - 1 && (
                                                    <div className="flex-1 h-1 mx-2 bg-slate-100 rounded-full overflow-hidden relative top-[-10px]">
                                                        <div className={`h-full transition-all duration-500 ${idx < currentStepIndex ? 'bg-primary w-full' : 'w-0'}`} />
                                                    </div>
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
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:border-primary/30 transition-colors">
                                <div className="flex items-center gap-2 mb-4">
                                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Information</h2>
                                </div>
                                <dl className="space-y-4 text-sm">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-100 pb-3 gap-1">
                                        <dt className="text-slate-500 font-medium">Order Number</dt>
                                        <dd className="font-bold text-slate-900">{order.order_number || '—'}</dd>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-100 pb-3 gap-1">
                                        <dt className="text-slate-500 font-medium">Total Amount</dt>
                                        <dd className="font-black text-primary text-xl">{formatCurrency(order.total_amount)}</dd>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-100 pb-3 gap-1">
                                        <dt className="text-slate-500 font-medium">Distributor</dt>
                                        <dd className="font-bold text-slate-900 flex items-center gap-2">
                                            <div className="size-6 rounded bg-slate-200 flex items-center justify-center text-xs">
                                                {order.distributor_name ? order.distributor_name.charAt(0).toUpperCase() : 'D'}
                                            </div>
                                            {order.distributor_name || '—'}
                                        </dd>
                                    </div>
                                    {order.notes && (
                                        <div className="flex flex-col sm:flex-row sm:justify-between pt-1 gap-1">
                                            <dt className="text-slate-500 font-medium whitespace-nowrap mr-4">Notes</dt>
                                            <dd className="font-medium text-slate-700 sm:text-right italic">{order.notes}</dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            {/* Timeline */}
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:border-primary/30 transition-colors">
                                <div className="flex items-center gap-2 mb-4">
                                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Timeline</h2>
                                </div>
                                <dl className="space-y-3 text-sm">
                                    {[
                                        { label: 'Created', value: order.created_at, icon: 'add_circle' },
                                        { label: 'Paid', value: order.paid_at, icon: 'payments' },
                                        { label: 'Approved', value: order.approved_at, icon: 'verified' },
                                        { label: 'Ready', value: order.ready_at || order.ready_for_pickup_at, icon: 'local_shipping' },
                                        { label: 'Completed', value: order.completed_at, icon: 'check_circle' },
                                        { label: 'Cancelled', value: order.cancelled_at, icon: 'cancel' },
                                    ].map(({ label, value, icon }) => (
                                        <div key={label} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                                            <dt className={`flex items-center gap-2 ${value ? 'text-slate-700' : 'text-slate-400'} font-medium`}>
                                                {label}
                                            </dt>
                                            <dd className={`font-semibold ${value ? 'text-slate-900' : 'text-slate-300'}`}>
                                                {formatDate(value)}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>

                        {/* Items table */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                            <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                    Purchased Items ({order.items?.length || 0})
                                </h2>
                            </div>

                            {order.items && order.items.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left min-w-[600px]">
                                        <thead>
                                            <tr className="border-b border-slate-200 bg-white">
                                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Product</th>
                                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">SKU</th>
                                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Quantity</th>
                                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Unit Price</th>
                                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 bg-white">
                                            {order.items.map((item, idx) => (
                                                <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <p className="text-sm font-bold text-slate-900 line-clamp-2">{item.product_name || '—'}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-500 font-mono bg-white group-hover:bg-transparent transition-colors">
                                                        {item.product_sku || '—'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-black text-slate-900 text-right">{item.quantity}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-slate-600 text-right">{formatCurrency(item.unit_price)}</td>
                                                    <td className="px-6 py-4 text-sm font-black text-primary text-right">{formatCurrency(item.subtotal)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-white border-t border-slate-200">
                                            <tr>
                                                <td colSpan={4} className="px-6 py-5 text-sm font-black text-slate-900 text-right uppercase tracking-wider">Total Amount</td>
                                                <td className="px-6 py-5 text-xl font-black text-primary text-right">{formatCurrency(order.total_amount)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            ) : (
                                                        <div className="px-6 py-12 flex flex-col items-center justify-center text-center">
                                                            <p className="text-slate-500 font-medium">No items found in this order.</p>
                                                        </div>
                                                    )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default WholesalerOrderDetailPage;
