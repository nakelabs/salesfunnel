import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DistributorProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', name: 'Profile', icon: 'person' },
        { id: 'business', name: 'Business', icon: 'business' },
        { id: 'activity', name: 'Activity', icon: 'history' }
    ];

    return (
        <div className="bg-background-light font-display flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0">
                {/* Logo */}
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg p-2 text-white">
                            <span className="material-symbols-outlined text-2xl">monitoring</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 text-lg font-bold leading-tight">SalesFunnel</h1>
                            <p className="text-slate-500 text-xs font-medium">Distributor Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-1">
                    <Link
                        to="/distributor-dashboard"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <a
                        href="#"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">shopping_bag</span>
                        <span className="text-sm font-medium">Orders</span>
                    </a>
                    <Link
                        to="/payments"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">payments</span>
                        <span className="text-sm font-medium">Payments</span>
                    </Link>
                    <Link
                        to="/inventory"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">inventory_2</span>
                        <span className="text-sm font-medium">Inventory</span>
                    </Link>
                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <Link
                            to="/settings"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            <span className="material-symbols-outlined">settings</span>
                            <span className="text-sm font-medium">Settings</span>
                        </Link>
                    </div>
                </nav>

                {/* User Profile - Active State */}
                <div className="p-4 border-t border-slate-200 bg-primary/5">
                    <Link to="/distributor-profile" className="flex items-center gap-3 p-2">
                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/30">
                            <span className="material-symbols-outlined text-primary">account_circle</span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate text-primary">Adeola Johnson</p>
                            <p className="text-xs text-slate-500 truncate">Main Distributor</p>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-background-light">
                <div className="max-w-5xl mx-auto px-6 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Link to="/distributor-dashboard" className="text-slate-500 hover:text-slate-700">
                                    <span className="material-symbols-outlined">arrow_back</span>
                                </Link>
                                <div>
                                    <h2 className="text-slate-900 text-3xl font-black tracking-tight">My Profile</h2>
                                    <p className="text-slate-500 mt-1">View and manage your profile information</p>
                                </div>
                            </div>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            alert('Profile updated successfully!');
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">check</span>
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Verified Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                            <span className="material-symbols-outlined text-emerald-600">verified</span>
                            <div>
                                <p className="text-sm font-semibold text-emerald-800">Verified Distributor</p>
                                <p className="text-xs text-emerald-700">Since January 2024</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6">
                        <div className="flex gap-2 border-b border-slate-200">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab.id
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            {/* Profile Picture */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="font-bold text-slate-900 text-lg mb-4">Profile Picture</h3>
                                <div className="flex items-center gap-6">
                                    <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-5xl">account_circle</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 mb-2">Upload a new profile picture</p>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 bg-primary text-white text-sm rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                                Upload Photo
                                            </button>
                                            <button className="px-4 py-2 border border-slate-300 text-slate-700 text-sm rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                                                Remove
                                            </button>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                    Personal Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue="Adeola Johnson"
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                defaultValue="adeola@distributor.com"
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                defaultValue="+234 801 234 5678"
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                                            <input
                                                type="text"
                                                defaultValue="Main Distributor"
                                                disabled
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Business Tab */}
                    {activeTab === 'business' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">business</span>
                                    Business Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
                                        <input
                                            type="text"
                                            defaultValue="Premium Trading Co."
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Tax ID (TIN)</label>
                                            <input
                                                type="text"
                                                defaultValue="TIN-123456789"
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">RC Number</label>
                                            <input
                                                type="text"
                                                defaultValue="RC-987654321"
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Business Address</label>
                                        <textarea
                                            rows="3"
                                            defaultValue="123 Market Street, Victoria Island, Lagos, Nigeria"
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">account_balance</span>
                                    Bank Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Bank Name</label>
                                            <input
                                                type="text"
                                                defaultValue="Zenith Bank"
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
                                            <input
                                                type="text"
                                                defaultValue="1234567890"
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Account Name</label>
                                        <input
                                            type="text"
                                            defaultValue="Premium Trading Co."
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Activity Tab */}
                    {activeTab === 'activity' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="font-bold text-slate-900 text-lg mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    {[
                                        { action: 'Verified payment', details: '#TRX-9821 - ₦245,000', time: '2 hours ago', icon: 'payments', color: 'text-green-600' },
                                        { action: 'Updated inventory', details: 'Added 15 new products', time: '5 hours ago', icon: 'inventory_2', color: 'text-blue-600' },
                                        { action: 'Profile updated', details: 'Changed business address', time: '1 day ago', icon: 'edit', color: 'text-amber-600' },
                                        { action: 'New order received', details: 'Order #SF-1209', time: '2 days ago', icon: 'shopping_bag', color: 'text-purple-600' }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg">
                                            <div className={`p-2 rounded-lg bg-slate-100`}>
                                                <span className={`material-symbols-outlined ${item.color}`}>{item.icon}</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-slate-900">{item.action}</p>
                                                <p className="text-sm text-slate-600">{item.details}</p>
                                                <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DistributorProfilePage;
