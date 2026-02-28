import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WholesalerNavbar from '../components/WholesalerNavbar';
import { User, Lock, Users, UserPlus, Bell, CreditCard, Download, Trash2, Edit2, Check, X, ChevronDown } from 'lucide-react';
import profileService from '../services/profile.service';

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isEditing, setIsEditing] = useState({
        personal: false,
        business: false,
        owner: false,
        bank: false,
    });

    const [profileData, setProfileData] = useState({
        id: '', fullName: '', email: '', phone: '', role: 'Wholesaler', isActive: false,
        businessName: '', cacRegistrationNumber: '', businessAddress: '', businessPhone: '', businessEmail: '', tin: '',
        ownerFullName: '', ownerPhone: '', ownerEmail: '',
        bankName: '', accountName: '', accountNumber: '',
        isVerified: false,
        cacCertificateUrl: '', tinCertificateUrl: '', utilityBillUrl: '',
    });

    // Backup for cancel
    const [profileBackup, setProfileBackup] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await profileService.getProfile();
                const profile = data.wholesaler_profile || data.distributor_profile || {};

                setProfileData({
                    id: data.id || '',
                    fullName: data.full_name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    role: data.role || 'Wholesaler',
                    isActive: data.is_active || false,
                    businessName: profile.business_name || '',
                    cacRegistrationNumber: profile.cac_registration_number || '',
                    businessAddress: profile.business_address || '',
                    businessPhone: profile.business_phone || '',
                    businessEmail: profile.business_email || '',
                    tin: profile.tin || '',
                    ownerFullName: profile.owner_full_name || '',
                    ownerPhone: profile.owner_phone || '',
                    ownerEmail: profile.owner_email || '',
                    bankName: profile.bank_name || '',
                    accountName: profile.account_name || '',
                    accountNumber: profile.account_number || '',
                    isVerified: profile.is_verified || false,
                    cacCertificateUrl: profile.cac_certificate_url || '',
                    tinCertificateUrl: profile.tin_certificate_url || '',
                    utilityBillUrl: profile.utility_bill_url || '',
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
        setProfileBackup({ ...profileData });
        setIsEditing({ ...isEditing, [section]: true });
        setMessage({ type: '', text: '' });
    };

    const handleCancel = (section) => {
        if (profileBackup) setProfileData(profileBackup);
        setProfileBackup(null);
        setIsEditing({ ...isEditing, [section]: false });
        setMessage({ type: '', text: '' });
    };

    const handleSave = async (section) => {
        try {
            setSaving(true);
            // Build payload with snake_case keys matching the API
            const payload = {};
            if (section === 'personal') {
                payload.full_name = profileData.fullName;
                payload.phone = profileData.phone;
            } else if (section === 'business') {
                payload.business_name = profileData.businessName;
                payload.cac_registration_number = profileData.cacRegistrationNumber;
                payload.business_address = profileData.businessAddress;
                payload.business_phone = profileData.businessPhone;
                payload.business_email = profileData.businessEmail;
                payload.tin = profileData.tin;
            } else if (section === 'owner') {
                payload.owner_full_name = profileData.ownerFullName;
                payload.owner_phone = profileData.ownerPhone;
                payload.owner_email = profileData.ownerEmail;
            } else if (section === 'bank') {
                payload.bank_name = profileData.bankName;
                payload.account_name = profileData.accountName;
                payload.account_number = profileData.accountNumber;
            }

            await profileService.updateProfile(payload);
            setProfileBackup(null);
            setIsEditing({ ...isEditing, [section]: false });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (err) {
            console.error('Failed to update profile:', err);
            setMessage({ type: 'error', text: err.response?.data?.detail || 'Failed to update profile.' });
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field, value) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    // Render helper — returns JSX directly (NOT a component) to avoid focus loss on re-render
    const renderField = (label, field, value, editing, type = 'text', colSpan = false) => (
        <div className={colSpan ? 'md:col-span-2' : ''}>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">{label}</label>
            {editing ? (
                <input
                    type={type}
                    value={value || ''}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                />
            ) : (
                <p className="text-slate-900 font-medium py-2.5">{value || 'N/A'}</p>
            )}
        </div>
    );

    // Render helper for section headers (NOT a component to avoid remount)
    const renderSectionHeader = (title, subtitle, section) => (
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
                {isEditing[section] ? (
                    <>
                        <button
                            onClick={() => handleCancel(section)}
                            disabled={saving}
                            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                            onClick={() => handleSave(section)}
                            disabled={saving}
                            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-50"
                        >
                            {saving ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Check size={16} />
                            )}
                            Save
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => handleEdit(section)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                        <Edit2 size={16} />
                        Edit
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <WholesalerNavbar />

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
                            <div className="absolute top-full left-0 w-full md:w-64 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl py-2">
                                {sidebarItems.map((item) => {
                                    const IconComponent = item.icon;
                                    const isActive = activeSection === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => { setActiveSection(item.id); setIsDropdownOpen(false); }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                                        >
                                            <IconComponent size={18} />
                                            {item.label}
                                        </button>
                                    );
                                })}
                                <div className="pt-2 mt-2 border-t border-slate-100">
                                    <button onClick={() => setIsDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                                        <Trash2 size={18} />
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                            <p className="text-slate-500 text-sm">Loading profile…</p>
                        </div>
                    ) : (
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
                                                <h2 className="text-2xl font-bold mb-1">{profileData.fullName || 'Welcome'}</h2>
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
                                        {renderSectionHeader('Personal Information', 'Your basic account details', 'personal')}
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {renderField('Full Name', 'fullName', profileData.fullName, isEditing.personal)}
                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Email Address</label>
                                                    <p className="text-slate-900 font-medium py-2.5">{profileData.email || 'N/A'}</p>
                                                    {isEditing.personal && <p className="text-xs text-slate-400 mt-1">Email cannot be changed</p>}
                                                </div>
                                                {renderField('Phone Number', 'phone', profileData.phone, isEditing.personal, 'tel')}
                                                <div>
                                                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Account Status</label>
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${profileData.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {profileData.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Business Information */}
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                        {renderSectionHeader('Business Information', 'Your registered business details', 'business')}
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {renderField('Business Name', 'businessName', profileData.businessName, isEditing.business)}
                                                {renderField('CAC Registration Number', 'cacRegistrationNumber', profileData.cacRegistrationNumber, isEditing.business)}
                                                {renderField('Business Address', 'businessAddress', profileData.businessAddress, isEditing.business, 'text', true)}
                                                {renderField('Business Phone', 'businessPhone', profileData.businessPhone, isEditing.business, 'tel')}
                                                {renderField('Business Email', 'businessEmail', profileData.businessEmail, isEditing.business, 'email')}
                                                {renderField('TIN', 'tin', profileData.tin, isEditing.business)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Owner Information */}
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                        {renderSectionHeader('Owner Information', 'Business owner contact details', 'owner')}
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {renderField('Owner Full Name', 'ownerFullName', profileData.ownerFullName, isEditing.owner)}
                                                {renderField('Owner Phone', 'ownerPhone', profileData.ownerPhone, isEditing.owner, 'tel')}
                                                {renderField('Owner Email', 'ownerEmail', profileData.ownerEmail, isEditing.owner, 'email')}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bank Details */}
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                        {renderSectionHeader('Bank Details', 'Your payment account information', 'bank')}
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {renderField('Bank Name', 'bankName', profileData.bankName, isEditing.bank)}
                                                {renderField('Account Name', 'accountName', profileData.accountName, isEditing.bank)}
                                                {renderField('Account Number', 'accountNumber', profileData.accountNumber, isEditing.bank)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Documents (read-only) */}
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900">Documents</h3>
                                                <p className="text-sm text-slate-500 mt-0.5">Your uploaded verification documents</p>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {[
                                                    { label: 'CAC Certificate', url: profileData.cacCertificateUrl },
                                                    { label: 'TIN Certificate', url: profileData.tinCertificateUrl },
                                                    { label: 'Utility Bill', url: profileData.utilityBillUrl },
                                                ].map((doc) => (
                                                    <div key={doc.label} className="border border-slate-200 rounded-lg p-4">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="material-symbols-outlined text-primary">description</span>
                                                            <h4 className="font-semibold text-slate-900 text-sm">{doc.label}</h4>
                                                        </div>
                                                        {doc.url ? (
                                                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                                                                View Document
                                                                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                                            </a>
                                                        ) : (
                                                            <p className="text-sm text-slate-400">Not uploaded</p>
                                                        )}
                                                    </div>
                                                ))}
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
                                                <input type="password" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                                                <input type="password" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                                                <input type="password" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
                                            </div>
                                            <button className="w-full px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm">
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

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
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
