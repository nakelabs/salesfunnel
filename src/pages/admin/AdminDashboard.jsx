import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';

const AdminDashboard = () => {
    const metrics = [];

    const recentOrders = [];

    const pendingApprovals = [];

    const criticalAlerts = [];

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-600 mt-1">Monitor your platform's key metrics and operations</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {metrics.map((metric, index) => (
                        <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <p className="text-sm font-medium text-slate-600 mb-1">{metric.label}</p>
                            <p className="text-3xl font-black text-slate-900 mb-2">{metric.value}</p>
                            <p className="text-xs text-slate-500">{metric.change}</p>
                        </div>
                    ))}
                </div>

                {/* Critical Alerts */}
                {criticalAlerts.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
                        <div className="mb-3">
                            <h3 className="font-bold text-red-900">Critical Alerts</h3>
                        </div>
                        <div className="space-y-2">
                            {criticalAlerts.map((alert, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${alert.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {alert.type}
                                        </span>
                                        <p className="text-sm text-slate-700">{alert.message}</p>
                                    </div>
                                    <button className="text-sm font-semibold text-primary hover:underline">
                                        Review
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900">Recent Orders</h3>
                                <p className="text-xs text-slate-500 mt-1">Last 10 transactions</p>
                            </div>
                            <Link to="/admin/orders" className="text-sm font-semibold text-primary hover:underline">
                                View All →
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Order ID</th>
                                        <th className="px-6 py-3 text-left">Wholesaler</th>
                                        <th className="px-6 py-3 text-right">Amount</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-left">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recentOrders.map((order, index) => (
                                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-mono font-semibold text-slate-900">
                                                {order.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-slate-900">{order.wholesaler}</p>
                                                <p className="text-xs text-slate-500">{order.distributor}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">
                                                ₦{order.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={order.status} />
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-500">{order.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pending Approvals */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900">Pending Approvals</h3>
                                <p className="text-xs text-slate-500 mt-1">{pendingApprovals.length} waiting</p>
                            </div>
                            <Link to="/admin/approvals" className="text-sm font-semibold text-primary hover:underline">
                                Review →
                            </Link>
                        </div>
                        <div className="p-6 space-y-4">
                            {pendingApprovals.map((approval, index) => (
                                <div key={index} className="p-4 border border-slate-200 rounded-lg hover:border-primary transition-colors">
                                    <div className="flex items-start justify-between mb-2">
                                        <p className="font-semibold text-sm text-slate-900">{approval.name}</p>
                                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded">
                                            {approval.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3">{approval.submitted}</p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700">
                                            Approve
                                        </button>
                                        <button className="flex-1 px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-bold rounded hover:bg-slate-50">
                                            Review
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
