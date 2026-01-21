import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const DistributorProfiles = () => {
    const [viewMode, setViewMode] = useState('grid'); // grid or table
    const [selectedDistributor, setSelectedDistributor] = useState(null);

    const distributors = [];

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
                                    onClick={() => setSelectedDistributor(distributor)}
                                    className={`bg-white rounded-xl border-2 ${perfColor.border} p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
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

                                    <div className="space-y-3">
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
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {distributors.map((distributor) => {
                                    const perfColor = getPerformanceColor(distributor.slaCompliance);
                                    return (
                                        <tr
                                            key={distributor.id}
                                            onClick={() => setSelectedDistributor(distributor)}
                                            className="hover:bg-slate-50 cursor-pointer"
                                        >
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
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Distributor Details Modal */}
            {selectedDistributor && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{selectedDistributor.name}</h2>
                                <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                                    {selectedDistributor.location}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedDistributor(null)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-600">close</span>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Status Badge */}
                            <div>
                                <span className={`px-3 py-1.5 rounded-lg text-sm font-bold ${selectedDistributor.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-slate-100 text-slate-600'
                                    }`}>
                                    {selectedDistributor.status.toUpperCase()}
                                </span>
                            </div>

                            {/* Performance Metrics */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Performance Metrics</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <p className="text-sm font-medium text-slate-600 mb-1">Avg. Fulfillment Time</p>
                                        <p className="text-2xl font-black text-slate-900">{selectedDistributor.avgFulfillmentTime}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <p className="text-sm font-medium text-slate-600 mb-1">SLA Compliance</p>
                                        <p className={`text-2xl font-black ${selectedDistributor.slaCompliance >= 95 ? 'text-green-600' :
                                            selectedDistributor.slaCompliance >= 80 ? 'text-amber-600' :
                                                'text-red-600'
                                            }`}>
                                            {selectedDistributor.slaCompliance}%
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <p className="text-sm font-medium text-slate-600 mb-1">Orders Fulfilled</p>
                                        <p className="text-2xl font-black text-slate-900">{selectedDistributor.totalOrdersFulfilled}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <p className="text-sm font-medium text-slate-600 mb-1">Rating</p>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-amber-500 text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                                                star
                                            </span>
                                            <p className="text-2xl font-black text-slate-900">{selectedDistributor.rating}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t border-slate-200">
                                <button className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                    Edit Details
                                </button>
                                <button className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors ${selectedDistributor.status === 'active'
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}>
                                    {selectedDistributor.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default DistributorProfiles;
