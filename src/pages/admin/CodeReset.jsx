import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const CodeReset = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [codeRevealed, setCodeRevealed] = useState(false);

    const handleSearch = () => {
        if (searchQuery) {
            setSelectedOrder({
                id: searchQuery,
                wholesaler: 'Aliko Trading',
                phone: '+234 801 234 5678',
                pickupCode: '4782',
                createdAt: '4 hours ago',
                codeHistory: [
                    { code: '4782', generatedBy: 'System', timestamp: '4 hours ago', status: 'active' },
                    { code: '1234', generatedBy: 'Admin John', timestamp: '1 day ago', status: 'replaced' }
                ]
            });
            setCodeRevealed(false);
        }
    };

    const handleGenerateNew = () => {
        const confirmed = window.confirm('Generate a new 4-digit pickup code? The previous code will be invalidated.');
        if (confirmed) {
            const newCode = Math.floor(1000 + Math.random() * 9000).toString();
            alert(`New pickup code generated: ${newCode}\n\nSMS sent to ${selectedOrder.phone}`);
            console.log('New code:', newCode);
        }
    };

    const handleResendSMS = () => {
        alert(`SMS with pickup code resent to ${selectedOrder.phone}`);
    };

    const handleReveal = () => {
        const password = prompt('Enter your admin password to reveal code:');
        if (password) {
            setCodeRevealed(true);
        }
    };

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">Code Reset Tool</h1>
                    <p className="text-slate-600 mt-1">Generate or reveal 4-digit pickup codes for orders</p>
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Search by Order ID or Phone Number</label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Enter order ID or customer phone..."
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
                                Order Information
                            </h3>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Order ID</p>
                                    <p className="font-mono font-bold text-lg text-slate-900">{selectedOrder.id}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Wholesaler</p>
                                    <p className="font-semibold text-slate-900">{selectedOrder.wholesaler}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</p>
                                    <p className="font-semibold text-slate-900">{selectedOrder.phone}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Order Created</p>
                                    <p className="font-semibold text-slate-900">{selectedOrder.createdAt}</p>
                                </div>
                            </div>

                            {/* Current Code */}
                            <div className="border-2 border-primary/20 bg-primary/5 rounded-xl p-6 text-center">
                                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Current Pickup Code</p>
                                {codeRevealed ? (
                                    <p className="text-5xl font-black text-primary tracking-widest mb-4">
                                        {selectedOrder.pickupCode}
                                    </p>
                                ) : (
                                    <p className="text-5xl font-black text-slate-300 tracking-widest mb-4">
                                        ••••
                                    </p>
                                )}
                                <button
                                    onClick={handleReveal}
                                    className="px-4 py-2 text-sm font-semibold text-primary hover:underline flex items-center gap-2 mx-auto"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {codeRevealed ? 'visibility_off' : 'visibility'}
                                    </span>
                                    {codeRevealed ? 'Hide Code' : 'Reveal Code'}
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-600">autorenew</span>
                                    Generate New Code
                                </h3>
                                <p className="text-sm text-slate-600 mb-4">
                                    This will invalidate the current code and send a new 4-digit code via SMS to the customer.
                                </p>
                                <button
                                    onClick={handleGenerateNew}
                                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                                >
                                    Generate New Code
                                </button>
                            </div>

                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">sms</span>
                                    Resend SMS
                                </h3>
                                <p className="text-sm text-slate-600 mb-4">
                                    Send the current pickup code to the customer's phone via SMS.
                                </p>
                                <button
                                    onClick={handleResendSMS}
                                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                                >
                                    Resend Code via SMS
                                </button>
                            </div>
                        </div>

                        {/* Code History */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-600">history</span>
                                Code History
                            </h3>
                            <div className="space-y-3">
                                {selectedOrder.codeHistory.map((entry, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                                        <div>
                                            <p className="font-mono font-bold text-lg text-slate-900">
                                                {entry.status === 'active' ? entry.code : '••••'}
                                            </p>
                                            <p className="text-xs text-slate-500">Generated by {entry.generatedBy} • {entry.timestamp}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded text-xs font-bold ${entry.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {entry.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                        <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">lock_reset</span>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Search for an Order</h3>
                        <p className="text-sm text-slate-500">Enter an order ID or phone number to manage pickup codes</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default CodeReset;
