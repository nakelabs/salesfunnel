import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const ApprovalQueue = () => {
    const [tab, setTab] = useState('all'); // all, wholesalers, distributors

    const pendingApprovals = [];

    const filtered = tab === 'all' ? pendingApprovals : pendingApprovals.filter(a => a.type === tab.slice(0, -1));

    const handleApprove = (id) => {
        console.log('Approve:', id);
        alert('User approved successfully!');
    };

    const handleReject = (id) => {
        const reason = prompt('Reason for rejection:');
        if (reason) {
            console.log('Reject:', id, reason);
            alert('User rejected.');
        }
    };

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">Approval Queue</h1>
                    <p className="text-slate-600 mt-1">Review and approve new user registrations</p>
                </div>

                {/* Tabs */}
                <div className="mb-6 flex gap-2">
                    {['all', 'wholesalers', 'distributors'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${tab === t ? 'bg-primary text-white' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                            <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                                {t === 'all' ? pendingApprovals.length : pendingApprovals.filter(a => a.type === t.slice(0, -1)).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Approvals List */}
                <div className="space-y-4">
                    {filtered.map((approval) => (
                        <div key={approval.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-slate-900 text-lg">{approval.name}</h3>
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${approval.type === 'wholesaler' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                            }`}>
                                            {approval.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600">Submitted {approval.submittedDate}</p>
                                </div>
                                <span className="material-symbols-outlined text-amber-500 text-2xl">pending</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Contact Info</h4>
                                    <p className="text-sm text-slate-900 font-medium">{approval.owner}</p>
                                    <p className="text-sm text-slate-600">{approval.email}</p>
                                    <p className="text-sm text-slate-600">{approval.phone}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Business Details</h4>
                                    <p className="text-sm text-slate-600">Tax ID: <span className="font-mono">{approval.taxId}</span></p>
                                    <p className="text-sm text-slate-600">RC: <span className="font-mono">{approval.rcNumber}</span></p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Bank Information</h4>
                                    <p className="text-sm text-slate-600">{approval.bankName}</p>
                                    <p className="text-sm text-slate-600 font-mono">{approval.accountNumber}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                                <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                                    <span className="material-symbols-outlined text-[18px]">folder_open</span>
                                    View {approval.documents} Documents
                                </button>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleReject(approval.id)}
                                        className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg font-bold hover:bg-red-50 transition-colors"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                                    >
                                        Request Info
                                    </button>
                                    <button
                                        onClick={() => handleApprove(approval.id)}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                                    >
                                        Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                        <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">check_circle</span>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">All Clear!</h3>
                        <p className="text-sm text-slate-500">No pending approvals in this category.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ApprovalQueue;
