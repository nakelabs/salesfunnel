import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DistributorDashboard = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const stats = [
        {
            icon: 'add_shopping_cart',
            iconBg: 'bg-blue-50',
            iconColor: 'text-primary',
            label: 'New Orders (Today)',
            value: '12',
            trend: '+20%',
            trendUp: true
        },
        {
            icon: 'pending',
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-600',
            label: 'Pending Payments',
            value: '₦4,500',
            trend: null
        },
        {
            icon: 'local_shipping',
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600',
            label: 'Ready for Dispatch',
            value: '8',
            trend: '+5%',
            trendUp: true
        },
        {
            icon: 'payments',
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            label: 'Total Revenue (Monthly)',
            value: '₦125k',
            trend: '+12%',
            trendUp: true
        }
    ];

    const orders = [
        {
            id: '#ORD-2024-001',
            wholesaler: 'Acme Wholesale',
            date: 'Oct 24, 2024',
            amount: '₦1,200.00',
            paymentStatus: 'Paid (Instant)',
            paymentColor: 'green',
            status: 'New',
            statusColor: 'blue'
        },
        {
            id: '#ORD-2024-002',
            wholesaler: 'City Supplies',
            date: 'Oct 24, 2024',
            amount: '₦540.50',
            paymentStatus: 'Pending',
            paymentColor: 'amber',
            status: 'Processing',
            statusColor: 'gray'
        },
        {
            id: '#ORD-2024-003',
            wholesaler: 'Global Mart',
            date: 'Oct 23, 2024',
            amount: '₦2,890.00',
            paymentStatus: 'Paid (Instant)',
            paymentColor: 'green',
            status: 'New',
            statusColor: 'blue'
        },
        {
            id: '#ORD-2024-004',
            wholesaler: 'Urban Retailers',
            date: 'Oct 22, 2024',
            amount: '₦850.00',
            paymentStatus: 'Paid',
            paymentColor: 'green',
            status: 'Shipped',
            statusColor: 'purple'
        },
        {
            id: '#ORD-2024-005',
            wholesaler: 'Westside Grocers',
            date: 'Oct 20, 2024',
            amount: '₦3,210.00',
            paymentStatus: 'Paid',
            paymentColor: 'green',
            status: 'Completed',
            statusColor: 'slate'
        }
    ];

    const filters = [
        { id: 'all', label: 'All Orders', badge: null },
        { id: 'new', label: 'New', badge: 12 },
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
        <div className="bg-background-light font-display text-slate-900 flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
                {/* Logo */}
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg">
                        <span className="material-symbols-outlined text-3xl">inventory_2</span>
                    </div>
                    <div>
                        <h1 className="text-slate-900 text-lg font-bold leading-tight">SalesFunnel</h1>
                        <p className="text-slate-500 text-xs font-medium">Distributor Panel</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 flex flex-col gap-2 mt-4 overflow-y-auto">
                    <Link
                        to="/distributor-dashboard"
                        className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary text-white shadow-sm"
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <Link
                        to="/inventory"
                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">package_2</span>
                        <span className="text-sm font-medium">Inventory</span>
                    </Link>
                    <Link
                        to="/payments"
                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">credit_card</span>
                        <span className="text-sm font-medium">Payments</span>
                    </Link>
                    <Link
                        to="/settings"
                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm font-medium">Settings</span>
                    </Link>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-slate-200">
                    <Link to="/distributor-profile" className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-lg transition-colors">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-white shadow-sm">
                            <span className="material-symbols-outlined text-primary">account_circle</span>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-slate-900">James Wilson</p>
                            <p className="text-xs text-slate-500">Global Distributors</p>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white/50 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between shrink-0 sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
                        <p className="text-sm text-slate-500 hidden md:block">Here's your daily overview.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="hidden md:flex relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">
                                    search
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by Order ID or Wholesaler..."
                                className="block w-full min-w-[320px] pl-10 pr-3 py-2.5 border-none rounded-lg bg-slate-100 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
                            />
                        </div>

                        {/* Notifications */}
                        <Link to="/distributor-notifications" className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                            </span>
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto flex flex-col gap-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 ${stat.iconBg} rounded-lg`}>
                                            <span className={`material-symbols-outlined ${stat.iconColor}`}>
                                                {stat.icon}
                                            </span>
                                        </div>
                                        {stat.trend && (
                                            <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                                <span className="material-symbols-outlined text-[14px] mr-1">
                                                    trending_up
                                                </span>
                                                {stat.trend}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                                    <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Recent Orders */}
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <h3 className="text-xl font-bold text-slate-900">Recent Orders</h3>

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
                                            className="block w-full sm:w-80 pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Filter Pills */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                                        {filters.map((filter) => (
                                            <button
                                                key={filter.id}
                                                onClick={() => setActiveFilter(filter.id)}
                                                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === filter.id
                                                    ? 'bg-primary text-white shadow-sm ring-1 ring-primary'
                                                    : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {filter.label}
                                                {filter.badge && (
                                                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px]">
                                                        {filter.badge}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
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
                                            <tbody className="divide-y divide-slate-200">
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
                                                                    <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden"></div>
                                                                    {order.wholesaler}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-slate-500">{order.date}</td>
                                                            <td className="px-6 py-4 font-medium text-slate-900">{order.amount}</td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentBadgeClasses(order.paymentColor)}`}>
                                                                    <span className="material-symbols-outlined text-[14px]">
                                                                        {order.paymentColor === 'green' ? 'check_circle' : 'hourglass_top'}
                                                                    </span>
                                                                    {order.paymentStatus}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(order.statusColor)} ${order.statusColor === 'blue' ? 'relative pl-4' : ''}`}>
                                                                    {order.statusColor === 'blue' && (
                                                                        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-current"></span>
                                                                    )}
                                                                    {order.statusColor === 'purple' && (
                                                                        <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                                                                    )}
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <button className="text-slate-400 hover:text-primary transition-colors">
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
                                            <button className="px-3 py-1 text-sm border border-slate-200 rounded bg-white hover:bg-slate-50 transition-colors text-slate-600">
                                                Previous
                                            </button>
                                            <button className="px-3 py-1 text-sm border border-slate-200 rounded bg-white hover:bg-slate-50 transition-colors text-slate-600">
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DistributorDashboard;
