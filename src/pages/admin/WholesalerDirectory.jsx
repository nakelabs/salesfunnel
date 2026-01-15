import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';

const WholesalerDirectory = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const wholesalers = [
        {
            id: 1,
            name: 'Chinedu Okafor',
            businessName: 'Aliko & Sons Trading',
            email: 'chinedu@alikotrading.com',
            phone: '+234 801 234 5678',
            registrationDate: 'Jan 15, 2024',
            status: 'active',
            totalOrders: 47,
            totalSpent: 2450000
        },
        {
            id: 2,
            name: 'Aisha Mohammed',
            businessName: 'Lagos Retail Hub',
            email: 'aisha@lagosretail.com',
            phone: '+234 802 345 6789',
            registrationDate: 'Feb 3, 2024',
            status: 'active',
            totalOrders: 32,
            totalSpent: 1850000
        },
        {
            id: 3,
            name: 'Emeka Nwosu',
            businessName: 'Quick-Buy Vendors',
            email: 'emeka@quickbuy.com',
            phone: '+234 803 456 7890',
            registrationDate: 'Mar 12, 2024',
            status: 'suspended',
            totalOrders: 15,
            totalSpent: 675000
        },
        {
            id: 4,
            name: 'Fatima Bello',
            businessName: 'Golden Star Stores',
            email: 'fatima@goldenstar.com',
            phone: '+234 804 567 8901',
            registrationDate: 'Apr 8, 2024',
            status: 'active',
            totalOrders: 28,
            totalSpent: 1920000
        }
    ];

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
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">Wholesaler Directory</h1>
                    <p className="text-slate-600 mt-1">Manage and monitor all wholesale users</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm">
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
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredWholesalers.map((wholesaler) => (
                                    <tr key={wholesaler.id} className="hover:bg-slate-50 transition-colors">
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
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                </button>
                                                <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        {wholesaler.status === 'active' ? 'block' : 'check_circle'}
                                                    </span>
                                                </button>
                                            </div>
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
        </AdminLayout>
    );
};

export default WholesalerDirectory;
