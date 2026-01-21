import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';

const PaymentReconciliation = () => {
    const payments = [];

    const [selected, setSelected] = useState(null);

    const handleVerify = (id) => {
        console.log('Verify payment:', id);
        alert('Payment verified successfully!');
    };

    const handleFlag = (id) => {
        const reason = prompt('Reason for flagging:');
        if (reason) {
            console.log('Flag payment:', id, reason);
            alert('Payment flagged for review.');
        }
    };

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">Payment Reconciliation</h1>
                    <p className="text-slate-600 mt-1">Verify bank transfer proofs and reconcile payments</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <p className="text-sm font-medium text-slate-600 mb-1">Pending Verification</p>
                        <p className="text-3xl font-black text-blue-600">{payments.length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <p className="text-sm font-medium text-slate-600 mb-1">With Proof</p>
                        <p className="text-3xl font-black text-green-600">{payments.filter(p => p.hasProof).length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <p className="text-sm font-medium text-slate-600 mb-1">Missing Proof</p>
                        <p className="text-3xl font-black text-red-600">{payments.filter(p => !p.hasProof).length}</p>
                    </div>
                </div>

                {/* Payments List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 bg-slate-50">
                            <h3 className="font-bold text-slate-900">Unverified Payments</h3>
                        </div>
                        <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                            {payments.map((payment) => (
                                <div
                                    key={payment.id}
                                    onClick={() => setSelected(payment)}
                                    className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${selected?.id === payment.id ? 'bg-primary/5 border-l-4 border-primary' : ''
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="font-mono font-bold text-slate-900">{payment.txnId}</p>
                                            <p className="text-xs text-slate-500">Order: {payment.orderId}</p>
                                        </div>
                                        {payment.hasProof ? (
                                            <span className="material-symbols-outlined text-green-600">attach_file</span>
                                        ) : (
                                            <span className="material-symbols-outlined text-red-600">warning</span>
                                        )}
                                    </div>
                                    <p className="text-sm font-semibold text-slate-900 mb-1">{payment.wholesaler}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-bold text-lg text-primary">₦{payment.amount.toLocaleString()}</p>
                                        <p className="text-xs text-slate-500">{payment.uploadTime}</p>
                                    </div>
                                    <p className="text-xs font-mono text-slate-600 mt-2">REF: {payment.reference}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Details & Proof Viewer */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                        {selected ? (
                            <div>
                                <div className="p-4 border-b border-slate-200 bg-slate-50">
                                    <h3 className="font-bold text-slate-900">Payment Details</h3>
                                </div>
                                <div className="p-6">
                                    <dv className="space-y-4 mb-6">
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Transaction ID</p>
                                            <p className="font-mono font-bold text-slate-900">{selected.txnId}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Order ID</p>
                                            <p className="font-mono font-semibold text-primary">{selected.orderId}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Wholesaler</p>
                                            <p className="font-semibold text-slate-900">{selected.wholesaler}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Amount</p>
                                            <p className="text-2xl font-black text-primary">₦{selected.amount.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Bank Reference</p>
                                            <p className="font-mono text-sm text-slate-900">{selected.reference}</p>
                                        </div>
                                    </dv>

                                    {/* Payment Proof Preview */}
                                    <div className="mb-6">
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Payment Proof</p>
                                        {selected.hasProof ? (
                                            <div className="border-2 border-slate-200 rounded-lg p-8 bg-slate-50 text-center">
                                                <span className="material-symbols-outlined text-slate-400 text-6xl mb-2">image</span>
                                                <p className="text-sm text-slate-600">Payment receipt uploaded</p>
                                                <button className="mt-2 text-sm font-semibold text-primary hover:underline">
                                                    View Full Image
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-red-200 rounded-lg p-8 bg-red-50 text-center">
                                                <span className="material-symbols-outlined text-red-400 text-6xl mb-2">block</span>
                                                <p className="text-sm text-red-600">No payment proof uploaded</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleFlag(selected.id)}
                                            className="flex-1 px-4 py-3 border-2 border-red-600 text-red-600 rounded-lg font-bold hover:bg-red-50"
                                        >
                                            Flag for Review
                                        </button>
                                        <button
                                            onClick={() => handleVerify(selected.id)}
                                            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:opacity-50"
                                            disabled={!selected.hasProof}
                                        >
                                            Verify Payment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">touch_app</span>
                                <p className="text-slate-500">Select a payment to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default PaymentReconciliation;
