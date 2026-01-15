import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DistributorNavbar from '../components/DistributorNavbar';
import { User, Lock, Users, UserPlus, Bell, CreditCard, Download, Trash2, Edit2, Check, X } from 'lucide-react';

const DistributorProfilePage = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isEditing, setIsEditing] = useState({
        profile: false,
        personal: false,
        address: false
    });

    const [profileData, setProfileData] = useState({
        // Profile
        firstName: 'James',
        lastName: 'Wilson',
        role: 'Distributor',
        location: 'Lagos, Nigeria',
        email: 'james.wilson@globaldist.com',
        phone: '+234 803 456 7890',
        bio: 'Experienced food and beverage distributor',

        // Address
        street: 'Plot 12, Industrial Estate',
        city: 'Ikeja',
        state: 'Lagos State',
        country: 'Nigeria',
        zipCode: '101233'
    });

    const sidebarItems = [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'teams', label: 'Teams', icon: Users },
        { id: 'team-member', label: 'Team Member', icon: UserPlus },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'data-export', label: 'Data Export', icon: Download },
    ];

    const handleEdit = (section) => {
        setIsEditing({ ...isEditing, [section]: true });
    };

    const handleSave = (section) => {
        setIsEditing({ ...isEditing, [section]: false });
        // Save to backend here
    };

    const handleCancel = (section) => {
        setIsEditing({ ...isEditing, [section]: false });
    };

    return (
        <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Navbar */}
            <DistributorNavbar />

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <div className="sticky top-16 z-30 bg-slate-50 pb-6 mb-2">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your profile and preferences</p>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar */}
                    <aside className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3 sticky top-32">
                            <nav className="space-y-1">
                                {sidebarItems.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveSection(item.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeSection === item.id
                                                    ? 'bg-primary text-white shadow-sm'
                                                    : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            <IconComponent size={18} />
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* My Profile Section */}
                        {activeSection === 'profile' && (
                            <div className="space-y-6">
                                {/* Profile Header Card */}
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white shadow-lg">
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm ring-4 ring-white/30">
                                            {profileData.firstName[0]}{profileData.lastName[0]}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
                                            <p className="text-blue-100 mt-1">{profileData.role}</p>
                                            <p className="text-blue-100 text-sm mt-1 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-lg">location_on</span>
                                                {profileData.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
                                        {!isEditing.personal ? (
                                            <button
                                                onClick={() => handleEdit('personal')}
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 size={16} />
                                                Edit
                                            </button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleSave('personal')}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-600 rounded-lg transition-colors"
                                                >
                                                    <Check size={16} />
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => handleCancel('personal')}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                >
                                                    <X size={16} />
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                value={profileData.firstName}
                                                disabled={!isEditing.personal}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                value={profileData.lastName}
                                                disabled={!isEditing.personal}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                disabled={!isEditing.personal}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                disabled={!isEditing.personal}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                                            <textarea
                                                value={profileData.bio}
                                                disabled={!isEditing.personal}
                                                rows={3}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Address Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-slate-900">Address Information</h3>
                                        {!isEditing.address ? (
                                            <button
                                                onClick={() => handleEdit('address')}
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 size={16} />
                                                Edit
                                            </button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleSave('address')}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-600 rounded-lg transition-colors"
                                                >
                                                    <Check size={16} />
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => handleCancel('address')}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                >
                                                    <X size={16} />
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Street Address</label>
                                            <input
                                                type="text"
                                                value={profileData.street}
                                                disabled={!isEditing.address}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                                            <input
                                                type="text"
                                                value={profileData.city}
                                                disabled={!isEditing.address}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                                            <input
                                                type="text"
                                                value={profileData.state}
                                                disabled={!isEditing.address}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                                            <input
                                                type="text"
                                                value={profileData.country}
                                                disabled={!isEditing.address}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Zip Code</label>
                                            <input
                                                type="text"
                                                value={profileData.zipCode}
                                                disabled={!isEditing.address}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Placeholder for other sections */}
                        {activeSection !== 'profile' && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                                <div className="max-w-md mx-auto">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-slate-400 text-3xl">settings</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                        {sidebarItems.find(item => item.id === activeSection)?.label}
                                    </h3>
                                    <p className="text-slate-500">This section is under development</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DistributorProfilePage;
