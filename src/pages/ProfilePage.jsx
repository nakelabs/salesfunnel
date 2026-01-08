import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('account');
    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        // Personal Information
        fullName: 'Chinedu Okafor',
        email: 'chinedu.okafor@wholesaleltd.com',
        phone: '+234 801 234 5678',

        // Business Information
        businessName: 'Okafor Wholesale Limited',
        businessType: 'Retail/Wholesale',
        rcNumber: 'RC-12345678',
        taxId: 'TIN-987654321',

        // Address
        address: 'Shop 4, Alaba International Market',
        city: 'Ojo',
        state: 'Lagos State',
        country: 'Nigeria',

        // Bank Details
        bankName: 'Zenith Bank',
        accountNumber: '1234567890',
        accountName: 'Okafor Wholesale Limited',

        // Verification
        verified: true,
        verificationDate: 'January 5, 2026'
    });

    const tabs = [
        { id: 'account', name: 'Account Info', icon: 'person' },
        { id: 'business', name: 'Business Details', icon: 'business' },
        { id: 'security', name: 'Security', icon: 'lock' },
        { id: 'preferences', name: 'Preferences', icon: 'settings' }
    ];

    const handleSave = () => {
        // In real app, save to backend
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    return (
        <div className="bg-background-light min-h-screen font-display">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <Link to="/dashboard" className="flex items-center gap-3">
                                <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-white">
                                    <span className="material-symbols-outlined">inventory_2</span>
                                </div>
                                <h1 className="text-xl font-bold tracking-tight text-slate-900">SalesFunnel</h1>
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-slate-500">Shop 4, Alaba Market</p>
                                <p className="text-xs text-slate-400">ID: SF-8821</p>
                            </div>
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">account_circle</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Link to="/dashboard" className="text-slate-500 hover:text-slate-700">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-3xl font-black text-slate-900">Profile Settings</h1>
                            <p className="text-slate-500 text-sm mt-1">Manage your account information and business details</p>
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
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">check</span>
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Verification Badge */}
                    {profileData.verified && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                            <span className="material-symbols-outlined text-green-600">verified_user</span>
                            <div>
                                <p className="text-sm font-semibold text-green-800">Verified Business</p>
                                <p className="text-xs text-green-700">Verified on {profileData.verificationDate}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="flex gap-2 border-b border-slate-200 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
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

                {/* Account Info Tab */}
                {activeTab === 'account' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Profile Picture */}
                        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
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
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">person</span>
                                Personal Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={profileData.fullName}
                                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                Address
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Street Address</label>
                                    <input
                                        type="text"
                                        value={profileData.address}
                                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            value={profileData.city}
                                            onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                                        <input
                                            type="text"
                                            value={profileData.state}
                                            onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                                    <input
                                        type="text"
                                        value={profileData.country}
                                        onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Business Details Tab */}
                {activeTab === 'business' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">business</span>
                                Business Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
                                    <input
                                        type="text"
                                        value={profileData.businessName}
                                        onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Business Type</label>
                                    <select
                                        value={profileData.businessType}
                                        onChange={(e) => setProfileData({ ...profileData, businessType: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                    >
                                        <option>Retail/Wholesale</option>
                                        <option>Wholesale Only</option>
                                        <option>Distributor</option>
                                        <option>Manufacturer</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">RC Number</label>
                                    <input
                                        type="text"
                                        value={profileData.rcNumber}
                                        onChange={(e) => setProfileData({ ...profileData, rcNumber: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tax ID (TIN)</label>
                                    <input
                                        type="text"
                                        value={profileData.taxId}
                                        onChange={(e) => setProfileData({ ...profileData, taxId: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">account_balance</span>
                                Bank Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Bank Name</label>
                                    <input
                                        type="text"
                                        value={profileData.bankName}
                                        onChange={(e) => setProfileData({ ...profileData, bankName: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
                                    <input
                                        type="text"
                                        value={profileData.accountNumber}
                                        onChange={(e) => setProfileData({ ...profileData, accountNumber: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Account Name</label>
                                    <input
                                        type="text"
                                        value={profileData.accountName}
                                        onChange={(e) => setProfileData({ ...profileData, accountName: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                <p className="text-sm font-semibold text-amber-800 mb-1">Bank Verification</p>
                                <p className="text-xs text-amber-700">This information is used for order payments and withdrawals.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="max-w-2xl">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">lock</span>
                                Change Password
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter current password"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:border-primary focus:ring-primary"
                                    />
                                </div>
                                <button className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                    Update Password
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">shield</span>
                                Two-Factor Authentication
                            </h3>
                            <p className="text-sm text-slate-600 mb-4">Add an extra layer of security to your account</p>
                            <button className="px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                Enable 2FA
                            </button>
                        </div>
                    </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                    <div className="max-w-2xl">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">notifications</span>
                                Notification Preferences
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { id: 'order_updates', label: 'Order Updates', description: 'Get notified about order status changes' },
                                    { id: 'price_drops', label: 'Price Drop Alerts', description: 'Receive alerts when prices drop on favorite products' },
                                    { id: 'stock_alerts', label: 'Stock Alerts', description: 'Get notified when out-of-stock items are available' },
                                    { id: 'promotions', label: 'Promotions & Offers', description: 'Receive information about special deals and promotions' }
                                ].map((pref) => (
                                    <div key={pref.id} className="flex items-start justify-between p-4 border border-slate-200 rounded-lg">
                                        <div>
                                            <p className="font-medium text-slate-900">{pref.label}</p>
                                            <p className="text-sm text-slate-500">{pref.description}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-red-600">delete</span>
                                Danger Zone
                            </h3>
                            <p className="text-sm text-slate-600 mb-4">Permanently delete your account and all associated data</p>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
                                Delete Account
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProfilePage;
