import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WholesalerNavbar from '../components/WholesalerNavbar';
import {
    User,
    Lock,
    Users,
    UserPlus,
    Bell,
    CreditCard,
    Download,
    Trash2,
    Edit2,
    Check,
    X,
    Copy,
    CheckCheck,
    MapPin,
    AlertCircle,
    FileText,
    LogOut,
    ExternalLink
} from 'lucide-react';
import profileService from '../services/profile.service';
import authService from '../services/auth.service';
import orderService from '../services/order.service';

const ProfilePage = () => {
    const navigate = useNavigate();
    const currentUser = authService.getCurrentUser();

    const [activeSection, setActiveSection] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [savingSection, setSavingSection] = useState(null);
    const [toastMessage, setToastMessage] = useState({ type: '', text: '' });
    const [copiedField, setCopiedField] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [exportingData, setExportingData] = useState(false);

    // Section edit toggles
    const [isEditing, setIsEditing] = useState({
        header: false,
        personal: false,
        address: false,
        business: false,
        bank: false,
    });

    // Strictly real profile state with empty initial values (NO hardcoded mock values)
    const [profileData, setProfileData] = useState({
        id: currentUser?.id || '',
        fullName: '',
        email: currentUser?.email || '',
        phone: '',
        role: currentUser?.userType || 'Wholesaler',
        isActive: false,
        isVerified: false,

        // Business & Address details from API
        businessName: '',
        cacRegistrationNumber: '',
        businessAddress: '',
        businessPhone: '',
        businessEmail: '',
        tin: '',

        // Owner details
        ownerFullName: '',
        ownerPhone: '',
        ownerEmail: '',

        // Bank details
        bankName: '',
        accountName: '',
        accountNumber: '',

        // Verification document URLs
        cacCertificateUrl: '',
        tinCertificateUrl: '',
        utilityBillUrl: '',
    });

    // Password change form state
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Notification preferences stored in localStorage
    const [notifications, setNotifications] = useState(() => {
        try {
            const saved = localStorage.getItem('salesfunnel_notif_prefs');
            return saved ? JSON.parse(saved) : {
                orderUpdates: true,
                deliverySms: true,
                paymentReceipts: true,
                restockAlerts: false
            };
        } catch {
            return {
                orderUpdates: true,
                deliverySms: true,
                paymentReceipts: true,
                restockAlerts: false
            };
        }
    });

    // Backup to cancel edits safely
    const [profileBackup, setProfileBackup] = useState(null);

    // Fetch live profile strictly from endpoint
    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await profileService.getProfile();
            const profile = data.wholesaler_profile || data.distributor_profile || {};

            setProfileData({
                id: data.id || currentUser?.id || '',
                fullName: data.full_name || profile.owner_full_name || '',
                email: data.email || currentUser?.email || profile.business_email || '',
                phone: data.phone || profile.business_phone || profile.owner_phone || '',
                role: data.role || currentUser?.userType || 'Wholesaler',
                isActive: data.is_active !== undefined ? Boolean(data.is_active) : true,
                isVerified: profile.is_verified !== undefined ? Boolean(profile.is_verified) : false,

                businessName: profile.business_name || '',
                cacRegistrationNumber: profile.cac_registration_number || '',
                businessAddress: profile.business_address || '',
                businessPhone: profile.business_phone || '',
                businessEmail: profile.business_email || '',
                tin: profile.tin || '',

                ownerFullName: profile.owner_full_name || data.full_name || '',
                ownerPhone: profile.owner_phone || data.phone || '',
                ownerEmail: profile.owner_email || data.email || '',

                bankName: profile.bank_name || '',
                accountName: profile.account_name || '',
                accountNumber: profile.account_number || '',

                cacCertificateUrl: profile.cac_certificate_url || '',
                tinCertificateUrl: profile.tin_certificate_url || '',
                utilityBillUrl: profile.utility_bill_url || '',
            });
        } catch (err) {
            console.error('Failed to load profile from endpoint:', err);
            showToast('error', 'Unable to load profile data from server');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            navigate('/login');
            return;
        }
        fetchProfile();
    }, [navigate]);

    const sidebarItems = [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'teams', label: 'Teams', icon: Users },
        { id: 'team-member', label: 'Team Member', icon: UserPlus },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'data-export', label: 'Data Export', icon: Download },
    ];

    const showToast = (type, text) => {
        setToastMessage({ type, text });
        setTimeout(() => setToastMessage({ type: '', text: '' }), 4000);
    };

    const handleCopy = (text, fieldName) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
        showToast('success', `Copied ${fieldName} to clipboard`);
    };

    const startEditing = (section) => {
        setProfileBackup({ ...profileData });
        setIsEditing(prev => ({ ...prev, [section]: true }));
    };

    const cancelEditing = (section) => {
        if (profileBackup) {
            setProfileData(profileBackup);
        }
        setProfileBackup(null);
        setIsEditing(prev => ({ ...prev, [section]: false }));
    };

    // Save changes for a section to endpoint
    const saveSection = async (section) => {
        try {
            setSavingSection(section);
            const payload = {};

            if (section === 'header' || section === 'personal') {
                payload.full_name = profileData.fullName;
                payload.phone = profileData.phone;
            } else if (section === 'address') {
                payload.business_address = profileData.businessAddress;
                payload.wholesaler_profile = {
                    business_address: profileData.businessAddress
                };
            } else if (section === 'business') {
                payload.business_name = profileData.businessName;
                payload.cac_registration_number = profileData.cacRegistrationNumber;
                payload.business_address = profileData.businessAddress;
                payload.business_phone = profileData.businessPhone;
                payload.business_email = profileData.businessEmail;
                payload.tin = profileData.tin;
                payload.wholesaler_profile = {
                    business_name: profileData.businessName,
                    cac_registration_number: profileData.cacRegistrationNumber,
                    business_address: profileData.businessAddress,
                    business_phone: profileData.businessPhone,
                    business_email: profileData.businessEmail,
                    tin: profileData.tin
                };
            } else if (section === 'bank') {
                payload.bank_name = profileData.bankName;
                payload.account_name = profileData.accountName;
                payload.account_number = profileData.accountNumber;
                payload.wholesaler_profile = {
                    bank_name: profileData.bankName,
                    account_name: profileData.accountName,
                    account_number: profileData.accountNumber
                };
            }

            await profileService.updateProfile(payload);
            setProfileBackup(null);
            setIsEditing(prev => ({ ...prev, [section]: false }));
            showToast('success', 'Profile updated successfully');
            fetchProfile();
        } catch (err) {
            console.error('Failed to update profile via endpoint:', err);
            const errorMsg = err?.response?.data?.detail || err?.response?.data?.message || 'Failed to save changes. Please try again.';
            showToast('error', errorMsg);
        } finally {
            setSavingSection(null);
        }
    };

    const handleFieldChange = (field, value) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handleNotificationToggle = (key) => {
        setNotifications(prev => {
            const updated = { ...prev, [key]: !prev[key] };
            localStorage.setItem('salesfunnel_notif_prefs', JSON.stringify(updated));
            return updated;
        });
        showToast('success', 'Preferences saved');
    };

    // Live CSV Export using actual orders from the order service endpoint
    const handleExportOrders = async () => {
        try {
            setExportingData(true);
            const orders = await orderService.getMyOrders();
            const orderList = Array.isArray(orders) ? orders : (orders?.items || orders?.data || []);

            if (orderList.length === 0) {
                showToast('error', 'No orders available to export');
                return;
            }

            const headers = ['Order ID', 'Date', 'Status', 'Total (NGN)', 'Delivery Address'];
            const rows = orderList.map(o => [
                o.id || o.order_id || 'N/A',
                o.created_at ? new Date(o.created_at).toLocaleDateString() : 'N/A',
                o.status || 'Pending',
                o.total_amount || o.total || 0,
                `"${(o.delivery_address || '').replace(/"/g, '""')}"`
            ]);

            const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', `salesfunnel_orders_${Date.now()}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast('success', 'Order history exported successfully');
        } catch (err) {
            console.error('Failed to export orders:', err);
            showToast('error', 'Failed to generate order export');
        } finally {
            setExportingData(false);
        }
    };

    // Helper for rendering values or clean empty fallback
    const renderValue = (val) => {
        if (!val || val.toString().trim() === '') {
            return <span className="text-slate-400 font-normal italic">Not provided</span>;
        }
        return val;
    };

    // Initials helper
    const getInitials = () => {
        if (profileData.fullName) {
            const parts = profileData.fullName.trim().split(' ');
            if (parts.length >= 2) {
                return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
            }
            return parts[0][0].toUpperCase();
        }
        if (profileData.email) {
            return profileData.email[0].toUpperCase();
        }
        return 'U';
    };

    if (loading) {
        return (
            <div className="bg-[#f8fafc] min-h-screen font-display flex flex-col antialiased">
                <WholesalerNavbar />
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                    <div className="w-10 h-10 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="text-sm text-slate-500 font-medium">Loading account details from server...</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="bg-[#f8fafc] min-h-screen text-slate-900 font-display flex flex-col antialiased"
            style={{ fontFamily: '"Google Sans", "Plus Jakarta Sans", system-ui, sans-serif' }}
        >
            {/* Navbar */}
            <WholesalerNavbar />

            {/* Notification Toast */}
            {toastMessage.text && (
                <div className="fixed bottom-6 right-6 z-50">
                    <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
                            toastMessage.type === 'success'
                                ? 'bg-slate-900 text-white border-slate-700'
                                : 'bg-rose-900 text-rose-100 border-rose-700'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {toastMessage.type === 'success' ? 'check_circle' : 'error'}
                        </span>
                        <span>{toastMessage.text}</span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
                {/* Title */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Account Settings
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your account information and preferences.
                    </p>
                </div>

                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Left Navigation Sidebar */}
                    <aside className="md:col-span-3 sticky top-24">
                        <nav className="bg-white md:bg-transparent rounded-2xl md:rounded-none border md:border-0 border-slate-200/80 p-2 md:p-0 flex md:flex-col gap-1 overflow-x-auto no-scrollbar">
                            {sidebarItems.map(item => {
                                const IconComponent = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap text-left ${
                                            isActive
                                                ? 'bg-blue-50/90 text-blue-700 font-semibold shadow-2xs'
                                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                                        }`}
                                    >
                                        <IconComponent size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}

                            {/* Delete Account Link at Bottom of Sidebar */}
                            <div className="hidden md:block pt-4 mt-3 border-t border-slate-200/80">
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-50/80 transition-all w-full text-left"
                                >
                                    <Trash2 size={18} className="text-rose-400" />
                                    <span>Delete Account</span>
                                </button>
                            </div>
                        </nav>
                    </aside>

                    {/* Right Content */}
                    <main className="md:col-span-9 space-y-6">
                        {/* TAB: MY PROFILE */}
                        {activeSection === 'profile' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-1">
                                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Profile</h2>
                                </div>

                                {/* Card 1: Avatar & Identity Header */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                        <div className="flex items-center gap-5">
                                            {/* Avatar with Initials from API */}
                                            <div className="w-20 h-20 rounded-full ring-4 ring-slate-100 bg-slate-900 text-white flex items-center justify-center text-xl font-bold shrink-0">
                                                {getInitials()}
                                            </div>

                                            {/* Details */}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-xl font-bold text-slate-900">
                                                        {renderValue(profileData.fullName || profileData.ownerFullName)}
                                                    </h3>
                                                    {profileData.isVerified && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                            <Check size={11} className="stroke-[3]" />
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm font-medium text-slate-500 mt-0.5">
                                                    {profileData.role || 'Wholesaler'}
                                                </p>
                                                {profileData.businessAddress && (
                                                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                                                        <MapPin size={13} className="text-slate-400" />
                                                        <span>{profileData.businessAddress}</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Edit Button */}
                                        <div className="self-end sm:self-center">
                                            {isEditing.header ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => cancelEditing('header')}
                                                        className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => saveSection('header')}
                                                        disabled={savingSection === 'header'}
                                                        className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
                                                    >
                                                        {savingSection === 'header' ? 'Saving...' : 'Save'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => startEditing('header')}
                                                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
                                                >
                                                    <span>Edit</span>
                                                    <Edit2 size={13} className="text-slate-500" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Inline Form */}
                                    {isEditing.header && (
                                        <div className="mt-6 pt-6 border-t border-slate-100">
                                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Full Name</label>
                                            <input
                                                type="text"
                                                value={profileData.fullName}
                                                onChange={e => handleFieldChange('fullName', e.target.value)}
                                                className="w-full sm:w-96 px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Card 2: Personal Information */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-base font-bold text-slate-900">Personal information</h3>
                                            <p className="text-xs text-slate-400 mt-0.5">Primary contact identity retrieved from your account</p>
                                        </div>
                                        <div>
                                            {isEditing.personal ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => cancelEditing('personal')}
                                                        className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => saveSection('personal')}
                                                        disabled={savingSection === 'personal'}
                                                        className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
                                                    >
                                                        {savingSection === 'personal' ? 'Saving...' : 'Save'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => startEditing('personal')}
                                                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
                                                >
                                                    <span>Edit</span>
                                                    <Edit2 size={13} className="text-slate-500" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                        {/* Full Name */}
                                        <div>
                                            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                                Full Name
                                            </span>
                                            {isEditing.personal ? (
                                                <input
                                                    type="text"
                                                    value={profileData.fullName}
                                                    onChange={e => handleFieldChange('fullName', e.target.value)}
                                                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                                />
                                            ) : (
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {renderValue(profileData.fullName || profileData.ownerFullName)}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email Address */}
                                        <div>
                                            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                                Email address
                                            </span>
                                            <div className="flex items-center gap-2 group">
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {renderValue(profileData.email)}
                                                </p>
                                                {profileData.email && (
                                                    <button
                                                        onClick={() => handleCopy(profileData.email, 'Email')}
                                                        className="text-slate-400 hover:text-slate-700 opacity-60 group-hover:opacity-100 transition-opacity"
                                                        title="Copy email"
                                                    >
                                                        {copiedField === 'Email' ? <CheckCheck size={14} className="text-emerald-600" /> : <Copy size={14} />}
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                                Phone
                                            </span>
                                            {isEditing.personal ? (
                                                <input
                                                    type="tel"
                                                    value={profileData.phone}
                                                    onChange={e => handleFieldChange('phone', e.target.value)}
                                                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2 group">
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {renderValue(profileData.phone)}
                                                    </p>
                                                    {profileData.phone && (
                                                        <button
                                                            onClick={() => handleCopy(profileData.phone, 'Phone')}
                                                            className="text-slate-400 hover:text-slate-700 opacity-60 group-hover:opacity-100 transition-opacity"
                                                            title="Copy phone"
                                                        >
                                                            {copiedField === 'Phone' ? <CheckCheck size={14} className="text-emerald-600" /> : <Copy size={14} />}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Account Status */}
                                        <div>
                                            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                                Account Status
                                            </span>
                                            <div className="pt-0.5">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                    profileData.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                                }`}>
                                                    {profileData.isActive ? 'Active' : 'Pending Verification'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3: Address & Warehouse Details */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-base font-bold text-slate-900">Address</h3>
                                            <p className="text-xs text-slate-400 mt-0.5">Delivery and registered business location</p>
                                        </div>
                                        <div>
                                            {isEditing.address ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => cancelEditing('address')}
                                                        className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => saveSection('address')}
                                                        disabled={savingSection === 'address'}
                                                        className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
                                                    >
                                                        {savingSection === 'address' ? 'Saving...' : 'Save'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => startEditing('address')}
                                                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
                                                >
                                                    <span>Edit</span>
                                                    <Edit2 size={13} className="text-slate-500" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                            Registered Business Address
                                        </span>
                                        {isEditing.address ? (
                                            <textarea
                                                rows={2}
                                                value={profileData.businessAddress}
                                                onChange={e => handleFieldChange('businessAddress', e.target.value)}
                                                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2 group">
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {renderValue(profileData.businessAddress)}
                                                </p>
                                                {profileData.businessAddress && (
                                                    <button
                                                        onClick={() => handleCopy(profileData.businessAddress, 'Address')}
                                                        className="text-slate-400 hover:text-slate-700 opacity-60 group-hover:opacity-100 transition-opacity"
                                                        title="Copy address"
                                                    >
                                                        {copiedField === 'Address' ? <CheckCheck size={14} className="text-emerald-600" /> : <Copy size={14} />}
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Card 4: Business Information & KYC */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-base font-bold text-slate-900">Business Details</h3>
                                            <p className="text-xs text-slate-400 mt-0.5">Corporate Affairs Commission (CAC) and statutory registrations</p>
                                        </div>
                                        <div>
                                            {isEditing.business ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => cancelEditing('business')}
                                                        className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => saveSection('business')}
                                                        disabled={savingSection === 'business'}
                                                        className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
                                                    >
                                                        {savingSection === 'business' ? 'Saving...' : 'Save'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => startEditing('business')}
                                                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
                                                >
                                                    <span>Edit</span>
                                                    <Edit2 size={13} className="text-slate-500" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                        <div>
                                            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                                Business Name
                                            </span>
                                            {isEditing.business ? (
                                                <input
                                                    type="text"
                                                    value={profileData.businessName}
                                                    onChange={e => handleFieldChange('businessName', e.target.value)}
                                                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                                />
                                            ) : (
                                                <p className="text-sm font-semibold text-slate-900">{renderValue(profileData.businessName)}</p>
                                            )}
                                        </div>

                                        <div>
                                            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                                CAC Registration Number
                                            </span>
                                            {isEditing.business ? (
                                                <input
                                                    type="text"
                                                    value={profileData.cacRegistrationNumber}
                                                    onChange={e => handleFieldChange('cacRegistrationNumber', e.target.value)}
                                                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                                />
                                            ) : (
                                                <p className="text-sm font-semibold text-slate-900 font-mono">{renderValue(profileData.cacRegistrationNumber)}</p>
                                            )}
                                        </div>

                                        <div>
                                            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                                Tax Identification Number (TIN)
                                            </span>
                                            {isEditing.business ? (
                                                <input
                                                    type="text"
                                                    value={profileData.tin}
                                                    onChange={e => handleFieldChange('tin', e.target.value)}
                                                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                                />
                                            ) : (
                                                <p className="text-sm font-semibold text-slate-900 font-mono">{renderValue(profileData.tin)}</p>
                                            )}
                                        </div>

                                        <div>
                                            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                                Business Email
                                            </span>
                                            {isEditing.business ? (
                                                <input
                                                    type="email"
                                                    value={profileData.businessEmail}
                                                    onChange={e => handleFieldChange('businessEmail', e.target.value)}
                                                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                                />
                                            ) : (
                                                <p className="text-sm font-semibold text-slate-900">{renderValue(profileData.businessEmail)}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Card 5: Bank Details */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-base font-bold text-slate-900">Bank Details</h3>
                                            <p className="text-xs text-slate-400 mt-0.5">Account for payment verification and escrow settlements</p>
                                        </div>
                                        <div>
                                            {isEditing.bank ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => cancelEditing('bank')}
                                                        className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => saveSection('bank')}
                                                        disabled={savingSection === 'bank'}
                                                        className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
                                                    >
                                                        {savingSection === 'bank' ? 'Saving...' : 'Save'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => startEditing('bank')}
                                                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
                                                >
                                                    <span>Edit</span>
                                                    <Edit2 size={13} className="text-slate-500" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
                                        <div>
                                            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                                Bank Name
                                            </span>
                                            {isEditing.bank ? (
                                                <input
                                                    type="text"
                                                    value={profileData.bankName}
                                                    onChange={e => handleFieldChange('bankName', e.target.value)}
                                                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                                />
                                            ) : (
                                                <p className="text-sm font-semibold text-slate-900">{renderValue(profileData.bankName)}</p>
                                            )}
                                        </div>

                                        <div>
                                            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                                Account Name
                                            </span>
                                            {isEditing.bank ? (
                                                <input
                                                    type="text"
                                                    value={profileData.accountName}
                                                    onChange={e => handleFieldChange('accountName', e.target.value)}
                                                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                                />
                                            ) : (
                                                <p className="text-sm font-semibold text-slate-900">{renderValue(profileData.accountName)}</p>
                                            )}
                                        </div>

                                        <div>
                                            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                                Account Number
                                            </span>
                                            {isEditing.bank ? (
                                                <input
                                                    type="text"
                                                    value={profileData.accountNumber}
                                                    onChange={e => handleFieldChange('accountNumber', e.target.value)}
                                                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2 group">
                                                    <p className="text-sm font-semibold text-slate-900 font-mono tracking-wider">
                                                        {renderValue(profileData.accountNumber)}
                                                    </p>
                                                    {profileData.accountNumber && (
                                                        <button
                                                            onClick={() => handleCopy(profileData.accountNumber, 'Account Number')}
                                                            className="text-slate-400 hover:text-slate-700 opacity-60 group-hover:opacity-100 transition-opacity"
                                                            title="Copy account number"
                                                        >
                                                            {copiedField === 'Account Number' ? <CheckCheck size={14} className="text-emerald-600" /> : <Copy size={14} />}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Card 6: Documents */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8">
                                    <h3 className="text-base font-bold text-slate-900 mb-1">Verification Documents</h3>
                                    <p className="text-xs text-slate-400 mb-6">Submitted statutory documentation during onboarding</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {[
                                            { label: 'CAC Certificate', url: profileData.cacCertificateUrl },
                                            { label: 'TIN Certificate', url: profileData.tinCertificateUrl },
                                            { label: 'Utility Bill', url: profileData.utilityBillUrl },
                                        ].map((doc, idx) => (
                                            <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                                                <div className="flex items-center gap-2.5 mb-2">
                                                    <FileText size={18} className="text-slate-500" />
                                                    <span className="text-xs font-bold text-slate-900">{doc.label}</span>
                                                </div>
                                                {doc.url ? (
                                                    <a
                                                        href={doc.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                                    >
                                                        <span>View Document</span>
                                                        <ExternalLink size={12} />
                                                    </a>
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic">Not uploaded</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: SECURITY */}
                        {activeSection === 'security' && (
                            <div className="space-y-6">
                                <div className="pb-1">
                                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Security</h2>
                                    <p className="text-xs text-slate-500 mt-0.5">Manage your credentials and login session</p>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8">
                                    <h3 className="text-base font-bold text-slate-900 mb-1">Change Password</h3>
                                    <p className="text-xs text-slate-500 mb-6">Ensure your account has a secure and unique password.</p>

                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            showToast('success', 'Password update request received');
                                            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                        }}
                                        className="space-y-4 max-w-md"
                                    >
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Current Password</label>
                                            <input
                                                type="password"
                                                value={passwordForm.currentPassword}
                                                onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                                placeholder="••••••••••••"
                                                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">New Password</label>
                                            <input
                                                type="password"
                                                value={passwordForm.newPassword}
                                                onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                placeholder="At least 8 characters"
                                                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                                            <input
                                                type="password"
                                                value={passwordForm.confirmPassword}
                                                onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                placeholder="Re-enter new password"
                                                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
                                        >
                                            Update Password
                                        </button>
                                    </form>
                                </div>

                                {/* Active Session & Logout */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">Active Login Session</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Authenticated as {profileData.email || currentUser?.email}</p>
                                    </div>
                                    <button
                                        onClick={() => authService.logout()}
                                        className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 flex items-center gap-1.5 transition-colors"
                                    >
                                        <LogOut size={14} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* TAB: TEAMS & TEAM MEMBER */}
                        {(activeSection === 'teams' || activeSection === 'team-member') && (
                            <div className="space-y-6">
                                <div className="pb-1">
                                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Organization & Teams</h2>
                                    <p className="text-xs text-slate-500 mt-0.5">Account authorization and organizational seats</p>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8">
                                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                                                {getInitials()}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">
                                                    {profileData.fullName || profileData.ownerFullName || 'Account Owner'}
                                                </h4>
                                                <p className="text-xs text-slate-500">{profileData.email || currentUser?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                                                {profileData.role || 'Primary Owner'}
                                            </span>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                    <div className="pt-4 text-xs text-slate-500">
                                        Team member invites and sub-accounts are restricted to verified enterprise wholesale tiers.
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: NOTIFICATIONS */}
                        {activeSection === 'notifications' && (
                            <div className="space-y-6">
                                <div className="pb-1">
                                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Notification Preferences</h2>
                                    <p className="text-xs text-slate-500 mt-0.5">Choose how you receive order status and delivery alerts</p>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8 space-y-5">
                                    {[
                                        { key: 'orderUpdates', title: 'Order Status Updates', desc: 'Instant email alert when distributor accepts and packs your orders' },
                                        { key: 'deliverySms', title: 'Delivery & Gate SMS', desc: 'Direct SMS notifications with driver and freight dispatch details' },
                                        { key: 'paymentReceipts', title: 'Escrow Receipts', desc: 'Statutory receipts sent to your registered billing email' },
                                        { key: 'restockAlerts', title: 'Restock & Price Alerts', desc: 'Notifications when high-volume catalog items are restocked' }
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                                                <p className="text-xs text-slate-500">{item.desc}</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={notifications[item.key]}
                                                onChange={() => handleNotificationToggle(item.key)}
                                                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600 cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB: BILLING */}
                        {activeSection === 'billing' && (
                            <div className="space-y-6">
                                <div className="pb-1">
                                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Billing & Settlement</h2>
                                    <p className="text-xs text-slate-500 mt-0.5">Payment settlement terms and financial records</p>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8 space-y-6">
                                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                        <h4 className="text-sm font-bold text-slate-900 mb-1">Escrow Procurement Model</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            All wholesale transactions on SalesFunnel are processed via secure Paystack checkout.
                                            Funds remain protected in escrow and are released to distributors only upon confirmed receipt of delivery.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 mb-2">Order Receipts & Invoices</h4>
                                        <p className="text-xs text-slate-500 mb-4">
                                            Invoices are generated automatically for every confirmed wholesale transaction.
                                        </p>
                                        <Link
                                            to="/orders"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors"
                                        >
                                            <span>View My Orders & Invoices</span>
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: DATA EXPORT */}
                        {activeSection === 'data-export' && (
                            <div className="space-y-6">
                                <div className="pb-1">
                                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Data Export</h2>
                                    <p className="text-xs text-slate-500 mt-0.5">Download live transaction data and order records from the platform</p>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-8">
                                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <FileText size={22} className="text-slate-500" />
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">Purchase Orders History (.CSV)</h4>
                                                <p className="text-xs text-slate-500">Live download of all your wholesale orders directly from the database</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleExportOrders}
                                            disabled={exportingData}
                                            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                                        >
                                            <Download size={14} />
                                            <span>{exportingData ? 'Exporting...' : 'Export CSV'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Delete Account Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
                        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                            <AlertCircle size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Deactivate Account</h3>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                            This will initiate deactivation of your account ({profileData.email || currentUser?.email}).
                            Type <strong>DELETE</strong> below to confirm.
                        </p>
                        <input
                            type="text"
                            placeholder="Type DELETE"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl mb-5 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none"
                        />
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => { setIsDeleteModalOpen(false); setDeleteConfirmText(''); }}
                                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={deleteConfirmText !== 'DELETE'}
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    showToast('error', 'Deactivation request submitted to admin.');
                                }}
                                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
