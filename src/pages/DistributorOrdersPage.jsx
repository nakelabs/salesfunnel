import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DistributorNavbar from '../components/DistributorNavbar';
import distributorService from '../services/distributor.service';

const STATUS_CONFIG = {
    pending: { label: 'Pending', bg: 'bg-amber-100', text: 'text-amber-700' },
    paid: { label: 'Paid', bg: 'bg-blue-100', text: 'text-blue-700' },
    approved: { label: 'Approved', bg: 'bg-purple-100', text: 'text-purple-700' },
    ready: { label: 'Ready for Pickup', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    completed: { label: 'Completed', bg: 'bg-green-100', text: 'text-green-700' },
    cancelled: { label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-700' },
    new: { label: 'New', bg: 'bg-primary/10', text: 'text-primary' },
    processing: { label: 'Processing', bg: 'bg-amber-100', text: 'text-amber-700' },
};

const DistributorOrdersPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await distributorService.getNewOrders();
            const orderList = Array.isArray(data) ? data : (data.orders || data.data || []);
            setOrders(orderList);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
            setError(err.response?.data?.detail || 'Failed to load orders.');
        } finally {
            setLoading(false);
        }
    };

    const filters = ['all', 'pending', 'paid', 'approved', 'ready', 'completed', 'cancelled'];

    const filteredOrders = orders.filter(order => {
        const status = (order.status || '').toLowerCase();
        const matchesFilter = activeFilter === 'all' || status === activeFilter ||
            (activeFilter === 'pending' && status === 'new');

        const orderId = order.id || order.order_id || '';
        const wholesaler = order.wholesaler_name || order.customer_name || '';
        const matchesSearch = searchQuery === '' ||
            String(orderId).toLowerCase().includes(searchQuery.toLowerCase()) ||
            wholesaler.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('en-NG', {
            year: 'numeric', month: 'short', day: 'numeric',
        });
    };

    const formatCurrency = (value) => {
        const num = Number(value);
        if (isNaN(num)) return '₦0.00';
        return '₦' + num.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <DistributorNavbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Orders</h2>
                        <p className="text-sm text-slate-500 mt-1">View and manage incoming orders</p>
                    </div>
                    <span className="text-sm text-slate-500 font-medium">
                        {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">error</span>
                        <p className="text-sm text-red-700 flex-1">{error}</p>
                        <button onClick={fetchOrders} className="text-sm font-semibold text-red-600 hover:text-red-800">Retry</button>
                    </div>
                )}

                {/* Search & Filters */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1 relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input
                                type="text"
                                placeholder="Search by order ID or wholesaler…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {filters.map(f => {
                            const cfg = STATUS_CONFIG[f];
                            return (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === f
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {f === 'all' ? 'All Orders' : (cfg?.label || f)}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                        <p className="text-slate-500 text-sm">Loading orders…</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200">
                        <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">inbox</span>
                        <h3 className="text-lg font-bold text-slate-700 mb-1">No orders found</h3>
                        <p className="text-sm text-slate-500">
                            {searchQuery || activeFilter !== 'all' ? 'Try adjusting your search or filter.' : 'No orders have been placed yet.'}
                        </p>
                    </div>
                ) : (
                    /* Orders Table */
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Order ID</th>
                                        <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Wholesaler</th>
                                        <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Date</th>
                                        <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Amount</th>
                                        <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Status</th>
                                        <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredOrders.map((order, idx) => {
                                        const id = order.id || order.order_id || `ORD-${idx}`;
                                        const wholesaler = order.wholesaler_name || order.customer_name || '—';
                                        const date = order.created_at || order.date || '';
                                        const amount = order.total_amount || order.amount || 0;
                                        const status = (order.status || 'pending').toLowerCase();
                                        const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

                                        return (
                                            <tr
                                                key={id + '-' + idx}
                                                onClick={() => navigate(`/distributor-orders/${id}`)}
                                                className="group hover:bg-slate-50 transition-colors cursor-pointer"
                                            >
                                                <td className="px-6 py-4 font-semibold text-slate-900">
                                                    {order.order_number || String(id).slice(0, 8)}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                                            {wholesaler[0] || '?'}
                                                        </div>
                                                        {wholesaler}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">{formatDate(date)}</td>
                                                <td className="px-6 py-4 font-semibold text-slate-900 text-right">{formatCurrency(amount)}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                                                        {cfg.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); navigate(`/distributor-orders/${id}`); }}
                                                        className="text-slate-400 hover:text-primary transition-colors p-1.5 hover:bg-blue-50 rounded-lg"
                                                        title="View order details"
                                                    >
                                                        <span className="material-symbols-outlined">visibility</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
                            <p className="text-sm text-slate-500">Showing {filteredOrders.length} of {orders.length} orders</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DistributorOrdersPage;
