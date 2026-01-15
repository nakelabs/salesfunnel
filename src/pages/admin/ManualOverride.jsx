import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';

const ManualOverride = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [reason, setReason] = useState('');

    const statuses = ['pending', 'paid', 'approved', 'completed', 'cancelled'];

    const auditLogs = selectedOrder ? [
        { admin: 'John Doe', action: 'Changed status from Pending to Paid', timestamp: '2 hours ago', reason: 'Payment proof verified manually' },
        { admin: 'Jane Smith', action: 'Order created', timestamp: '4 hours ago', reason: 'New order placed' }
    ] : [];

    const handleSearch = () => {
        // Mock search - in real app would fetch from API
        if (searchQuery) {
            setSelectedOrder({
                id: searchQuery,
                wholesaler: 'Aliko Trading',
                distributor: 'Premium Co.',
                amount: 245000,
                currentStatus: 'paid',
                items: 5,
                createdAt: '4 hours ago'
            });
        }
    };

    const handleOverride = () => {
        if (!newStatus || !reason) {
            alert('Please select a new status and provide a reason');
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to change order ${selectedOrder.id} status from "${selectedOrder.currentStatus}" to "${newStatus}"?\n\nReason: ${reason}`
        );

        if (confirmed) {
            console.log('Status override:', { orderId: selectedOrder.id, newStatus, reason });
            alert('Status updated successfully!');
            setNewStatus('');
            setReason('');
        }
    };

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">Manual Override</h1>
                    <p className="text-slate-600 mt-1">Manually update order status with audit trail</p>
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Search Order by ID</label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Enter order ID (e.g., #SF-1209)"
                            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {selectedOrder ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Order Details */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">receipt_long</span>
                                Order Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Order ID</p>
                                    <p className="font-mono font-bold text-lg text-slate-900">{selectedOrder.id}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Wholesaler</p>
                                        <p className="font-semibold text-slate-900">{selectedOrder.wholesaler}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Distributor</p>
                                        <p className="font-semibold text-slate-900">{selectedOrder.distributor}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Amount</p>
                                    <p className="text-2xl font-black text-primary">₦{selectedOrder.amount.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Current Status</p>
                                    <StatusBadge status={selectedOrder.currentStatus} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Items</p>
                                        <p className="font-semibold text-slate-900">{selectedOrder.items}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Created</p>
                                        <p className="font-semibold text-slate-900">{selectedOrder.createdAt}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Override */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-600">build</span>
                                Override Status
                            </h3>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">New Status</label>
                                    <select
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-medium"
                                    >
                                        <option value="">Select new status...</option>
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Reason for Change (Required)</label>
                                    <textarea
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        rows="4"
                                        placeholder="Provide a detailed reason for this manual override..."
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                onClick={handleOverride}
                                disabled={!newStatus || !reason}
                                className="w-full px-6 py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Update Status
                            </button>
                            <p className="text-xs text-slate-500 mt-3 text-center">
                                ⚠️ This action will be logged with your admin credentials
                            </p>
                        </div>

                        {/* Audit Log */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-600">history</span>
                                Audit Log
                            </h3>
                            <div className="space-y-3">
                                {auditLogs.map((log, index) => (
                                    <div key={index} className="border-l-4 border-primary pl-4 py-2">
                                        <div className="flex items-start justify-between mb-1">
                                            <p className="font-semibold text-slate-900">{log.action}</p>
                                            <p className="text-xs text-slate-500">{log.timestamp}</p>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-1">{log.reason}</p>
                                        <p className="text-xs text-slate-500">By: {log.admin}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                        <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">search</span>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Search for an Order</h3>
                        <p className="text-sm text-slate-500">Enter an order ID above to view details and override status</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ManualOverride;
