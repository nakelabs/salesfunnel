import React, { useState, useEffect } from 'react';
import DistributorNavbar from '../components/DistributorNavbar';
import distributorService from '../services/distributor.service';

const PaymentsPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const PAGE_SIZE = 10;

    const fetchPayments = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await distributorService.getPayments({ page, page_size: PAGE_SIZE });
            setPayments(data.payments || []);
            setTotal(data.total || 0);
            setTotalPages(data.total_pages || 1);
        } catch (err) {
            console.error('Failed to fetch payments:', err);
            setError('Failed to load payments. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [page]);

    // Derive quick stats from the current page of payments
    const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
    const pendingCount = payments.filter(p => (p.status || '').toLowerCase() === 'pending').length;
    const completedCount = payments.filter(p => (p.status || '').toLowerCase() === 'completed').length;

    const tabs = [
        { id: 'all', name: 'All' },
        { id: 'pending', name: 'Pending' },
        { id: 'completed', name: 'Completed' },
        { id: 'failed', name: 'Failed' },
    ];

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = searchQuery === '' ||
            (payment.order_number || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (payment.wholesaler_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (payment.reference_number || '').toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTab = activeTab === 'all' ||
            (payment.status || '').toLowerCase() === activeTab;

        return matchesSearch && matchesTab;
    });

    const formatPrice = (amount) =>
        `₦${Number(amount || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;

    const getStatusBadgeClasses = (status) => {
        const s = (status || '').toLowerCase();
        if (s === 'completed') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        if (s === 'pending') return 'bg-amber-100 text-amber-700 border-amber-200';
        if (s === 'failed') return 'bg-red-100 text-red-700 border-red-200';
        return 'bg-slate-100 text-slate-600 border-slate-200';
    };

    const getStatusIcon = (status) => {
        const s = (status || '').toLowerCase();
        if (s === 'completed') return 'check_circle';
        if (s === 'pending') return 'hourglass_top';
        if (s === 'failed') return 'cancel';
        return 'info';
    };

    const formatDateTime = (date, time) => {
        if (!date) return '—';
        try {
            const d = new Date(`${date}T${time || '00:00:00'}`);
            return d.toLocaleString('en-NG', {
                year: 'numeric', month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        } catch {
            return date;
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <DistributorNavbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Page Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Payments</h2>
                    <p className="text-sm text-slate-500 mt-1">All payments received from wholesalers</p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">error</span>
                        <p className="text-sm text-red-700 flex-1">{error}</p>
                        <button onClick={fetchPayments} className="text-sm font-semibold text-red-600 hover:text-red-800">
                            Retry
                        </button>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Revenue */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-blue-500 text-xl">payments</span>
                            <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
                        </div>
                        {loading ? (
                            <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                        ) : (
                            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{formatPrice(totalRevenue)}</h3>
                        )}
                        <p className="text-xs text-slate-400 mt-1">From this page of payments</p>
                    </div>

                    {/* Pending */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-amber-500 text-xl">hourglass_top</span>
                            <p className="text-slate-500 text-sm font-medium">Pending Payments</p>
                        </div>
                        {loading ? (
                            <div className="w-8 h-8 border-2 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
                        ) : (
                            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{pendingCount}</h3>
                        )}
                        <p className="text-xs text-slate-400 mt-1">Awaiting settlement</p>
                    </div>

                    {/* Completed */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-emerald-500 text-xl">check_circle</span>
                            <p className="text-slate-500 text-sm font-medium">Completed Payments</p>
                        </div>
                        {loading ? (
                            <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
                        ) : (
                            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{completedCount}</h3>
                        )}
                        <p className="text-xs text-slate-400 mt-1">Successfully settled</p>
                    </div>
                </div>

                {/* Filters & Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6">
                    {/* Tab Bar + Search */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 gap-4 border-b border-slate-200">
                        <div className="flex gap-6 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => { setActiveTab(tab.id); setPage(1); }}
                                    className={`whitespace-nowrap flex items-center gap-2 pb-2 px-1 transition-colors text-sm font-semibold ${activeTab === tab.id
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </div>

                        <div className="w-full lg:max-w-md">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined text-xl">search</span>
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Search by order, reference or wholesaler..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order #</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Wholesaler</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reference</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                                <p className="text-sm text-slate-400">Loading payments...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredPayments.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center">
                                            <span className="material-symbols-outlined text-5xl text-slate-300 block mb-3">receipt_long</span>
                                            <p className="text-slate-500 font-medium">No payments found</p>
                                            <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPayments.map((payment, index) => (
                                        <tr key={payment.reference_number || index} className="hover:bg-slate-50/60 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-mono font-semibold text-slate-900">
                                                    {payment.order_number || '—'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                                                        {(payment.wholesaler_name || 'W')[0].toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-900">
                                                        {payment.wholesaler_name || '—'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-sm font-bold text-slate-900">
                                                    {formatPrice(payment.amount)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-600">
                                                    {formatDateTime(payment.date, payment.time)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-700 select-all">
                                                    {payment.reference_number || '—'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${getStatusBadgeClasses(payment.status)}`}>
                                                    <span className="material-symbols-outlined text-[13px]">
                                                        {getStatusIcon(payment.status)}
                                                    </span>
                                                    {(payment.status || '—').charAt(0).toUpperCase() + (payment.status || '').slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 bg-slate-50">
                        <p className="text-sm text-slate-500">
                            Page {page} of {totalPages} &nbsp;·&nbsp; {total} total payments
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-1.5 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors text-slate-600 font-medium"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages || totalPages === 0}
                                className="px-4 py-1.5 border border-slate-200 rounded-lg text-sm bg-white hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors text-slate-600 font-medium"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PaymentsPage;
