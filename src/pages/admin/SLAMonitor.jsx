import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const SLAMonitor = () => {
    const criticalOrders = [
        { id: '#SF-1207', wholesaler: 'Quick Buy', distributor: 'Premium Co.', amount: 85000, timeLeft: '00:14:32', status: 'paid', severity: 'critical' },
        { id: '#SF-1205', wholesaler: 'Ade Ventures', distributor: 'Premium Co.', amount: 175000, timeLeft: '00:25:18', status: 'paid', severity: 'warning' },
        { id: '#SF-1208', wholesaler: 'Lagos Retail', distributor: 'Global Dist.', amount: 120500, timeLeft: '00:45:22', status: 'approved', severity: 'normal' },
        { id: '#SF-1209', wholesaler: 'Aliko Trading', distributor: 'Premium Co.', amount: 245000, timeLeft: '01:35:45', status: 'paid', severity: 'normal' },
    ];

    const getSeverityStyles = (severity) => {
        if (severity === 'critical') return 'bg-red-50 border-red-300 border-2';
        if (severity === 'warning') return 'bg-amber-50 border-amber-300 border-2';
        return 'bg-white border-slate-200';
    };

    const getTimeColor = (severity) => {
        if (severity === 'critical') return 'text-red-600';
        if (severity === 'warning') return 'text-amber-600';
        return 'text-green-600';
    };

    const handlePrompt = (orderId) => {
        alert(`Notification sent to distributor for order ${orderId}`);
    };

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">SLA Monitor</h1>
                    <p className="text-slate-600 mt-1">Track 2-hour SLA compliance and send distributor prompts</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-green-600">check_circle</span>
                            <p className="text-sm font-medium text-slate-600">Today's Compliance</p>
                        </div>
                        <p className="text-3xl font-black text-green-600">96%</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-red-600">error</span>
                            <p className="text-sm font-medium text-red-700">Critical (&lt; 15 min)</p>
                        </div>
                        <p className="text-3xl font-black text-red-600">{criticalOrders.filter(o => o.severity === 'critical').length}</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-amber-600">warning</span>
                            <p className="text-sm font-medium text-amber-700">Warning (&lt; 30 min)</p>
                        </div>
                        <p className="text-3xl font-black text-amber-600">{criticalOrders.filter(o => o.severity === 'warning').length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <p className="text-sm font-medium text-slate-600 mb-2">SLA Breaches (Today)</p>
                        <p className="text-3xl font-black text-red-600">2</p>
                        <p className="text-xs text-slate-500 mt-1">-50% vs yesterday</p>
                    </div>
                </div>

                {/* Critical Orders */}
                <div className="space-y-4">
                    {criticalOrders.map((order) => (
                        <div key={order.id} className={`rounded-xl border ${getSeverityStyles(order.severity)} p-6 shadow-sm`}>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-3">
                                        <p className="font-mono font-bold text-xl text-slate-900">{order.id}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-slate-400">schedule</span>
                                            <span className={`font-mono font-black text-2xl ${getTimeColor(order.severity)}`}>
                                                {order.timeLeft}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Wholesaler</p>
                                            <p className="font-semibold text-slate-900">{order.wholesaler}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Distributor</p>
                                            <p className="font-semibold text-slate-900">{order.distributor}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Amount</p>
                                            <p className="font-bold text-slate-900">₦{order.amount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 ml-6">
                                    <button
                                        onClick={() => handlePrompt(order.id)}
                                        className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 flex items-center gap-2 whitespace-nowrap"
                                    >
                                        <span className="material-symbols-outlined">notifications_active</span>
                                        Prompt Distributor
                                    </button>
                                    <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Historical Performance */}
                <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 mb-4">SLA Performance (Last 7 Days)</h3>
                    <div className="h-48 flex items-end justify-between gap-2">
                        {[98, 96, 97, 99, 94, 95, 96].map((value, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                                <div
                                    className={`w-full rounded-t ${value >= 95 ? 'bg-green-500' : 'bg-amber-500'}`}
                                    style={{ height: `${value}%` }}
                                ></div>
                                <p className="text-xs font-bold text-slate-600 mt-2">{value}%</p>
                                <p className="text-xs text-slate-400">Day {index + 1}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SLAMonitor;
