import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WholesalerNavbar from '../components/WholesalerNavbar';
import orderService from '../services/order.service';
import profileService from '../services/profile.service';

const OrdersPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [dashboardStats, setDashboardStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const params = {
                page,
                page_size: 10,
            };
            if (activeFilter !== 'all') {
                params.status_filter = activeFilter;
            }
            
            const response = await orderService.getMyOrders(params);
            setOrders(response.orders || []);
            setTotalPages(response.total_pages || 1);
            setTotalOrders(response.total || 0);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
            setError("Failed to load orders. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchDashboardStats = async () => {
        setStatsLoading(true);
        try {
            const data = await orderService.getDashboardStats();
            setDashboardStats(data);
        } catch (err) {
            console.error('Failed to fetch dashboard stats:', err);
        } finally {
            setStatsLoading(false);
        }
    };

    const fetchProfile = async () => {
        try {
            const data = await profileService.getProfile();
            setProfileData(data);
        } catch (err) {
            console.error('Failed to fetch profile:', err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page, activeFilter]);

    useEffect(() => {
        fetchDashboardStats();
        fetchProfile();
    }, []);

    const filteredOrders = orders.filter(order => 
        order.id?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        order.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.distributor_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusInfo = (status) => {
        switch (status) {
            case 'pending': 
                return { label: 'Pending Payment', bg: 'bg-amber-50 text-amber-700 border-amber-200/80', dot: 'bg-amber-500' };
            case 'paid': 
                return { label: 'Paid (Escrow)', bg: 'bg-blue-50 text-blue-700 border-blue-200/80', dot: 'bg-blue-500' };
            case 'approved': 
                return { label: 'Approved', bg: 'bg-purple-50 text-purple-700 border-purple-200/80', dot: 'bg-purple-500' };
            case 'ready_for_pickup': 
                return { label: 'Ready for Pickup', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80', dot: 'bg-indigo-500' };
            case 'completed': 
                return { label: 'Completed', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80', dot: 'bg-emerald-500' };
            case 'cancelled': 
                return { label: 'Cancelled', bg: 'bg-red-50 text-red-700 border-red-200/80', dot: 'bg-red-500' };
            default: 
                return { label: status, bg: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400' };
        }
    };

    const filterTabs = [
        { id: 'all', label: 'All Orders' },
        { id: 'pending', label: 'Pending Payment' },
        { id: 'paid', label: 'Paid' },
        { id: 'approved', label: 'Approved' },
        { id: 'ready_for_pickup', label: 'Ready for Pickup' },
    ];

    const businessName = profileData?.wholesaler_profile?.business_name || 
                         profileData?.distributor_profile?.business_name || 
                         profileData?.full_name || 
                         'Wholesaler';

    return (
        <div
            className="bg-[#f8fafc] min-h-screen text-slate-900 flex flex-col antialiased"
            style={{ fontFamily: '"Google Sans", "Plus Jakarta Sans", system-ui, sans-serif' }}
        >
            {/* Top Navigation */}
            <WholesalerNavbar />

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Order Dashboard</h1>
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
                                {totalOrders} {totalOrders === 1 ? 'order' : 'orders'}
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm">
                            Welcome back, <span className="font-semibold text-slate-800">{businessName}</span>. Track payments and delivery fulfillment.
                        </p>
                    </div>

                    <Link
                        to="/dashboard"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        <span>New Restock Order</span>
                    </Link>
                </div>

                {/* KPI Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    {/* Orders in Progress */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-slate-500">Orders in Progress</span>
                            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">inventory</span>
                            </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                            {statsLoading ? (
                                <div className="h-8 w-12 bg-slate-100 rounded-lg animate-pulse" />
                            ) : (
                                <span className="text-2xl font-black text-slate-900">
                                    {dashboardStats?.orders_in_progress ?? 0}
                                </span>
                            )}
                            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                                Active / Paid
                            </span>
                        </div>
                    </div>

                    {/* Action Required */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-slate-500">Action Required</span>
                            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">warning</span>
                            </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                            {statsLoading ? (
                                <div className="h-8 w-12 bg-slate-100 rounded-lg animate-pulse" />
                            ) : (
                                <span className="text-2xl font-black text-slate-900">
                                    {dashboardStats?.action_required_unpaid ?? 0}
                                </span>
                            )}
                            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                                Pending Payment
                            </span>
                        </div>
                    </div>

                    {/* Month Expenditure */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-slate-500">Monthly Expenditure</span>
                            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                            </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                            {statsLoading ? (
                                <div className="h-8 w-24 bg-slate-100 rounded-lg animate-pulse" />
                            ) : (
                                <span className="text-2xl font-black text-slate-900">
                                    ₦{parseFloat(dashboardStats?.completed_this_month_revenue ?? 0).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            )}
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                                Completed
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filter & Search Toolbar */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                            search
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by Order ID or Distributor..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        )}
                    </div>

                    {/* Status Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
                        {filterTabs.map((tab) => {
                            const isSelected = activeFilter === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => { setActiveFilter(tab.id); setPage(1); }}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                        isSelected
                                            ? 'bg-slate-900 text-white shadow-xs'
                                            : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Orders Content Area */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    {/* Table View */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-150 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="px-6 py-3.5">Order ID</th>
                                    <th className="px-6 py-3.5">Date</th>
                                    <th className="px-6 py-3.5">Distributor</th>
                                    <th className="px-6 py-3.5">Total Amount</th>
                                    <th className="px-6 py-3.5">Status</th>
                                    <th className="px-6 py-3.5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-xs">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center text-slate-500">
                                            <div className="w-8 h-8 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-2" />
                                            <span>Loading your orders…</span>
                                        </td>
                                    </tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center">
                                            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                                <span className="material-symbols-outlined text-2xl">receipt_long</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-slate-800 mb-1">No orders found</h4>
                                            <p className="text-slate-400 text-xs mb-4 max-w-sm mx-auto">
                                                {searchQuery
                                                    ? 'No orders match your search query.'
                                                    : 'You have not placed any wholesale orders in this status yet.'}
                                            </p>
                                            <Link
                                                to="/dashboard"
                                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-black transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">storefront</span>
                                                <span>Browse Wholesale Catalog</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => {
                                        const status = getStatusInfo(order.status);
                                        return (
                                            <tr
                                                key={order.id}
                                                onClick={() => navigate(`/orders/${order.id}`)}
                                                className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                                            >
                                                {/* Order ID */}
                                                <td className="px-6 py-4 font-mono font-bold text-slate-900">
                                                    #{order.order_number || String(order.id).slice(0, 8)}
                                                </td>

                                                {/* Date */}
                                                <td className="px-6 py-4 text-slate-500">
                                                    {order.created_at
                                                        ? new Date(order.created_at).toLocaleDateString('en-NG', {
                                                              day: 'numeric',
                                                              month: 'short',
                                                              year: 'numeric',
                                                          })
                                                        : '—'}
                                                </td>

                                                {/* Distributor */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                                                            {order.distributor_name ? order.distributor_name.charAt(0).toUpperCase() : 'D'}
                                                        </div>
                                                        <span className="font-semibold text-slate-800">
                                                            {order.distributor_name || 'Distributor'}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Total Amount */}
                                                <td className="px-6 py-4 font-bold text-slate-900">
                                                    ₦{parseFloat(order.total_amount || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                                                </td>

                                                {/* Status Pill */}
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${status.bg}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                                                        {status.label}
                                                    </span>
                                                </td>

                                                {/* Action */}
                                                <td className="px-6 py-4 text-right">
                                                    {order.status === 'pending' ? (
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors">
                                                            <span>Pay Now</span>
                                                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-500 group-hover:text-slate-900 font-semibold text-xs transition-colors">
                                                            View Details →
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-3.5 border-t border-slate-150 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
                            <span>
                                Page <span className="font-bold text-slate-800">{page}</span> of {totalPages} ({totalOrders} orders)
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold disabled:opacity-40 hover:bg-slate-50 transition-colors"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold disabled:opacity-40 hover:bg-slate-50 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default OrdersPage;
