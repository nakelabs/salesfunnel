import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WholesalerNavbar from '../components/WholesalerNavbar';

const OrdersPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const orders = [];

    const getProgressIndicator = (order) => {
        const steps = [
            { number: 1, label: 'Pending', color: 'amber' },
            { number: 2, label: 'Paid', color: 'blue' },
            { number: 3, label: 'Approved', color: 'purple' },
            { number: 4, label: 'Ready for Pickup', color: 'emerald' }
        ];

        const currentStep = steps.find(s => s.number === order.progress);

        return (
            <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.progress === 1 ? 'bg-amber-100 text-amber-700' :
                    order.progress === 2 ? 'bg-blue-100 text-blue-700' :
                        order.progress === 3 ? 'bg-purple-100 text-purple-700' :
                            'bg-emerald-100 text-emerald-700'
                    }`}>
                    {currentStep?.label}
                </span>
            </div>
        );
    };

    return (
        <div className="bg-background-light min-h-screen text-slate-900 font-display transition-colors duration-200" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Shared Navbar */}
            <WholesalerNavbar />

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900">Order Dashboard</h2>
                        <p className="text-slate-500 text-base">Welcome back, Apex Wholesalers. Here is an overview of your procurement status.</p>
                    </div>
                    <button className="flex items-center justify-center h-11 px-6 rounded-lg bg-primary hover:bg-blue-600 text-white shadow-sm transition-all font-semibold">
                        Create New Order
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-full group hover:border-primary/50 transition-colors">
                        <div className="mb-4">
                            <p className="text-slate-600 font-medium text-sm">Orders in Progress</p>
                        </div>
                        <div className="flex items-end gap-3">
                            <p className="text-3xl font-bold text-slate-900">0</p>
                            <span className="text-emerald-600 text-sm font-semibold mb-1">
                                +0
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-full group hover:border-amber-400 transition-colors">
                        <div className="mb-4">
                            <p className="text-slate-600 font-medium text-sm">Action Required (Unpaid)</p>
                        </div>
                        <div className="flex items-end gap-3">
                            <p className="text-3xl font-bold text-slate-900">0</p>
                            <span className="text-amber-600 text-sm font-semibold mb-1">
                                -
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-full group hover:border-emerald-400 transition-colors">
                        <div className="mb-4">
                            <p className="text-slate-600 font-medium text-sm">Completed this Month</p>
                        </div>
                        <div className="flex items-end gap-3">
                            <p className="text-3xl font-bold text-slate-900">₦0</p>
                            <span className="text-emerald-600 text-sm font-semibold mb-1">
                                +0%
                            </span>
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
                            onClick={() => setActiveFilter('all')}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors ${activeFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            All Orders
                        </button>
                        <button
                            onClick={() => setActiveFilter('pending')}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'pending' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Pending Payment
                        </button>
                        <button
                            onClick={() => setActiveFilter('processing')}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'processing' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Processing
                        </button>
                        <button
                            onClick={() => setActiveFilter('ready')}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'ready' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Distributor</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Amount</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[340px]">Progress Flow</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-bold text-slate-900">{order.id}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{order.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`size-6 rounded-full bg-${order.distributor.color}-100 flex items-center justify-center text-${order.distributor.color}-600 text-xs font-bold mr-2`}>
                                                    {order.distributor.initial}
                                                </div>
                                                <span className="text-sm text-slate-900 font-medium">{order.distributor.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                                            ₦{order.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getProgressIndicator(order)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {order.requiresAction ? (
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
                    <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                        <span className="text-sm text-slate-500">Showing 1-4 of 12 orders</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm border border-slate-300 rounded bg-white text-slate-500 disabled:opacity-50">
                                Prev
                            </button>
                            <button className="px-3 py-1 text-sm border border-slate-300 rounded bg-white text-slate-900 hover:bg-slate-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Required Section */}
                <section className="bg-white rounded-xl shadow-lg border border-primary/20 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-slate-900">Action Required: Order #ORD-7782</h3>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                        Pending Payment
                                    </span>
                                </div>
                                <p className="text-slate-500 text-sm mb-4">
                                    Please complete the payment transfer or upload your proof of payment to proceed with shipping.
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="text-slate-700">
                                        <span className="font-semibold">Due Date:</span> Nov 16, 2023
                                    </div>
                                    <div className="text-slate-700">
                                        <span className="font-semibold">Account:</span> **** 4580
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-end">
                                <div className="flex-1 max-w-md border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-slate-50 transition-colors">
                                    <p className="text-sm font-medium text-slate-900 mb-1">Upload Proof of Payment</p>
                                    <p className="text-xs text-slate-500">PDF, JPG or PNG (Max 5MB)</p>
                                </div>
                                <div className="flex flex-col gap-2 min-w-[140px]">
                                    <button className="w-full flex items-center justify-center h-10 px-4 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-sm transition-all">
                                        Pay Online
                                    </button>
                                    <button className="w-full flex items-center justify-center h-10 px-4 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition-all">
                                        View Invoice
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default OrdersPage;
