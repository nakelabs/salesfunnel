import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import DistributorNavbar from '../components/DistributorNavbar';
import distributorService from '../services/distributor.service';
import authService from '../services/auth.service';

const DistributorDashboard = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);
    const navigate = useNavigate();

    const user = authService.getCurrentUser();
    const distributorId = user?.id;

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            const results = await Promise.allSettled([
                distributorService.getNewOrders(),
                distributorId ? distributorService.getDistributorProducts(distributorId) : Promise.resolve([]),
            ]);

            // Orders
            if (results[0].status === 'fulfilled') {
                const orderData = results[0].value;
                const orderList = Array.isArray(orderData) ? orderData : (orderData.orders || orderData.data || []);
                setOrders(orderList);
            } else {
                console.error('Failed to fetch orders:', results[0].reason);
            }

            // Products
            if (results[1].status === 'fulfilled') {
                const productData = results[1].value;
                const productList = Array.isArray(productData) ? productData : (productData.products || productData.data || []);
                setProducts(productList);
            } else {
                console.error('Failed to fetch products:', results[1].reason);
            }
        } catch (err) {
            console.error('Dashboard data fetch error:', err);
            setError(err.response?.data?.detail || 'Failed to load dashboard data.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            setUpdatingOrderId(orderId);
            await distributorService.updateOrderStatus(orderId, { status: newStatus });
            // Refresh orders after status update
            const orderData = await distributorService.getNewOrders();
            const orderList = Array.isArray(orderData) ? orderData : (orderData.orders || orderData.data || []);
            setOrders(orderList);
        } catch (err) {
            console.error('Failed to update order status:', err);
            alert(err.response?.data?.detail || 'Failed to update order status.');
        } finally {
            setUpdatingOrderId(null);
        }
    };

    // Compute stats from real data
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || o.amount || 0), 0);
    const newOrdersCount = orders.filter(o => (o.status || '').toLowerCase() === 'new' || (o.status || '').toLowerCase() === 'pending').length;
    const processingCount = orders.filter(o => (o.status || '').toLowerCase() === 'processing').length;
    const completedCount = orders.filter(o => (o.status || '').toLowerCase() === 'completed' || (o.status || '').toLowerCase() === 'delivered').length;

    // Trend data for mini charts (empty placeholder — server doesn't provide time-series)
    const revenueData = [];
    const ordersData = [];
    const dispatchData = [];
    const paymentsData = [];

    const stats = [
        { label: 'Total Revenue', value: `₦${totalRevenue.toLocaleString()}`, data: revenueData, color: '#3b82f6' },
        { label: 'New Orders', value: newOrdersCount.toString(), data: ordersData, color: '#10b981' },
        { label: 'Products', value: products.length.toString(), data: dispatchData, color: '#8b5cf6' },
        { label: 'Completed', value: completedCount.toString(), data: paymentsData, color: '#f59e0b' },
    ];

    // Large chart data (computed from orders if any)
    const monthlyRevenueData = [];
    const orderDistributionData = orders.length > 0 ? [
        { name: 'New', value: newOrdersCount, color: '#3b82f6' },
        { name: 'Processing', value: processingCount, color: '#f59e0b' },
        { name: 'Completed', value: completedCount, color: '#10b981' },
    ].filter(d => d.value > 0) : [];

    const filters = [
        { id: 'all', label: 'All Orders', badge: orders.length || null },
        { id: 'new', label: 'New', badge: newOrdersCount || null },
        { id: 'processing', label: 'Processing', badge: processingCount || null },
        { id: 'shipped', label: 'Shipped', badge: null },
        { id: 'completed', label: 'Completed', badge: completedCount || null }
    ];

    // Filter orders based on selected filter and search
    const filteredOrders = orders.filter(order => {
        const status = (order.status || '').toLowerCase();
        const matchesFilter = activeFilter === 'all' ||
            (activeFilter === 'new' && (status === 'new' || status === 'pending')) ||
            (activeFilter === 'processing' && status === 'processing') ||
            (activeFilter === 'shipped' && status === 'shipped') ||
            (activeFilter === 'completed' && (status === 'completed' || status === 'delivered'));

        const orderId = order.id || order.order_id || '';
        const wholesalerName = order.wholesaler_name || order.wholesaler || order.customer_name || '';
        const matchesSearch = searchQuery === '' ||
            String(orderId).toLowerCase().includes(searchQuery.toLowerCase()) ||
            wholesalerName.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const getPaymentBadgeClasses = (status) => {
        const s = (status || '').toLowerCase();
        if (s === 'paid' || s === 'completed') return 'bg-green-100 text-green-700 border-green-200';
        if (s === 'pending') return 'bg-amber-100 text-amber-700 border-amber-200';
        return 'bg-slate-100 text-slate-600 border-slate-200';
    };

    const getStatusBadgeClasses = (status) => {
        const s = (status || '').toLowerCase();
        if (s === 'new' || s === 'pending') return 'bg-primary/10 text-primary';
        if (s === 'processing') return 'bg-amber-100 text-amber-700';
        if (s === 'shipped') return 'bg-purple-100 text-purple-700';
        if (s === 'completed' || s === 'delivered') return 'bg-green-100 text-green-700';
        return 'bg-slate-100 text-slate-600';
    };

    const getStatusIcon = (status) => {
        const s = (status || '').toLowerCase();
        if (s === 'shipped') return 'local_shipping';
        if (s === 'completed' || s === 'delivered') return 'check_circle';
        if (s === 'processing') return 'hourglass_top';
        return null;
    };

    return (
        <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Navbar */}
            <DistributorNavbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Error Banner */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">error</span>
                        <p className="text-sm text-red-700 flex-1">{error}</p>
                        <button onClick={fetchDashboardData} className="text-sm font-semibold text-red-600 hover:text-red-800">Retry</button>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-500 text-sm">Loading dashboard...</p>
                    </div>
                ) : (
                    <>
                        {/* Stats Grid with Mini Charts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <p className="text-slate-500 text-sm font-medium mb-2">{stat.label}</p>
                                            <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                                        </div>
                                        {stat.trend && (
                                            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                                <span className="material-symbols-outlined text-[14px] mr-0.5">
                                                    trending_up
                                                </span>
                                                {stat.trend}
                                            </span>
                                        )}
                                    </div>

                                    {/* Mini Chart */}
                                    {stat.data.length > 0 && (
                                        <div className="h-16 -mb-2 -mx-2">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={stat.data}>
                                                    <defs>
                                                        <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor={stat.color} stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor={stat.color} stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <Area
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke={stat.color}
                                                        strokeWidth={2}
                                                        fill={`url(#gradient-${index})`}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {/* Revenue Trend Chart */}
                            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">Revenue Trend</h3>
                                    <p className="text-sm text-slate-500 mt-1">Monthly revenue overview</p>
                                </div>
                                <div className="h-64">
                                    {monthlyRevenueData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={monthlyRevenueData}>
                                                <defs>
                                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <Area
                                                    type="monotone"
                                                    dataKey="revenue"
                                                    stroke="#3b82f6"
                                                    strokeWidth={3}
                                                    fill="url(#revenueGradient)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                                            No revenue data available yet
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Distribution Chart */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">Order Status</h3>
                                    <p className="text-sm text-slate-500 mt-1">Current distribution</p>
                                </div>
                                <div className="h-64 flex flex-col items-center justify-center">
                                    {orderDistributionData.length > 0 ? (
                                        <>
                                            <div className="w-full h-48">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={orderDistributionData}
                                                            cx="50%"
                                                            cy="50%"
                                                            innerRadius={45}
                                                            outerRadius={70}
                                                            paddingAngle={2}
                                                            dataKey="value"
                                                        >
                                                            {orderDistributionData.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                                            ))}
                                                        </Pie>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 mt-4 w-full">
                                                {orderDistributionData.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                        <span className="text-xs text-slate-600 font-medium">{item.name}: {item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                                            No order data available yet
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Orders */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h3 className="text-xl font-bold text-slate-900"> Orders</h3>

                                {/* Search Bar */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                                            search
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by Order ID or Wholesaler..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="block w-full sm:w-80 pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    />
                                </div>
                            </div>

                            {/* Filter Pills */}
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {filters.map((filter) => (
                                    <button
                                        key={filter.id}
                                        onClick={() => setActiveFilter(filter.id)}
                                        className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === filter.id
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        {filter.label}
                                        {filter.badge && (
                                            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-white/20 text-xs">
                                                {filter.badge}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Orders Table */}
                            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold text-slate-700">Order ID</th>
                                                <th className="px-6 py-4 font-semibold text-slate-700">Wholesaler</th>
                                                <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                                                <th className="px-6 py-4 font-semibold text-slate-700">Amount</th>
                                                <th className="px-6 py-4 font-semibold text-slate-700">Payment</th>
                                                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredOrders.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                                                        <span className="material-symbols-outlined text-4xl mb-2 block">inbox</span>
                                                        No orders found
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredOrders.map((order, index) => {
                                                    const orderId = order.id || order.order_id || `ORD-${index}`;
                                                    const wholesaler = order.wholesaler_name || order.wholesaler || order.customer_name || 'N/A';
                                                    const date = order.created_at || order.date || order.order_date || '';
                                                    const amount = order.total_amount || order.amount || 0;
                                                    const paymentStatus = order.payment_status || 'pending';
                                                    const status = order.status || 'new';

                                                    return (
                                                        <tr key={orderId + '-' + index} className="group hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/distributor-orders/${orderId}`)}>
                                                            <td className="px-6 py-4 font-medium text-slate-900">{orderId}</td>
                                                            <td className="px-6 py-4 text-slate-600">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                                                        {wholesaler[0] || '?'}
                                                                    </div>
                                                                    {wholesaler}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-slate-500">
                                                                {date ? new Date(date).toLocaleDateString('en-NG', {
                                                                    year: 'numeric', month: 'short', day: 'numeric'
                                                                }) : 'N/A'}
                                                            </td>
                                                            <td className="px-6 py-4 font-semibold text-slate-900">
                                                                ₦{Number(amount).toLocaleString()}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getPaymentBadgeClasses(paymentStatus)}`}>
                                                                    <span className="material-symbols-outlined text-[14px]">
                                                                        {paymentStatus.toLowerCase() === 'paid' || paymentStatus.toLowerCase() === 'completed' ? 'check_circle' : 'hourglass_top'}
                                                                    </span>
                                                                    {paymentStatus}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusBadgeClasses(status)}`}>
                                                                    {getStatusIcon(status) && (
                                                                        <span className="material-symbols-outlined text-[14px]">{getStatusIcon(status)}</span>
                                                                    )}
                                                                    {status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); navigate(`/distributor-orders/${orderId}`); }}
                                                                    className="text-slate-400 hover:text-primary transition-colors p-1.5 hover:bg-blue-50 rounded-lg"
                                                                    title="View order details"
                                                                >
                                                                    <span className="material-symbols-outlined">visibility</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Footer */}
                                <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
                                    <p className="text-sm text-slate-500">
                                        Showing {filteredOrders.length} of {orders.length} orders
                                    </p>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors text-slate-600 font-medium">
                                            Previous
                                        </button>
                                        <button className="px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors text-slate-600 font-medium">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default DistributorDashboard;
