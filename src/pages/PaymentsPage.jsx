import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import DistributorNavbar from '../components/DistributorNavbar';

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

    // Chart Data
    const revenueData = [
        { value: 40 }, { value: 35 }, { value: 55 }, { value: 45 }, { value: 60 }, { value: 55 }, { value: 75 }
    ];

    const pendingData = [
        { value: 12 }, { value: 15 }, { value: 10 }, { value: 18 }, { value: 14 }, { value: 16 }, { value: 18 }
    ];

    const verifiedData = [
        { value: 20 }, { value: 22 }, { value: 25 }, { value: 28 }, { value: 24 }, { value: 30 }, { value: 35 }
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
        <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Navbar */}
            <DistributorNavbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Payments</h2>
                    <p className="text-sm text-slate-500 mt-1">Monitor and verify all wholesaler bank transfers</p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Revenue */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between h-44">
                        <div className="px-6 pt-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
                                <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                    {stats.revenueChange}
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{formatPrice(stats.totalRevenue)}</h3>
                        </div>
                        <div className="h-16 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#colorRevenue)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pending Verifications */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between h-44">
                        <div className="px-6 pt-6">
                            <p className="text-slate-500 text-sm font-medium">Pending Verifications</p>
                            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stats.pendingVerifications}</h3>
                        </div>
                        <div className="h-16 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={pendingData}>
                                    <defs>
                                        <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="value" stroke="#f59e0b" fill="url(#colorPending)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Verified Today */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between h-44">
                        <div className="px-6 pt-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-slate-500 text-sm font-medium">Verified Today</p>
                                <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                    {stats.verifiedChange}
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stats.verifiedToday}</h3>
                        </div>
                        <div className="h-16 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={verifiedData}>
                                    <defs>
                                        <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#colorVerified)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Filters & Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 gap-4 border-b border-slate-200">
                        {/* Tabs */}
                        <div className="flex gap-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 pb-2 px-1 transition-colors text-sm font-semibold ${activeTab === tab.id
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    <span>{tab.name}</span>
                                    {tab.count && (
                                        <span className={`px-2 py-0.5 rounded text-xs ${activeTab === tab.id
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
                                <tr className="bg-slate-50 border-b border-slate-200">
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
                    <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 bg-slate-50">
                        <p className="text-sm text-slate-500">Showing 1 to 4 of 142 entries</p>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-slate-200 rounded text-sm disabled:opacity-50 bg-white hover:bg-slate-50" disabled>
                                Previous
                            </button>
                            <button className="px-3 py-1 bg-primary text-white rounded text-sm">1</button>
                            <button className="px-3 py-1 border border-slate-200 rounded text-sm hover:bg-slate-50 bg-white">
                                2
                            </button>
                            <button className="px-3 py-1 border border-slate-200 rounded text-sm hover:bg-slate-50 bg-white">
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
