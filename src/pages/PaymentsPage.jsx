import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentsPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const payments = [
        {
            id: '#TRX-9821',
            order: '#SF-1209',
            wholesaler: 'Aliko & Sons Ent.',
            location: 'Lagos Branch',
            amount: 245000,
            date: 'Oct 24, 2023',
            time: '10:45 AM',
            reference: 'SF-PAY-AB22X',
            status: 'unverified'
        },
        {
            id: '#TRX-9819',
            order: '#SF-1205',
            wholesaler: 'Lagos Retail Hub',
            location: 'Ikeja Main',
            amount: 120500,
            date: 'Oct 24, 2023',
            time: '09:12 AM',
            reference: 'SF-PAY-XY991',
            status: 'verified'
        },
        {
            id: '#TRX-9815',
            order: '#SF-1192',
            wholesaler: 'Golden Star Stores',
            location: 'Abuja Central',
            amount: 500000,
            date: 'Oct 23, 2023',
            time: '04:30 PM',
            reference: 'SF-PAY-JK882',
            status: 'flagged'
        },
        {
            id: '#TRX-9814',
            order: '#SF-1191',
            wholesaler: 'Quick-Buy Vendors',
            location: 'Kano City',
            amount: 85000,
            date: 'Oct 23, 2023',
            time: '03:15 PM',
            reference: 'SF-PAY-QQ129',
            status: 'unverified'
        }
    ];

    const stats = {
        totalRevenue: 4520000,
        revenueChange: '+12.5%',
        pendingVerifications: 18,
        verifiedToday: 24,
        verifiedChange: '+5%'
    };

    const tabs = [
        { id: 'all', name: 'All', count: 142 },
        { id: 'unverified', name: 'Unverified', count: 18 },
        { id: 'verified', name: 'Verified', count: null },
        { id: 'flagged', name: 'Flagged', count: null }
    ];

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = searchQuery === '' ||
            payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.wholesaler.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.reference.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTab = activeTab === 'all' || payment.status === activeTab;

        return matchesSearch && matchesTab;
    });

    const formatPrice = (amount) => `₦${amount.toLocaleString()}`;

    const getStatusBadgeClasses = (status) => {
        const classes = {
            unverified: 'bg-amber-100 text-amber-800',
            verified: 'bg-emerald-100 text-emerald-800',
            flagged: 'bg-red-100 text-red-800'
        };
        return classes[status] || '';
    };

    const getStatusText = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
        <div className="bg-background-light font-display flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0">
                {/* Logo */}
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg p-2 text-white">
                            <span className="material-symbols-outlined text-2xl">monitoring</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 text-lg font-bold leading-tight">SalesFunnel</h1>
                            <p className="text-slate-500 text-xs font-medium">Distributor Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-1">
                    <Link
                        to="/distributor-dashboard"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <a
                        href="#"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">shopping_bag</span>
                        <span className="text-sm font-medium">Orders</span>
                    </a>
                    <Link
                        to="/payments"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
                            payments
                        </span>
                        <span className="text-sm font-semibold">Payments</span>
                    </Link>
                    <Link
                        to="/inventory"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">inventory_2</span>
                        <span className="text-sm font-medium">Inventory</span>
                    </Link>
                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <a
                            href="#"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            <span className="material-symbols-outlined">settings</span>
                            <span className="text-sm font-medium">Settings</span>
                        </a>
                    </div>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-slate-200">
                    <Link to="/distributor-profile" className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className="size-10 rounded-full bg-slate-200"></div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate">Adeola Johnson</p>
                            <p className="text-xs text-slate-500 truncate">Main Distributor</p>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-background-light">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Page Heading */}
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-slate-900 text-3xl font-black tracking-tight">Payments</h2>
                            <p className="text-slate-500 mt-1">Monitor and verify all wholesaler bank transfers.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-lg">download</span>
                                <span>Export CSV</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white flex flex-col gap-2 rounded-xl p-6 border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
                                <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                            </div>
                            <p className="text-slate-900 tracking-tight text-3xl font-bold">
                                {formatPrice(stats.totalRevenue)}
                            </p>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-emerald-500 text-sm font-bold">
                                    trending_up
                                </span>
                                <p className="text-emerald-500 text-sm font-bold">{stats.revenueChange}</p>
                                <span className="text-slate-400 text-xs ml-1">vs last month</span>
                            </div>
                        </div>

                        <div className="bg-white flex flex-col gap-2 rounded-xl p-6 border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-sm font-medium">Pending Verifications</p>
                                <span className="material-symbols-outlined text-amber-500">pending_actions</span>
                            </div>
                            <p className="text-slate-900 tracking-tight text-3xl font-bold">
                                {stats.pendingVerifications}
                            </p>
                            <p className="text-slate-400 text-xs">Awaiting proof check</p>
                        </div>

                        <div className="bg-white flex flex-col gap-2 rounded-xl p-6 border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-sm font-medium">Verified Today</p>
                                <span className="material-symbols-outlined text-emerald-500">verified</span>
                            </div>
                            <p className="text-slate-900 tracking-tight text-3xl font-bold">
                                {stats.verifiedToday}
                            </p>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-emerald-500 text-sm font-bold">add</span>
                                <p className="text-emerald-500 text-sm font-bold">{stats.verifiedChange}</p>
                                <span className="text-slate-400 text-xs ml-1">increase</span>
                            </div>
                        </div>
                    </div>

                    {/* Filters & Table */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 gap-4">
                            {/* Tabs */}
                            <div className="flex border-b border-transparent gap-6">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 border-b-2 pb-2 px-1 transition-colors ${activeTab === tab.id
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-slate-500 hover:text-slate-700'
                                            }`}
                                    >
                                        <p className="text-sm font-bold tracking-wide">{tab.name}</p>
                                        {tab.count && (
                                            <span className={`px-2 py-0.5 rounded text-[10px] ${activeTab === tab.id
                                                ? 'bg-primary/10 text-primary'
                                                : 'bg-slate-100'
                                                }`}>
                                                {tab.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Search Bar */}
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
                                        placeholder="Search by reference or wholesaler..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-y border-slate-200">
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            Transaction ID
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            Wholesaler
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                                            Amount
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            Reference
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {filteredPayments.map((payment, index) => (
                                        <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-slate-900">{payment.id}</p>
                                                <p className="text-xs text-slate-500">Order: {payment.order}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-semibold text-slate-900">{payment.wholesaler}</p>
                                                <p className="text-xs text-slate-500">{payment.location}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <p className="text-sm font-bold text-slate-900">
                                                    {formatPrice(payment.amount)}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-slate-600">{payment.date}</p>
                                                <p className="text-xs text-slate-500">{payment.time}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">
                                                    {payment.reference}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClasses(payment.status)}`}>
                                                    {getStatusText(payment.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {payment.status === 'unverified' && (
                                                    <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                                                        Verify
                                                    </button>
                                                )}
                                                {payment.status === 'verified' && (
                                                    <button className="text-slate-400 hover:text-slate-600">
                                                        <span className="material-symbols-outlined">visibility</span>
                                                    </button>
                                                )}
                                                {payment.status === 'flagged' && (
                                                    <button className="bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">
                                                        Review
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200">
                            <p className="text-sm text-slate-500">Showing 1 to 4 of 142 entries</p>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border border-slate-200 rounded text-sm disabled:opacity-50" disabled>
                                    Previous
                                </button>
                                <button className="px-3 py-1 bg-primary text-white rounded text-sm">1</button>
                                <button className="px-3 py-1 border border-slate-200 rounded text-sm hover:bg-slate-50">
                                    2
                                </button>
                                <button className="px-3 py-1 border border-slate-200 rounded text-sm hover:bg-slate-50">
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

export default PaymentsPage;
