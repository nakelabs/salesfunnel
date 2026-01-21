import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';

const LiveOrderTicker = () => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const orders = [];

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
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-orange-700 uppercase mb-1">Pending</p>
                        <p className="text-2xl font-black text-orange-600">{orders.filter(o => o.status === 'pending').length}</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-blue-700 uppercase mb-1">Paid</p>
                        <p className="text-2xl font-black text-blue-600">{orders.filter(o => o.status === 'paid').length}</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-purple-700 uppercase mb-1">Approved</p>
                        <p className="text-2xl font-black text-purple-600">{orders.filter(o => o.status === 'approved').length}</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-green-700 uppercase mb-1">Completed</p>
                        <p className="text-2xl font-black text-green-600">{orders.filter(o => o.status === 'completed').length}</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
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
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map((order) => (
                                <tr
                                    key={order.id}
                                    onClick={() => setSelectedOrder(order)}
                                    className="hover:bg-slate-50 cursor-pointer"
                                >
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Order Details</h2>
                                <p className="text-sm text-slate-600 font-mono mt-1">{selectedOrder.id}</p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-600">close</span>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Status Badge */}
                            <div>
                                <StatusBadge status={selectedOrder.status} />
                            </div>

                            {/* Order Information */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Order Information</h3>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-semibold text-slate-600 w-32">Wholesaler:</span>
                                        <span className="text-sm text-slate-900">{selectedOrder.wholesaler}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-semibold text-slate-600 w-32">Distributor:</span>
                                        <span className="text-sm text-slate-900">{selectedOrder.distributor}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-semibold text-slate-600 w-32">Total Amount:</span>
                                        <span className="text-sm font-bold text-slate-900">₦{selectedOrder.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-semibold text-slate-600 w-32">Time Remaining:</span>
                                        <span className={`text-sm font-bold ${selectedOrder.timeRemaining === '-' ? 'text-slate-400' :
                                            parseFloat(selectedOrder.timeRemaining) < 0.5 ? 'text-red-600' :
                                                parseFloat(selectedOrder.timeRemaining) < 1 ? 'text-amber-600' :
                                                    'text-green-600'
                                            }`}>
                                            {selectedOrder.timeRemaining}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Products Ordered */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Products Ordered ({selectedOrder.items} items)</h3>
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <ul className="space-y-2">
                                        {selectedOrder.products.map((product, index) => (
                                            <li key={index} className="flex items-center gap-2 text-sm text-slate-900">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                                                    {index + 1}
                                                </span>
                                                {product}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t border-slate-200">
                                <button className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                    Update Status
                                </button>
                                <button className="flex-1 px-4 py-2.5 border border-slate-300 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                                    View Full Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default LiveOrderTicker;
