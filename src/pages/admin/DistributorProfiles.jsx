import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const DistributorProfiles = () => {
    const [viewMode, setViewMode] = useState('grid'); // grid or table

    const distributors = [
        {
            id: 1,
            name: 'Premium Trading Co.',
            location: 'Lagos, Nigeria',
            status: 'active',
            avgFulfillmentTime: '1.2 hrs',
            slaCompliance: 98,
            totalOrdersFulfilled: 156,
            rating: 4.9
        },
        {
            id: 2,
            name: 'Global Distributors Ltd',
            location: 'Abuja, Nigeria',
            status: 'active',
            avgFulfillmentTime: '1.5 hrs',
            slaCompliance: 94,
            totalOrdersFulfilled: 128,
            rating: 4.7
        },
        {
            id: 3,
            name: 'Metro Distribution',
            location: 'Port Harcourt, Nigeria',
            status: 'active',
            avgFulfillmentTime: '0.9 hrs',
            slaCompliance: 99,
            totalOrdersFulfilled: 203,
            rating: 5.0
        },
        {
            id: 4,
            name: 'Express Logistics',
            location: 'Kano, Nigeria',
            status: 'inactive',
            avgFulfillmentTime: '1.8 hrs',
            slaCompliance: 78,
            totalOrdersFulfilled: 45,
            rating: 3.8
        }
    ];

    const getPerformanceColor = (compliance) => {
        if (compliance >= 95) return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' };
        if (compliance >= 80) return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' };
        return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' };
    };

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Distributor Profiles</h1>
                        <p className="text-slate-600 mt-1">Monitor distributor performance and fulfillment metrics</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white border border-slate-300 text-slate-600'
                                }`}
                        >
                            <span className="material-symbols-outlined">grid_view</span>
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-primary text-white' : 'bg-white border border-slate-300 text-slate-600'
                                }`}
                        >
                            <span className="material-symbols-outlined">table_rows</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-600 mb-1">Total Distributors</p>
                        <p className="text-3xl font-black text-slate-900">{distributors.length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-600 mb-1">Active</p>
                        <p className="text-3xl font-black text-green-600">
                            {distributors.filter(d => d.status === 'active').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-600 mb-1">Avg. Fulfillment</p>
                        <p className="text-3xl font-black text-primary">1.3 hrs</p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-600 mb-1">Avg. SLA Compliance</p>
                        <p className="text-3xl font-black text-green-600">92%</p>
                    </div>
                </div>

                {/* Grid View */}
                {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {distributors.map((distributor) => {
                            const perfColor = getPerformanceColor(distributor.slaCompliance);
                            return (
                                <div
                                    key={distributor.id}
                                    className={`bg-white rounded-xl border-2 ${perfColor.border} p-6 shadow-sm hover:shadow-md transition-shadow`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-1">{distributor.name}</h3>
                                            <p className="text-sm text-slate-500 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                {distributor.location}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${distributor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {distributor.status}
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">Avg. Fulfillment:</span>
                                            <span className="font-bold text-slate-900">{distributor.avgFulfillmentTime}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">SLA Compliance:</span>
                                            <span className={`font-bold ${perfColor.text}`}>
                                                {distributor.slaCompliance}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">Orders Fulfilled:</span>
                                            <span className="font-bold text-slate-900">{distributor.totalOrdersFulfilled}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">Rating:</span>
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-amber-500 text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                                                    star
                                                </span>
                                                <span className="font-bold text-slate-900">{distributor.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                        View Details
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Table View */}
                {viewMode === 'table' && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
                                <tr>
                                    <th className="px-6 py-4 text-left">Distributor</th>
                                    <th className="px-6 py-4 text-left">Location</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-right">Avg. Fulfillment</th>
                                    <th className="px-6 py-4 text-right">SLA %</th>
                                    <th className="px-6 py-4 text-right">Orders</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {distributors.map((distributor) => {
                                    const perfColor = getPerformanceColor(distributor.slaCompliance);
                                    return (
                                        <tr key={distributor.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 font-semibold text-slate-900">
                                                {distributor.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {distributor.location}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${distributor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    {distributor.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-semibold text-slate-900">
                                                {distributor.avgFulfillmentTime}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className={`font-bold ${perfColor.text}`}>
                                                    {distributor.slaCompliance}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-semibold text-slate-900">
                                                {distributor.totalOrdersFulfilled}
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
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default DistributorProfiles;
