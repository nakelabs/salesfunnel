import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import DistributorNavbar from '../components/DistributorNavbar';

const DistributorDashboard = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Trend data for mini charts
    const revenueData = [];

    const ordersData = [];

    const dispatchData = [];

    const paymentsData = [];

    const stats = [];

    // Large chart data
    const monthlyRevenueData = [];

    const orderDistributionData = [];

    const orders = [];

    const filters = [
        { id: 'all', label: 'All Orders', badge: null },
        { id: 'new', label: 'New', badge: null },
        { id: 'processing', label: 'Processing', badge: null },
        { id: 'shipped', label: 'Shipped', badge: null },
        { id: 'completed', label: 'Completed', badge: null }
    ];

    const getPaymentBadgeClasses = (color) => {
        const classes = {
            green: 'bg-green-100 text-green-700 border-green-200',
            amber: 'bg-amber-100 text-amber-700 border-amber-200'
        };
        return classes[color] || '';
    };

    const getStatusBadgeClasses = (color) => {
        const classes = {
            blue: 'bg-primary/10 text-primary',
            gray: 'bg-slate-100 text-slate-600',
            purple: 'bg-purple-100 text-purple-700',
            slate: 'bg-slate-200 text-slate-600'
        };
        return classes[color] || '';
    };

    return (
        <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Navbar */}
            <DistributorNavbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                        </div>
                    </div>

                    {/* Order Distribution Chart */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Order Status</h3>
                            <p className="text-sm text-slate-500 mt-1">Current distribution</p>
                        </div>
                        <div className="h-64 flex flex-col items-center justify-center">
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
                                    {orders
                                        .filter(order => {
                                            const matchesSearch = searchQuery === '' ||
                                                order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                order.wholesaler.toLowerCase().includes(searchQuery.toLowerCase());
                                            return matchesSearch;
                                        })
                                        .map((order, index) => (
                                            <tr key={index} className="group hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                                                <td className="px-6 py-4 text-slate-600">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                                            {order.wholesaler[0]}
                                                        </div>
                                                        {order.wholesaler}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">{order.date}</td>
                                                <td className="px-6 py-4 font-semibold text-slate-900">{order.amount}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getPaymentBadgeClasses(order.paymentColor)}`}>
                                                        <span className="material-symbols-outlined text-[14px]">
                                                            {order.paymentColor === 'green' ? 'check_circle' : 'hourglass_top'}
                                                        </span>
                                                        {order.paymentStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusBadgeClasses(order.statusColor)} ${order.statusColor === 'blue' ? 'relative pl-4' : ''}`}>
                                                        {order.statusColor === 'blue' && (
                                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                                                        )}
                                                        {order.statusColor === 'purple' && (
                                                            <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                                                        )}
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-400 hover:text-primary transition-colors p-1.5 hover:bg-blue-50 rounded-lg">
                                                        <span className="material-symbols-outlined">visibility</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
                            <p className="text-sm text-slate-500">Showing 5 of 12 new orders</p>
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
            </main>
        </div>
    );
};

export default DistributorDashboard;
