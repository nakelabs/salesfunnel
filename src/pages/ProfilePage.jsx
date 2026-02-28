import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WholesalerNavbar from '../components/WholesalerNavbar';
import { User, Lock, Users, UserPlus, Bell, CreditCard, Download, Trash2, Edit2, Check, X, ChevronDown } from 'lucide-react';

import profileService from '../services/profile.service';

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isEditing, setIsEditing] = useState({
        profile: false,
        personal: false,
        address: false
    });

    const [profileData, setProfileData] = useState({
        // User fields
        id: '',
        fullName: '',
        email: '',
        phone: '',
        role: 'Wholesaler',
        isActive: false,

        // Business Information
        businessName: '',
        cacRegistrationNumber: '',
        businessAddress: '',
        businessPhone: '',
        businessEmail: '',
        tin: '',

        // Owner Information
        ownerFullName: '',
        ownerPhone: '',
        ownerEmail: '',

        // Bank Details
        bankName: '',
        accountName: '',
        accountNumber: '',

        // Verification
        isVerified: false,

        // Documents
        cacCertificateUrl: '',
        tinCertificateUrl: '',
        utilityBillUrl: ''
    });

    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await profileService.getWholesalerProfile();

                // Extract wholesaler_profile from response
                const profile = data.wholesaler_profile || {};

                setProfileData({
                    // User fields
                    id: data.id || '',
                    fullName: data.full_name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    role: data.role || 'Wholesaler',
                    isActive: data.is_active || false,

                    // Business Information
                    businessName: profile.business_name || '',
                    cacRegistrationNumber: profile.cac_registration_number || '',
                    businessAddress: profile.business_address || '',
                    businessPhone: profile.business_phone || '',
                    businessEmail: profile.business_email || '',
                    tin: profile.tin || '',

                    // Owner Information
                    ownerFullName: profile.owner_full_name || '',
                    ownerPhone: profile.owner_phone || '',
                    ownerEmail: profile.owner_email || '',

                    // Bank Details
                    bankName: profile.bank_name || '',
                    accountName: profile.account_name || '',
                    accountNumber: profile.account_number || '',

                    // Verification
                    isVerified: profile.is_verified || false,

                    // Documents
                    cacCertificateUrl: profile.cac_certificate_url || '',
                    tinCertificateUrl: profile.tin_certificate_url || '',
                    utilityBillUrl: profile.utility_bill_url || ''
                });
            } catch (err) {
                console.error('Failed to load profile:', err);
                setMessage({ type: 'error', text: 'Failed to load profile data.' });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

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
        setMessage({ type: '', text: '' });
    };

    const handleSave = async (section) => {
        try {
            await profileService.updateWholesalerProfile(profileData, section);
            setIsEditing({ ...isEditing, [section]: false });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });

            // Clear success message after 3 seconds
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (err) {
            console.error('Failed to update profile:', err);
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        }
    };

    const handleCancel = (section) => {
        setIsEditing({ ...isEditing, [section]: false });
        setMessage({ type: '', text: '' });
        // Optionally revert changes if we kept a backup of previous state
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
                    {message.text && (
                        <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                            {message.text}
                        </div>
                    )}
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
                                            {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : 'W'}
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold mb-1">
                                                {profileData.fullName || 'Welcome'}
                                            </h2>
                                            <p className="text-blue-100 mb-2">{profileData.role}</p>
                                            {profileData.isVerified && (
                                                <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-100 px-3 py-1 rounded-full text-sm font-medium">
                                                    <span className="material-symbols-outlined text-[16px]">verified</span>
                                                    Verified Account
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
                                            <p className="text-sm text-slate-500 mt-0.5">Your basic account details</p>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Full Name
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.fullName || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Email Address
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.email || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Phone Number
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.phone || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Account Status
                                                </label>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${profileData.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {profileData.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Business Information</h3>
                                            <p className="text-sm text-slate-500 mt-0.5">Your registered business details</p>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Business Name
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.businessName || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    CAC Registration Number
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.cacRegistrationNumber || 'N/A'}</p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Business Address
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.businessAddress || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Business Phone
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.businessPhone || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Business Email
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.businessEmail || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    TIN
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.tin || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Owner Information */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Owner Information</h3>
                                            <p className="text-sm text-slate-500 mt-0.5">Business owner contact details</p>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Owner Full Name
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.ownerFullName || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Owner Phone
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.ownerPhone || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Owner Email
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.ownerEmail || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Details */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Bank Details</h3>
                                            <p className="text-sm text-slate-500 mt-0.5">Your payment account information</p>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Bank Name
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.bankName || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Account Name
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.accountName || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                                                    Account Number
                                                </label>
                                                <p className="text-slate-900 font-medium py-2.5">{profileData.accountNumber || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Documents */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Documents</h3>
                                            <p className="text-sm text-slate-500 mt-0.5">Your uploaded verification documents</p>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* CAC Certificate */}
                                            <div className="border border-slate-200 rounded-lg p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="material-symbols-outlined text-primary">description</span>
                                                    <h4 className="font-semibold text-slate-900 text-sm">CAC Certificate</h4>
                                                </div>
                                                {profileData.cacCertificateUrl ? (
                                                    <a
                                                        href={profileData.cacCertificateUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-primary hover:underline flex items-center gap-1"
                                                    >
                                                        View Document
                                                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                                    </a>
                                                ) : (
                                                    <p className="text-sm text-slate-400">Not uploaded</p>
                                                )}
                                            </div>

                                            {/* TIN Certificate */}
                                            <div className="border border-slate-200 rounded-lg p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="material-symbols-outlined text-primary">description</span>
                                                    <h4 className="font-semibold text-slate-900 text-sm">TIN Certificate</h4>
                                                </div>
                                                {profileData.tinCertificateUrl ? (
                                                    <a
                                                        href={profileData.tinCertificateUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-primary hover:underline flex items-center gap-1"
                                                    >
                                                        View Document
                                                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                                    </a>
                                                ) : (
                                                    <p className="text-sm text-slate-400">Not uploaded</p>
                                                )}
                                            </div>

                                            {/* Utility Bill */}
                                            <div className="border border-slate-200 rounded-lg p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="material-symbols-outlined text-primary">description</span>
                                                    <h4 className="font-semibold text-slate-900 text-sm">Utility Bill</h4>
                                                </div>
                                                {profileData.utilityBillUrl ? (
                                                    <a
                                                        href={profileData.utilityBillUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-primary hover:underline flex items-center gap-1"
                                                    >
                                                        View Document
                                                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                                    </a>
                                                ) : (
                                                    <p className="text-sm text-slate-400">Not uploaded</p>
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
