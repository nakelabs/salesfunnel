import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';

const AdminDashboard = () => {
    const metrics = [
        { label: 'Total Active Users', value: '1,247', change: '+12%', icon: 'group', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pending Orders', value: '18', change: '< 2hrs', icon: 'shopping_cart', color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Awaiting Verification', value: '5', change: '3 flagged', icon: 'payments', color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'SLA Breaches (Today)', value: '2', change: '-50%', icon: 'warning', color: 'text-red-600', bg: 'bg-red-50' }
    ];

    const recentOrders = [
        { id: '#SF-1209', wholesaler: 'Aliko Trading', distributor: 'Premium Co.', amount: 245000, status: 'paid', time: '5 mins ago' },
        { id: '#SF-1208', wholesaler: 'Lagos Retail', distributor: 'Global Dist.', amount: 120500, status: 'approved', time: '12 mins ago' },
        { id: '#SF-1207', wholesaler: 'Quick Buy', distributor: 'Premium Co.', amount: 85000, status: 'pending', time: '25 mins ago' },
        { id: '#SF-1206', wholesaler: 'Golden Star', distributor: 'Metro Dist.', amount: 500000, status: 'completed', time: '1 hr ago' },
        { id: '#SF-1205', wholesaler: 'Ade Ventures', distributor: 'Premium Co.', amount: 175000, status: 'paid', time: '1.5 hrs ago' }
    ];

    const pendingApprovals = [
        { name: 'New York Traders', type: 'Wholesaler', submitted: '2 hrs ago' },
        { name: 'Premium Distributors Ltd', type: 'Distributor', submitted: '5 hrs ago' },
        { name: 'Lagos Central Market', type: 'Wholesaler', submitted: '1 day ago' }
    ];

    const criticalAlerts = [
        { type: 'SLA', message: 'Order #SF-1203 has 15 minutes remaining', severity: 'high' },
        { type: 'Payment', message: '3 payments flagged for review', severity: 'medium' }
    ];

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
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${metric.bg}`}>
                                    <span className={`material-symbols-outlined ${metric.color}`}>{metric.icon}</span>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-slate-600 mb-1">{metric.label}</p>
                            <p className="text-3xl font-black text-slate-900 mb-2">{metric.value}</p>
                            <p className="text-xs text-slate-500">{metric.change}</p>
                        </div>
                    ))}
                </div>

                {/* Critical Alerts */}
                {criticalAlerts.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-red-600">notification_important</span>
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
