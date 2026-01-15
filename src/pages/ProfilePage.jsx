import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WholesalerNavbar from '../components/WholesalerNavbar';
import { User, Lock, Users, UserPlus, Bell, CreditCard, Download, Trash2, Edit2, Check, X, ChevronDown } from 'lucide-react';

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState({
        profile: false,
        personal: false,
        address: false
    });

    const [profileData, setProfileData] = useState({
        // Profile
        firstName: 'Chinedu',
        lastName: 'Okafor',
        role: 'Wholesaler',
        location: 'Lagos, Nigeria',
        email: 'chinedu.okafor@wholesaleltd.com',
        phone: '+234 801 234 5678',
        bio: 'Experienced wholesaler specializing in FMCG products',

        // Address
        street: 'Shop 4, Alaba International Market',
        city: 'Ojo',
        state: 'Lagos State',
        country: 'Nigeria',
        zipCode: '102102'
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
            <WholesalerNavbar />

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Title */}
                <div className="sticky top-16 z-30 bg-slate-50 pb-6 mb-2">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your profile and preferences</p>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Navigation Dropdown */}
                    <div className="relative z-20">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full md:w-64 flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                {(() => {
                                    const activeItem = sidebarItems.find(item => item.id === activeSection);
                                    const Icon = activeItem?.icon || User;
                                    return (
                                        <>
                                            <Icon size={20} className="text-primary" />
                                            <span className="font-medium text-slate-900">{activeItem?.label || 'Menu'}</span>
                                        </>
                                    );
                                })()}
                            </div>
                            <ChevronDown size={20} className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 w-full md:w-64 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2">
                                {sidebarItems.map((item) => {
                                    const IconComponent = item.icon;
                                    const isActive = activeSection === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveSection(item.id);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${isActive
                                                    ? 'bg-primary/5 text-primary'
                                                    : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            <IconComponent size={18} />
                                            {item.label}
                                        </button>
                                    );
                                })}
                                <div className="pt-2 mt-2 border-t border-slate-100">
                                    <button
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content Area */}
                    <main className="flex-1">
                        {activeSection === 'profile' && (
                            <div className="space-y-6">
                                {/* Profile Header */}
                                <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl p-8 text-white shadow-lg">
                                    <div className="flex items-center gap-6">
                                        <div className="size-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30">
                                            {profileData.firstName[0]}{profileData.lastName[0]}
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold mb-1">
                                                {profileData.firstName} {profileData.lastName}
                                            </h2>
                                            <p className="text-blue-100 mb-2">{profileData.role}</p>
                                            <div className="flex items-center gap-2 text-sm text-blue-100">
                                                <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                {profileData.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
                                            <p className="text-sm text-slate-500 mt-0.5">Update your personal details</p>
                                        </div>
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
                                                    onClick={() => handleCancel('personal')}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                >
                                                    <X size={16} />
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleSave('personal')}
                                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                                                >
                                                    <Check size={16} />
                                                    Save
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    First Name
                                                </label>
                                                {isEditing.personal ? (
                                                    <input
                                                        type="text"
                                                        value={profileData.firstName}
                                                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                    />
                                                ) : (
                                                    <p className="text-slate-900 font-medium py-2.5">{profileData.firstName}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Last Name
                                                </label>
                                                {isEditing.personal ? (
                                                    <input
                                                        type="text"
                                                        value={profileData.lastName}
                                                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                    />
                                                ) : (
                                                    <p className="text-slate-900 font-medium py-2.5">{profileData.lastName}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Email Address
                                                </label>
                                                {isEditing.personal ? (
                                                    <input
                                                        type="email"
                                                        value={profileData.email}
                                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                    />
                                                ) : (
                                                    <p className="text-slate-900 font-medium py-2.5">{profileData.email}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Phone Number
                                                </label>
                                                {isEditing.personal ? (
                                                    <input
                                                        type="tel"
                                                        value={profileData.phone}
                                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                    />
                                                ) : (
                                                    <p className="text-slate-900 font-medium py-2.5">{profileData.phone}</p>
                                                )}
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Bio
                                                </label>
                                                {isEditing.personal ? (
                                                    <textarea
                                                        value={profileData.bio}
                                                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                                        rows="3"
                                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                                    />
                                                ) : (
                                                    <p className="text-slate-900 font-medium py-2.5">{profileData.bio}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Address Information</h3>
                                            <p className="text-sm text-slate-500 mt-0.5">Manage your delivery address</p>
                                        </div>
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
                                                    onClick={() => handleCancel('address')}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                >
                                                    <X size={16} />
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleSave('address')}
                                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                                                >
                                                    <Check size={16} />
                                                    Save
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Street Address
                                                </label>
                                                {isEditing.address ? (
                                                    <input
                                                        type="text"
                                                        value={profileData.street}
                                                        onChange={(e) => setProfileData({ ...profileData, street: e.target.value })}
                                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                    />
                                                ) : (
                                                    <p className="text-slate-900 font-medium py-2.5">{profileData.street}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    City
                                                </label>
                                                {isEditing.address ? (
                                                    <input
                                                        type="text"
                                                        value={profileData.city}
                                                        onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                    />
                                                ) : (
                                                    <p className="text-slate-900 font-medium py-2.5">{profileData.city}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    State
                                                </label>
                                                {isEditing.address ? (
                                                    <input
                                                        type="text"
                                                        value={profileData.state}
                                                        onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                    />
                                                ) : (
                                                    <p className="text-slate-900 font-medium py-2.5">{profileData.state}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Country
                                                </label>
                                                {isEditing.address ? (
                                                    <input
                                                        type="text"
                                                        value={profileData.country}
                                                        onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                    />
                                                ) : (
                                                    <p className="text-slate-900 font-medium py-2.5">{profileData.country}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Zip Code
                                                </label>
                                                {isEditing.address ? (
                                                    <input
                                                        type="text"
                                                        value={profileData.zipCode}
                                                        onChange={(e) => setProfileData({ ...profileData, zipCode: e.target.value })}
                                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                    />
                                                ) : (
                                                    <p className="text-slate-900 font-medium py-2.5">{profileData.zipCode}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'security' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-6">Change Password</h3>
                                    <div className="space-y-4 max-w-md">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                            />
                                        </div>
                                        <button className="w-full px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm">
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Other sections */}
                        {!['profile', 'security'].includes(activeSection) && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
                                <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-slate-400 text-3xl">construction</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 capitalize">{activeSection.replace('-', ' ')}</h3>
                                <p className="text-slate-500">This section is under development</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
