import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('account');

    const tabs = [
        { id: 'account', name: 'Account', icon: 'person' },
        { id: 'business', name: 'Business', icon: 'business' },
        { id: 'notifications', name: 'Notifications', icon: 'notifications' },
        { id: 'security', name: 'Security', icon: 'lock' },
        { id: 'preferences', name: 'Preferences', icon: 'tune' }
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
                            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
                                settings
                            </span>
                            <span className="text-sm font-semibold">Settings</span>
                        </Link>
                    </div>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-slate-200">
                    <Link to="/distributor-profile" className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className="size-10 rounded-full bg-slate-200"></div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate">Adeola Johnson</p>
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
                        <h2 className="text-slate-900 text-3xl font-black tracking-tight">Settings</h2>
                        <p className="text-slate-500 mt-1">Manage your account and business preferences.</p>
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

                    {/* Account Tab */}
                    {activeTab === 'account' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Profile Information</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="Adeola Johnson"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                defaultValue="adeola@distributor.com"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                defaultValue="+234 801 234 5678"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Role
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="Main Distributor"
                                                disabled
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Business Tab */}
                    {activeTab === 'business' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Business Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Business Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Premium Trading Co."
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Tax ID (TIN)
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="TIN-123456789"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                RC Number
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="RC-987654321"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Business Address
                                        </label>
                                        <textarea
                                            rows="3"
                                            defaultValue="123 Market Street, Victoria Island, Lagos, Nigeria"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                            Update Business Info
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Bank Account</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Bank Name
                                            </label>
                                            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                                                <option>Zenith Bank</option>
                                                <option>GTBank</option>
                                                <option>Access Bank</option>
                                                <option>First Bank</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                                Account Number
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="1234567890"
                                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Account Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Premium Trading Co."
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                            Save Bank Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Email Notifications</h3>
                                <div className="space-y-4">
                                    {[
                                        { id: 'order_alerts', label: 'Order Alerts', description: 'Get notified when new orders are placed' },
                                        { id: 'payment_updates', label: 'Payment Updates', description: 'Receive updates on payment verifications' },
                                        { id: 'inventory_alerts', label: 'Inventory Alerts', description: 'Low stock and restock notifications' },
                                        { id: 'weekly_reports', label: 'Weekly Reports', description: 'Summary of sales and revenue' }
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-start justify-between p-4 border border-slate-200 rounded-lg">
                                            <div>
                                                <p className="font-medium text-slate-900">{item.label}</p>
                                                <p className="text-sm text-slate-500">{item.description}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Change Password</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter current password"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Confirm new password"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Two-Factor Authentication</h3>
                                <p className="text-sm text-slate-600 mb-4">
                                    Add an extra layer of security to your account
                                </p>
                                <button className="px-6 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                    Enable 2FA
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Preferences Tab */}
                    {activeTab === 'preferences' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">General Preferences</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Language
                                        </label>
                                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                                            <option>English</option>
                                            <option>Yoruba</option>
                                            <option>Hausa</option>
                                            <option>Igbo</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Currency
                                        </label>
                                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                                            <option>Nigerian Naira (₦)</option>
                                            <option>US Dollar ($)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Timezone
                                        </label>
                                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                                            <option>West Africa Time (WAT)</option>
                                            <option>Central European Time (CET)</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                                            Save Preferences
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-red-200 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined">warning</span>
                                    Danger Zone
                                </h3>
                                <p className="text-sm text-slate-600 mb-4">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
