import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/auth.service';
import {
    Building2,
    UserCheck,
    CreditCard,
    FileCheck,
    CheckCircle2,
    AlertCircle,
    UploadCloud,
    FileText,
    Trash2,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    Store,
    ShoppingCart
} from 'lucide-react';

const nigerianBanks = [
    'Access Bank',
    'Citibank Nigeria',
    'Ecobank Nigeria',
    'Fidelity Bank',
    'First Bank of Nigeria',
    'First City Monument Bank (FCMB)',
    'Globus Bank',
    'Guaranty Trust Bank (GTBank)',
    'Heritage Bank',
    'Jaiz Bank',
    'Keystone Bank',
    'Kuda Bank',
    'Moniepoint MFB',
    'Opay',
    'Palmpay',
    'Parallex Bank',
    'Polaris Bank',
    'PremiumTrust Bank',
    'Providus Bank',
    'Stanbic IBTC Bank',
    'Standard Chartered Bank',
    'Sterling Bank',
    'SunTrust Bank',
    'Taj Bank',
    'Titan Trust Bank',
    'Union Bank of Nigeria',
    'United Bank for Africa (UBA)',
    'Unity Bank',
    'Wema Bank',
    'Zenith Bank'
];

const OnboardingFlow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state?.initialData || {};

    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    // Form data state
    const [formData, setFormData] = useState({
        userType: initialData.userType || 'wholesaler',
        businessName: initialData.businessName || '',
        cacNumber: initialData.cacNumber || '',
        businessAddress: initialData.businessAddress || '',
        businessPhone: initialData.businessPhone || '',
        businessEmail: initialData.businessEmail || initialData.email || '',
        tin: initialData.tin || '',
        ownerFullName: initialData.ownerFullName || initialData.fullName || '',
        ownerPhone: initialData.ownerPhone || initialData.phone || '',
        ownerEmail: initialData.ownerEmail || initialData.email || '',
        bankName: initialData.bankName || '',
        accountName: initialData.accountName || '',
        accountNumber: initialData.accountNumber || '',
        cacCertificate: null,
        tinCertificate: null,
        utilityBill: null,
        idType: initialData.idType || 'nin',
        idDocument: null,
        password: initialData.password || '',
    });

    const steps = [
        {
            number: 1,
            title: 'Business Identity',
            description: 'Account type & registered company info',
            icon: Building2
        },
        {
            number: 2,
            title: 'Director Details',
            description: 'Owner & authorized signatory contact',
            icon: UserCheck
        },
        {
            number: 3,
            title: 'Settlement & Tax',
            description: 'TIN & verified payout bank account',
            icon: CreditCard
        },
        {
            number: 4,
            title: 'Compliance Documents',
            description: 'Statutory verification documents',
            icon: FileCheck
        }
    ];

    // Real-time field validation logic
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'businessName':
                if (!value || !value.trim()) error = 'Registered business name is required';
                else if (value.trim().length < 2) error = 'Business name must be at least 2 characters';
                break;
            case 'cacNumber':
                if (!value || !value.trim()) error = 'CAC registration number is required';
                else if (value.trim().length < 3) error = 'Enter a valid CAC number (e.g. RC-123456)';
                break;
            case 'businessAddress':
                if (!value || !value.trim()) error = 'Physical warehouse or business address is required';
                break;
            case 'businessPhone':
                if (!value || !value.trim()) error = 'Business phone number is required';
                else if (!/^(\+?234|0)[789][01]\d{8}$/.test(value.replace(/\s+/g, '')) && value.replace(/\D/g, '').length < 10) {
                    error = 'Enter a valid phone number (e.g. 08012345678)';
                }
                break;
            case 'businessEmail':
                if (!value || !value.trim()) error = 'Business email address is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) error = 'Enter a valid email address';
                break;
            case 'ownerFullName':
                if (!value || !value.trim()) error = 'Director/Owner full name is required';
                break;
            case 'ownerPhone':
                if (!value || !value.trim()) error = 'Director phone number is required';
                else if (!/^(\+?234|0)[789][01]\d{8}$/.test(value.replace(/\s+/g, '')) && value.replace(/\D/g, '').length < 10) {
                    error = 'Enter a valid phone number';
                }
                break;
            case 'ownerEmail':
                if (!value || !value.trim()) error = 'Director email address is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) error = 'Enter a valid email address';
                break;
            case 'tin':
                if (!value || !value.trim()) error = 'Tax Identification Number (TIN) is required';
                break;
            case 'bankName':
                if (!value || !value.trim()) error = 'Please select your commercial bank';
                break;
            case 'accountName':
                if (!value || !value.trim()) error = 'Bank account name is required';
                break;
            case 'accountNumber':
                if (!value || !value.trim()) error = '10-digit NUBAN account number is required';
                else if (!/^\d{10}$/.test(value.trim())) error = 'Account number must be exactly 10 digits';
                break;
            default:
                break;
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error immediately if valid
        const error = validateField(name, value);
        setFieldErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setFieldErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleFileChange = (name, file) => {
        if (!file) return;

        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            setFieldErrors(prev => ({
                ...prev,
                [name]: 'File size exceeds 10MB limit. Please upload a smaller file.'
            }));
            return;
        }

        // Check file extension
        const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
        const ext = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(ext)) {
            setFieldErrors(prev => ({
                ...prev,
                [name]: 'Unsupported format. Please upload a PDF, PNG, or JPG document.'
            }));
            return;
        }

        // Clear error & set file
        setFieldErrors(prev => ({ ...prev, [name]: '' }));
        setFormData(prev => ({ ...prev, [name]: file }));
    };

    const removeFile = (name) => {
        setFormData(prev => ({ ...prev, [name]: null }));
    };

    // Step-gate validator: Ensures current step is completely valid before proceeding
    const validateStep = (stepNumber) => {
        const errors = {};
        const stepFields = [];

        if (stepNumber === 1) {
            stepFields.push('businessName', 'cacNumber', 'businessPhone', 'businessEmail', 'businessAddress');
        } else if (stepNumber === 2) {
            stepFields.push('ownerFullName', 'ownerPhone', 'ownerEmail');
        } else if (stepNumber === 3) {
            stepFields.push('tin', 'bankName', 'accountName', 'accountNumber');
        } else if (stepNumber === 4) {
            if (!formData.cacCertificate) errors.cacCertificate = 'CAC Certificate document is required';
            if (!formData.tinCertificate) errors.tinCertificate = 'Tax registration certificate is required';
            if (!formData.utilityBill) errors.utilityBill = 'Proof of address / Utility bill is required';
        }

        stepFields.forEach(field => {
            const err = validateField(field, formData[field]);
            if (err) errors[field] = err;
        });

        // Mark all fields of this step as touched
        const touchedUpdate = {};
        stepFields.forEach(f => { touchedUpdate[f] = true; });
        setTouchedFields(prev => ({ ...prev, ...touchedUpdate }));

        setFieldErrors(prev => ({ ...prev, ...errors }));
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        setGlobalError('');
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setGlobalError('Please review and correct the highlighted fields before proceeding.');
        }
    };

    const handlePrevious = () => {
        setGlobalError('');
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGlobalError('');

        // Validate final step
        if (!validateStep(4)) {
            setGlobalError('Please upload all required verification documents.');
            return;
        }

        setIsLoading(true);

        try {
            const submissionData = new FormData();

            submissionData.append('password', formData.password || 'Temporary@123');
            submissionData.append('business_name', formData.businessName.trim());
            submissionData.append('cac_registration_number', formData.cacNumber.trim());
            submissionData.append('business_address', formData.businessAddress.trim());
            submissionData.append('business_phone', formData.businessPhone.trim());
            submissionData.append('business_email', formData.businessEmail.trim());
            submissionData.append('tin', formData.tin.trim());
            submissionData.append('owner_full_name', formData.ownerFullName.trim());
            submissionData.append('owner_phone', formData.ownerPhone.trim());
            submissionData.append('owner_email', formData.ownerEmail.trim());
            submissionData.append('bank_name', formData.bankName.trim());
            submissionData.append('account_name', formData.accountName.trim());
            submissionData.append('account_number', formData.accountNumber.trim());

            if (formData.cacCertificate) submissionData.append('cac_certificate', formData.cacCertificate);
            if (formData.tinCertificate) submissionData.append('tin_certificate', formData.tinCertificate);
            if (formData.utilityBill) submissionData.append('utility_bill', formData.utilityBill);
            if (formData.idDocument) submissionData.append('id_document', formData.idDocument);

            await authService.register(submissionData, formData.userType);
            navigate('/pending-approval');
        } catch (err) {
            console.error('Onboarding registration error:', err);
            let errorMessage = 'Registration failed. Please check your information and try again.';

            if (err.response?.data?.detail) {
                const detail = err.response.data.detail;
                if (Array.isArray(detail)) {
                    errorMessage = detail.map(e => e.msg || 'Invalid field').join(', ');
                } else if (typeof detail === 'string') {
                    errorMessage = detail;
                }
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }

            setGlobalError(errorMessage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsLoading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    };

    return (
        <div
            className="min-h-screen bg-[#f8fafc] text-slate-900 font-display flex flex-col lg:flex-row antialiased"
            style={{ fontFamily: '"Google Sans", "Plus Jakarta Sans", system-ui, sans-serif' }}
        >
            {/* Left Sidebar - Brand & Progress Tracker */}
            <aside className="w-full lg:w-[360px] xl:w-[400px] bg-white border-b lg:border-b-0 lg:border-r border-slate-200/80 p-6 lg:p-10 flex flex-col justify-between shrink-0">
                <div>
                    {/* Brand Logo */}
                    <div className="flex items-center justify-between mb-8 lg:mb-12">
                        <Link to="/" className="inline-flex items-center gap-2">
                            <img src="/images/logo.png" alt="SalesFunnel" className="h-8 w-auto object-contain" />
                        </Link>
                        <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600 border border-slate-200 uppercase tracking-wider">
                            Setup
                        </span>
                    </div>

                    {/* Step Timeline */}
                    <div className="space-y-1">
                        {steps.map((step) => {
                            const isCurrent = currentStep === step.number;
                            const isCompleted = currentStep > step.number;
                            const IconComponent = step.icon;

                            return (
                                <div
                                    key={step.number}
                                    className={`flex items-start gap-3.5 p-3 rounded-2xl transition-all ${
                                        isCurrent ? 'bg-blue-50/70 border border-blue-100' : 'opacity-80'
                                    }`}
                                >
                                    <div
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                                            isCompleted
                                                ? 'bg-emerald-600 text-white shadow-xs'
                                                : isCurrent
                                                ? 'bg-slate-900 text-white shadow-xs'
                                                : 'bg-slate-100 text-slate-400 border border-slate-200'
                                        }`}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 size={18} className="stroke-[2.5]" />
                                        ) : (
                                            <span className="text-xs font-bold">{step.number}</span>
                                        )}
                                    </div>
                                    <div className="pt-0.5">
                                        <h4
                                            className={`text-sm font-bold tracking-tight ${
                                                isCurrent
                                                    ? 'text-blue-900'
                                                    : isCompleted
                                                    ? 'text-slate-900'
                                                    : 'text-slate-500'
                                            }`}
                                        >
                                            {step.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 leading-tight mt-0.5">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Trust Footer */}
                <div className="hidden lg:flex items-center gap-2.5 pt-8 mt-8 border-t border-slate-100 text-xs text-slate-400">
                    <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                    <span>Bank-grade 256-bit SSL encrypted verification</span>
                </div>
            </aside>

            {/* Right Main Form Container */}
            <main className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-4xl mx-auto w-full">
                <div className="w-full">
                    {/* Top Step Counter & Back Link */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80">
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                            Step {currentStep} of {steps.length}
                        </div>
                        <Link
                            to="/login"
                            className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            Already registered? <span className="font-bold underline">Sign in</span>
                        </Link>
                    </div>

                    {/* Global Error Alert Banner */}
                    {globalError && (
                        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3 text-xs leading-relaxed animate-in fade-in duration-200">
                            <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-600" />
                            <div>
                                <span className="font-bold block">Application Notice</span>
                                <span>{globalError}</span>
                            </div>
                        </div>
                    )}

                    {/* STEP 1: BUSINESS PROFILE & ACCOUNT TYPE */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                    Business Identity
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    Select your participation model and enter registered enterprise credentials.
                                </p>
                            </div>

                            {/* User Type Selection Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div
                                    onClick={() => setFormData(prev => ({ ...prev, userType: 'wholesaler' }))}
                                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                                        formData.userType === 'wholesaler'
                                            ? 'border-blue-600 bg-blue-50/20 shadow-2xs'
                                            : 'border-slate-200 hover:border-slate-300 bg-white'
                                    }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                            formData.userType === 'wholesaler'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-slate-100 text-slate-600'
                                        }`}
                                    >
                                        <ShoppingCart size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h4 className="text-sm font-bold text-slate-900">Wholesale Merchant</h4>
                                            {formData.userType === 'wholesaler' && (
                                                <div className="w-2 h-2 rounded-full bg-blue-600" />
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                            Procure catalog products in bulk with escrow protection.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setFormData(prev => ({ ...prev, userType: 'distributor' }))}
                                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                                        formData.userType === 'distributor'
                                            ? 'border-blue-600 bg-blue-50/20 shadow-2xs'
                                            : 'border-slate-200 hover:border-slate-300 bg-white'
                                    }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                            formData.userType === 'distributor'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-slate-100 text-slate-600'
                                        }`}
                                    >
                                        <Store size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h4 className="text-sm font-bold text-slate-900">Distributor / Supplier</h4>
                                            {formData.userType === 'distributor' && (
                                                <div className="w-2 h-2 rounded-full bg-blue-600" />
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                            List verified inventory, receive bulk orders, and dispatch.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Inputs Grid */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-5 shadow-2xs">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Registered Company / Business Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="businessName"
                                        value={formData.businessName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="e.g. Adebayo Wholesale Logistics Ltd"
                                        className={`w-full px-4 py-3 text-sm rounded-xl border transition-all outline-none ${
                                            touchedFields.businessName && fieldErrors.businessName
                                                ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500/20'
                                                : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                                        }`}
                                    />
                                    {touchedFields.businessName && fieldErrors.businessName && (
                                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                                            <AlertCircle size={13} />
                                            {fieldErrors.businessName}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            CAC Registration Number *
                                        </label>
                                        <input
                                            type="text"
                                            name="cacNumber"
                                            value={formData.cacNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="RC-1234567 or BN-987654"
                                            className={`w-full px-4 py-3 text-sm rounded-xl border font-mono transition-all outline-none ${
                                                touchedFields.cacNumber && fieldErrors.cacNumber
                                                    ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500/20'
                                                    : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                                            }`}
                                        />
                                        {touchedFields.cacNumber && fieldErrors.cacNumber && (
                                            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                                                <AlertCircle size={13} />
                                                {fieldErrors.cacNumber}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Official Business Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            name="businessPhone"
                                            value={formData.businessPhone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="08012345678"
                                            className={`w-full px-4 py-3 text-sm rounded-xl border transition-all outline-none ${
                                                touchedFields.businessPhone && fieldErrors.businessPhone
                                                    ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500/20'
                                                    : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                                            }`}
                                        />
                                        {touchedFields.businessPhone && fieldErrors.businessPhone && (
                                            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                                                <AlertCircle size={13} />
                                                {fieldErrors.businessPhone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Corporate Business Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="businessEmail"
                                        value={formData.businessEmail}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="procurement@company.com"
                                        className={`w-full px-4 py-3 text-sm rounded-xl border transition-all outline-none ${
                                            touchedFields.businessEmail && fieldErrors.businessEmail
                                                ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500/20'
                                                : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                                        }`}
                                    />
                                    {touchedFields.businessEmail && fieldErrors.businessEmail && (
                                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                                            <AlertCircle size={13} />
                                            {fieldErrors.businessEmail}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Warehouse / Delivery Facility Address *
                                    </label>
                                    <textarea
                                        rows={2}
                                        name="businessAddress"
                                        value={formData.businessAddress}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Plot / Street number, Industrial Area / City, State"
                                        className={`w-full px-4 py-3 text-sm rounded-xl border transition-all outline-none resize-none ${
                                            touchedFields.businessAddress && fieldErrors.businessAddress
                                                ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500/20'
                                                : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                                        }`}
                                    />
                                    {touchedFields.businessAddress && fieldErrors.businessAddress && (
                                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                                            <AlertCircle size={13} />
                                            {fieldErrors.businessAddress}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: DIRECTOR / SIGNATORY DETAILS */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                    Director & Authorized Signatory
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    Provide the contact details of the legal representative or primary procurement director.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-5 shadow-2xs">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Director Full Legal Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="ownerFullName"
                                        value={formData.ownerFullName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="e.g. Michael Chukwuemeka"
                                        className={`w-full px-4 py-3 text-sm rounded-xl border transition-all outline-none ${
                                            touchedFields.ownerFullName && fieldErrors.ownerFullName
                                                ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500/20'
                                                : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                                        }`}
                                    />
                                    {touchedFields.ownerFullName && fieldErrors.ownerFullName && (
                                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                                            <AlertCircle size={13} />
                                            {fieldErrors.ownerFullName}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Director Direct Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            name="ownerPhone"
                                            value={formData.ownerPhone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="08023456789"
                                            className={`w-full px-4 py-3 text-sm rounded-xl border transition-all outline-none ${
                                                touchedFields.ownerPhone && fieldErrors.ownerPhone
                                                    ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500/20'
                                                    : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                                            }`}
                                        />
                                        {touchedFields.ownerPhone && fieldErrors.ownerPhone && (
                                            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                                                <AlertCircle size={13} />
                                                {fieldErrors.ownerPhone}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Director Direct Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="ownerEmail"
                                            value={formData.ownerEmail}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="director@company.com"
                                            className={`w-full px-4 py-3 text-sm rounded-xl border transition-all outline-none ${
                                                touchedFields.ownerEmail && fieldErrors.ownerEmail
                                                    ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500/20'
                                                    : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                                            }`}
                                        />
                                        {touchedFields.ownerEmail && fieldErrors.ownerEmail && (
                                            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                                                <AlertCircle size={13} />
                                                {fieldErrors.ownerEmail}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: SETTLEMENT BANK & TAX */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                    Settlement & Tax Identification
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    Enter your Tax Identification Number (TIN) and verified corporate NUBAN payout account.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-5 shadow-2xs">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Tax Identification Number (TIN) *
                                    </label>
                                    <input
                                        type="text"
                                        name="tin"
                                        value={formData.tin}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="e.g. 22839401-0001"
                                        className={`w-full px-4 py-3 text-sm rounded-xl border font-mono transition-all outline-none ${
                                            touchedFields.tin && fieldErrors.tin
                                                ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500/20'
                                                : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                                        }`}
                                    />
                                    {touchedFields.tin && fieldErrors.tin && (
                                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                                            <AlertCircle size={13} />
                                            {fieldErrors.tin}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            Financial Institution / Bank *
                                        </label>
                                        <select
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`w-full px-4 py-3 text-sm rounded-xl border transition-all outline-none bg-white ${
                                                touchedFields.bankName && fieldErrors.bankName
                                                    ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500/20'
                                                    : 'border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                                            }`}
                                        >
                                            <option value="">Select commercial bank...</option>
                                            {nigerianBanks.map(b => (
                                                <option key={b} value={b}>{b}</option>
                                            ))}
                                        </select>
                                        {touchedFields.bankName && fieldErrors.bankName && (
                                            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                                                <AlertCircle size={13} />
                                                {fieldErrors.bankName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                            10-Digit NUBAN Account Number *
                                        </label>
                                        <input
                                            type="text"
                                            name="accountNumber"
                                            maxLength={10}
                                            value={formData.accountNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="0123456789"
                                            className={`w-full px-4 py-3 text-sm rounded-xl border font-mono tracking-wider transition-all outline-none ${
                                                touchedFields.accountNumber && fieldErrors.accountNumber
                                                    ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500/20'
                                                    : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                                            }`}
                                        />
                                        {touchedFields.accountNumber && fieldErrors.accountNumber && (
                                            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                                                <AlertCircle size={13} />
                                                {fieldErrors.accountNumber}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Account Holder Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="accountName"
                                        value={formData.accountName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Must match your registered business or director name"
                                        className={`w-full px-4 py-3 text-sm rounded-xl border transition-all outline-none ${
                                            touchedFields.accountName && fieldErrors.accountName
                                                ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500/20'
                                                : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10'
                                        }`}
                                    />
                                    {touchedFields.accountName && fieldErrors.accountName && (
                                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                                            <AlertCircle size={13} />
                                            {fieldErrors.accountName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: COMPLIANCE DOCUMENTS */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                    Compliance & Verification Documents
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    Upload clear copies of statutory registrations. Supported formats: PDF, PNG, JPG (Max 10MB per file).
                                </p>
                            </div>

                            <div className="space-y-4">
                                {/* CAC Certificate Upload */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <span className="text-xs font-bold text-slate-900">
                                                CAC Certificate of Incorporation *
                                            </span>
                                            <p className="text-[11px] text-slate-400">Proof of legal registration in Nigeria</p>
                                        </div>
                                        {formData.cacCertificate && (
                                            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                                                <CheckCircle2 size={12} /> Ready
                                            </span>
                                        )}
                                    </div>

                                    {formData.cacCertificate ? (
                                        <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <FileText size={18} className="text-blue-600 shrink-0" />
                                                <div className="truncate">
                                                    <span className="text-xs font-bold text-slate-900 block truncate">
                                                        {formData.cacCertificate.name}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400">
                                                        {formatFileSize(formData.cacCertificate.size)}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile('cacCertificate')}
                                                className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                                                title="Remove file"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className={`block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                                            fieldErrors.cacCertificate
                                                ? 'border-rose-400 bg-rose-50/20'
                                                : 'border-slate-200 hover:border-blue-400 bg-slate-50/40'
                                        }`}>
                                            <input
                                                type="file"
                                                accept=".pdf,.png,.jpg,.jpeg"
                                                onChange={(e) => handleFileChange('cacCertificate', e.target.files?.[0])}
                                                className="hidden"
                                            />
                                            <UploadCloud size={24} className="mx-auto text-slate-400 mb-1.5" />
                                            <span className="text-xs font-bold text-slate-700 block">
                                                Click to upload CAC Certificate
                                            </span>
                                            <span className="text-[11px] text-slate-400">PDF, PNG, or JPG</span>
                                        </label>
                                    )}
                                    {fieldErrors.cacCertificate && (
                                        <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                                            <AlertCircle size={13} />
                                            {fieldErrors.cacCertificate}
                                        </p>
                                    )}
                                </div>

                                {/* TIN Certificate Upload */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <span className="text-xs font-bold text-slate-900">
                                                Tax Clearance or TIN Registration Document *
                                            </span>
                                            <p className="text-[11px] text-slate-400">Official FIRS or state revenue certificate</p>
                                        </div>
                                        {formData.tinCertificate && (
                                            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                                                <CheckCircle2 size={12} /> Ready
                                            </span>
                                        )}
                                    </div>

                                    {formData.tinCertificate ? (
                                        <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <FileText size={18} className="text-blue-600 shrink-0" />
                                                <div className="truncate">
                                                    <span className="text-xs font-bold text-slate-900 block truncate">
                                                        {formData.tinCertificate.name}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400">
                                                        {formatFileSize(formData.tinCertificate.size)}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile('tinCertificate')}
                                                className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                                                title="Remove file"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className={`block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                                            fieldErrors.tinCertificate
                                                ? 'border-rose-400 bg-rose-50/20'
                                                : 'border-slate-200 hover:border-blue-400 bg-slate-50/40'
                                        }`}>
                                            <input
                                                type="file"
                                                accept=".pdf,.png,.jpg,.jpeg"
                                                onChange={(e) => handleFileChange('tinCertificate', e.target.files?.[0])}
                                                className="hidden"
                                            />
                                            <UploadCloud size={24} className="mx-auto text-slate-400 mb-1.5" />
                                            <span className="text-xs font-bold text-slate-700 block">
                                                Click to upload Tax / TIN Document
                                            </span>
                                            <span className="text-[11px] text-slate-400">PDF, PNG, or JPG</span>
                                        </label>
                                    )}
                                    {fieldErrors.tinCertificate && (
                                        <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                                            <AlertCircle size={13} />
                                            {fieldErrors.tinCertificate}
                                        </p>
                                    )}
                                </div>

                                {/* Utility Bill Upload */}
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <span className="text-xs font-bold text-slate-900">
                                                Utility Bill / Proof of Physical Address *
                                            </span>
                                            <p className="text-[11px] text-slate-400">Electricity, water bill, or tenancy agreement within last 3 months</p>
                                        </div>
                                        {formData.utilityBill && (
                                            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                                                <CheckCircle2 size={12} /> Ready
                                            </span>
                                        )}
                                    </div>

                                    {formData.utilityBill ? (
                                        <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <FileText size={18} className="text-blue-600 shrink-0" />
                                                <div className="truncate">
                                                    <span className="text-xs font-bold text-slate-900 block truncate">
                                                        {formData.utilityBill.name}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400">
                                                        {formatFileSize(formData.utilityBill.size)}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile('utilityBill')}
                                                className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                                                title="Remove file"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className={`block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                                            fieldErrors.utilityBill
                                                ? 'border-rose-400 bg-rose-50/20'
                                                : 'border-slate-200 hover:border-blue-400 bg-slate-50/40'
                                        }`}>
                                            <input
                                                type="file"
                                                accept=".pdf,.png,.jpg,.jpeg"
                                                onChange={(e) => handleFileChange('utilityBill', e.target.files?.[0])}
                                                className="hidden"
                                            />
                                            <UploadCloud size={24} className="mx-auto text-slate-400 mb-1.5" />
                                            <span className="text-xs font-bold text-slate-700 block">
                                                Click to upload Utility Bill
                                            </span>
                                            <span className="text-[11px] text-slate-400">PDF, PNG, or JPG</span>
                                        </label>
                                    )}
                                    {fieldErrors.utilityBill && (
                                        <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                                            <AlertCircle size={13} />
                                            {fieldErrors.utilityBill}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Step Actions */}
                <div className="pt-8 mt-8 border-t border-slate-200/80 flex items-center justify-between">
                    {currentStep > 1 ? (
                        <button
                            type="button"
                            onClick={handlePrevious}
                            className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-2 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>Previous Step</span>
                        </button>
                    ) : (
                        <div />
                    )}

                    {currentStep < steps.length ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                        >
                            <span>Save & Continue</span>
                            <ArrowRight size={16} />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Submitting Application...</span>
                                </>
                            ) : (
                                <>
                                    <span>Submit Application for Approval</span>
                                    <CheckCircle2 size={16} />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default OnboardingFlow;
