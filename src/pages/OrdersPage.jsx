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

    // Handle search manually or by API if supported. For now, client-side if missing API param.
    const filteredOrders = orders.filter(order => 
        order.id?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        order.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.distributor_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusInfo = (status) => {
        switch (status) {
            case 'pending': return { label: 'Pending Payment', cls: 'bg-amber-100 text-amber-700' };
            case 'paid': return { label: 'Paid', cls: 'bg-blue-100 text-blue-700' };
            case 'approved': return { label: 'Approved', cls: 'bg-purple-100 text-purple-700' };
            case 'ready_for_pickup': return { label: 'Ready for Pickup', cls: 'bg-emerald-100 text-emerald-700' };
            case 'completed': return { label: 'Completed', cls: 'bg-green-100 text-green-700' };
            case 'cancelled': return { label: 'Cancelled', cls: 'bg-red-100 text-red-700' };
            default: return { label: status, cls: 'bg-slate-100 text-slate-700' };
        }
    };

    const getProgressIndicator = (order) => {
        const info = getStatusInfo(order.status);
        return (
            <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${info.cls}`}>
                    {info.label}
                </span>
            </div>
        );
    };

    return (
        <div className="bg-white min-h-screen text-slate-900 font-display transition-colors duration-200" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Shared Navbar */}
            <WholesalerNavbar />

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900">Order Dashboard</h2>
                        <p className="text-slate-500 text-base">Welcome back, {profileData?.wholesaler_profile?.business_name || profileData?.distributor_profile?.business_name || profileData?.full_name || 'Wholesaler'}. Here is an overview of your procurement status.</p>
                    </div>
                    <Link to="/dashboard" className="flex items-center justify-center h-11 px-6 rounded-lg bg-primary hover:bg-blue-600 text-white shadow-sm transition-all font-semibold">
                        Create New Order
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Orders in Progress */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-full group hover:border-primary/50 transition-colors">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">inventory</span>
                            <p className="text-slate-600 font-medium text-sm">Orders in Progress</p>
                        </div>
                        <div className="flex items-end gap-3">
                            {statsLoading ? (
                                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            ) : (
                                <p className="text-3xl font-bold text-slate-900">
                                    {dashboardStats?.orders_in_progress ?? 0}
                                </p>
                            )}
                            <span className="text-blue-500 text-sm font-semibold mb-1">PAID status</span>
                        </div>
                    </div>

                    {/* Action Required */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-full group hover:border-amber-400 transition-colors">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-amber-500 text-xl">warning</span>
                            <p className="text-slate-600 font-medium text-sm">Action Required (Unpaid)</p>
                        </div>
                        <div className="flex items-end gap-3">
                            {statsLoading ? (
                                <div className="w-8 h-8 border-2 border-amber-300 border-t-amber-500 rounded-full animate-spin" />
                            ) : (
                                <p className="text-3xl font-bold text-slate-900">
                                    {dashboardStats?.action_required_unpaid ?? 0}
                                </p>
                            )}
                            <span className="text-amber-600 text-sm font-semibold mb-1">PENDING status</span>
                        </div>
                    </div>

                    {/* Revenue this Month */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-full group hover:border-emerald-400 transition-colors">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-emerald-500 text-xl">payments</span>
                            <p className="text-slate-600 font-medium text-sm">Month Expenditure</p>
                        </div>
                        <div className="flex items-end gap-3">
                            {statsLoading ? (
                                <div className="w-8 h-8 border-2 border-emerald-300 border-t-emerald-500 rounded-full animate-spin" />
                            ) : (
                                <p className="text-3xl font-bold text-slate-900">
                                    ₦{parseFloat(dashboardStats?.completed_this_month_revenue ?? 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                                </p>
                            )}
                            <span className="text-emerald-600 text-sm font-semibold mb-1">Completed</span>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
                    <div className="relative w-full lg:w-96">
                        <input
                            className="block w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                            placeholder="Search by Order ID or Distributor Name"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 w-full lg:w-auto">
                        <button
                            onClick={() => {setActiveFilter('all'); setPage(1);}}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors ${activeFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            All Orders
                        </button>
                        <button
                            onClick={() => {setActiveFilter('pending'); setPage(1);}}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'pending' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Pending Payment
                        </button>
                        <button
                            onClick={() => {setActiveFilter('paid'); setPage(1);}}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'paid' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Paid
                        </button>
                        <button
                            onClick={() => {setActiveFilter('approved'); setPage(1);}}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'approved' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Approved
                        </button>
                        <button
                            onClick={() => {setActiveFilter('ready_for_pickup'); setPage(1);}}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'ready_for_pickup' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Ready for Pickup
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Distributor</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Amount</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[340px]">Progress Flow</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-slate-500">Loading orders...</td>
                                    </tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No orders found.</td>
                                    </tr>
                                ) : filteredOrders.map((order) => (
                                    <tr 
                                        key={order.id} 
                                        onClick={() => navigate(`/orders/${order.id}`)}
                                        className="hover:bg-slate-50 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-bold text-slate-900">{order.order_number || order.id.substring(0, 8)}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`size-6 rounded flex items-center justify-center border border-slate-200 text-slate-600 text-xs font-bold mr-2`}>
                                                    {order.distributor_name ? order.distributor_name.charAt(0).toUpperCase() : 'D'}
                                                </div>
                                                <span className="text-sm text-slate-900 font-medium">{order.distributor_name || 'Unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                                            ₦{parseFloat(order.total_amount || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getProgressIndicator(order)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {order.status === 'pending' ? (
                                                <button className="text-primary hover:text-blue-700 font-semibold">
                                                    Pay Now
                                                </button>
                                            ) : (
                                                <button className="text-slate-600 hover:text-slate-900 font-medium text-sm">
                                                    View
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                            Showing Page {page} of {totalPages} ({totalOrders} total orders)
                        </span>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 text-sm border border-slate-300 rounded bg-white text-slate-500 disabled:opacity-50 hover:bg-slate-50 disabled:hover:bg-white transition-colors">
                                Prev
                            </button>
                            <button 
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages || totalPages === 0}
                                className="px-3 py-1 text-sm border border-slate-300 rounded bg-white text-slate-900 hover:bg-slate-50 disabled:opacity-50 disabled:text-slate-500 disabled:hover:bg-white transition-colors">
                                Next
                            </button>
                        </div>
                    </div>
                </div>


            </main>
        </div>
    );
};

export default OrdersPage;
