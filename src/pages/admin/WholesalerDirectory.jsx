import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';

const WholesalerDirectory = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedWholesaler, setSelectedWholesaler] = useState(null);

    const wholesalers = [];

    const filteredWholesalers = wholesalers.filter(w => {
        const matchesSearch = searchQuery === '' ||
            w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            w.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            w.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || w.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Header */}
                <div className="mb-14">
                    <h1 className="text-3xl font-black text-slate-900">Wholesaler Directory</h1>
                    <p className="text-slate-600 mt-2">Manage and monitor all wholesale users</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-600 mb-1">Total Wholesalers</p>
                        <p className="text-3xl font-black text-slate-900">{wholesalers.length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-600 mb-1">Active Users</p>
                        <p className="text-3xl font-black text-green-600">
                            {wholesalers.filter(w => w.status === 'active').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-600 mb-1">Suspended</p>
                        <p className="text-3xl font-black text-red-600">
                            {wholesalers.filter(w => w.status === 'suspended').length}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                search
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, business, or email..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-medium"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                        </select>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
                                <tr>
                                    <th className="px-6 py-4 text-left">User</th>
                                    <th className="px-6 py-4 text-left">Contact</th>
                                    <th className="px-6 py-4 text-left">Registered</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-right">Orders</th>
                                    <th className="px-6 py-4 text-right">Total Spent</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredWholesalers.map((wholesaler) => (
                                    <tr
                                        key={wholesaler.id}
                                        onClick={() => setSelectedWholesaler(wholesaler)}
                                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-slate-900">{wholesaler.name}</p>
                                            <p className="text-sm text-slate-500">{wholesaler.businessName}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-900">{wholesaler.email}</p>
                                            <p className="text-sm text-slate-500">{wholesaler.phone}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {wholesaler.registrationDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={wholesaler.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right font-semibold text-slate-900">
                                            {wholesaler.totalOrders}
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-slate-900">
                                            ₦{wholesaler.totalSpent.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                        <p className="text-sm text-slate-600">
                            Showing {filteredWholesalers.length} of {wholesalers.length} wholesalers
                        </p>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-slate-300 rounded text-sm font-semibold hover:bg-slate-50">
                                Previous
                            </button>
                            <button className="px-3 py-1 bg-primary text-white rounded text-sm font-semibold">
                                1
                            </button>
                            <button className="px-3 py-1 border border-slate-300 rounded text-sm font-semibold hover:bg-slate-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wholesaler Details Modal */}
            {selectedWholesaler && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{selectedWholesaler.name}</h2>
                                <p className="text-sm text-slate-600">{selectedWholesaler.businessName}</p>
                            </div>
                            <button
                                onClick={() => setSelectedWholesaler(null)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-600">close</span>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Status Badge */}
                            <div>
                                <StatusBadge status={selectedWholesaler.status} />
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Contact Information</h3>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-semibold text-slate-600 w-32">Email:</span>
                                        <span className="text-sm text-slate-900">{selectedWholesaler.email}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-semibold text-slate-600 w-32">Phone:</span>
                                        <span className="text-sm text-slate-900">{selectedWholesaler.phone}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Business Details */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Business Details</h3>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-semibold text-slate-600 w-32">Business Name:</span>
                                        <span className="text-sm text-slate-900">{selectedWholesaler.businessName}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-semibold text-slate-600 w-32">Registration:</span>
                                        <span className="text-sm text-slate-900">{selectedWholesaler.registrationDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Statistics */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Order Statistics</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <p className="text-sm font-medium text-slate-600 mb-1">Total Orders</p>
                                        <p className="text-2xl font-black text-slate-900">{selectedWholesaler.totalOrders}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <p className="text-sm font-medium text-slate-600 mb-1">Total Spent</p>
                                        <p className="text-2xl font-black text-slate-900">
                                            ₦{selectedWholesaler.totalSpent.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t border-slate-200">
                                <button className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                    Edit Details
                                </button>
                                <button className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors ${selectedWholesaler.status === 'active'
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}>
                                    {selectedWholesaler.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default WholesalerDirectory;
