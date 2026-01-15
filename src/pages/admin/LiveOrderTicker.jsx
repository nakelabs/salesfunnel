import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';

const LiveOrderTicker = () => {
    const [statusFilter, setStatusFilter] = useState('all');

    const orders = [
        { id: '#SF-1209', wholesaler: 'Aliko Trading', distributor: 'Premium Co.', amount: 245000, status: 'paid', timeRemaining: '1:35:22', items: 5 },
        { id: '#SF-1208', wholesaler: 'Lagos Retail', distributor: 'Global Dist.', amount: 120500, status: 'approved', timeRemaining: '0:45:10', items: 3 },
        { id: '#SF-1207', wholesaler: 'Quick Buy', distributor: 'Premium Co.', amount: 85000, status: 'pending', timeRemaining: '1:58:45', items: 2 },
        { id: '#SF-1206', wholesaler: 'Golden Star', distributor: 'Metro Dist.', amount: 500000, status: 'completed', timeRemaining: '-', items: 8 },
        { id: '#SF-1205', wholesaler: 'Ade Ventures', distributor: 'Premium Co.', amount: 175000, status: 'paid', timeRemaining: '0:25:30', items: 4 },
        { id: '#SF-1204', wholesaler: 'City Market', distributor: 'Express Log.', amount: 95000, status: 'approved', timeRemaining: '1:12:08', items: 2 },
    ];

    const filtered = statusFilter === 'all' ? orders : orders.filter(o => o.status === statusFilter);

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Live Order Ticker</h1>
                        <p className="text-slate-600 mt-1">Real-time order monitoring and management</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
                        <span className="material-symbols-outlined animate-pulse">refresh</span>
                        Auto-Refresh: ON
                    </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-orange-700 uppercase mb-1">Pending</p>
                        <p className="text-2xl font-black text-orange-600">{orders.filter(o => o.status === 'pending').length}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-blue-700 uppercase mb-1">Paid</p>
                        <p className="text-2xl font-black text-blue-600">{orders.filter(o => o.status === 'paid').length}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-purple-700 uppercase mb-1">Approved</p>
                        <p className="text-2xl font-black text-purple-600">{orders.filter(o => o.status === 'approved').length}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-green-700 uppercase mb-1">Completed</p>
                        <p className="text-2xl font-black text-green-600">{orders.filter(o => o.status === 'completed').length}</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-red-700 uppercase mb-1">Urgent</p>
                        <p className="text-2xl font-black text-red-600">{orders.filter(o => o.timeRemaining && o.timeRemaining !== '-' && parseFloat(o.timeRemaining) < 0.5).length}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex gap-2">
                    {['all', 'pending', 'paid', 'approved', 'completed'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm ${statusFilter === s ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
                            <tr>
                                <th className="px-6 py-4 text-left">Order ID</th>
                                <th className="px-6 py-4 text-left">Wholesaler</th>
                                <th className="px-6 py-4 text-left">Distributor</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                                <th className="px-6 py-4 text-center">Items</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-center">Time Left</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-mono font-bold text-slate-900">{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-slate-900">{order.wholesaler}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{order.distributor}</td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900">₦{order.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-center text-sm text-slate-600">{order.items}</td>
                                    <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                                    <td className="px-6 py-4 text-center">
                                        {order.timeRemaining !== '-' ? (
                                            <span className={`font-mono font-bold ${parseFloat(order.timeRemaining) < 0.5 ? 'text-red-600' :
                                                parseFloat(order.timeRemaining) < 1 ? 'text-amber-600' : 'text-green-600'
                                                }`}>
                                                {order.timeRemaining}
                                            </span>
                                        ) : (
                                            <span className="text-slate-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-1.5 text-primary hover:bg-primary/10 rounded">
                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                            </button>
                                            <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default LiveOrderTicker;
