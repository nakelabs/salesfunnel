import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OnboardingFlow = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [userType, setUserType] = useState('');

    const [formData, setFormData] = useState({
        userType: '',
        businessName: '',
        cacNumber: '',
        businessAddress: '',
        businessPhone: '',
        businessEmail: '',
        tin: '',
        taxDocument: null,
        ownerFullName: '',
        ownerPhone: '',
        ownerEmail: '',
        bankName: '',
        accountName: '',
        accountNumber: '',
        cacCertificate: null,
        tinCertificate: null,
        utilityBill: null,
        idType: '',
        idDocument: null,
    });

    const steps = [
        { number: 1, title: 'User Type Selection', description: 'Choose your account type' },
        { number: 2, title: 'Company Information', description: 'Business details' },
        { number: 3, title: 'Tax & Compliance', description: 'Tax registration' },
        { number: 4, title: 'Owner Details', description: 'Director information' },
        { number: 5, title: 'Bank Details', description: 'Payment account' },
        { number: 6, title: 'Verification Documents', description: 'Upload documents' },
        { number: 7, title: 'ID Verification', description: 'Identity verification' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData({ ...formData, [name]: files[0] });
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(currentStep + 1);
                setIsAnimating(false);
            }, 150);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(currentStep - 1);
                setIsAnimating(false);
            }, 150);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Onboarding completed:', formData);
        navigate('/pending-approval');
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <Step1UserType formData={formData} setFormData={setFormData} setUserType={setUserType} />;
            case 2:
                return <Step2CompanyInfo formData={formData} handleChange={handleChange} />;
            case 3:
                return <Step3TaxCompliance formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />;
            case 4:
                return <Step4OwnerDetails formData={formData} handleChange={handleChange} />;
            case 5:
                return <Step5BankDetails formData={formData} handleChange={handleChange} />;
            case 6:
                return <Step6Documents formData={formData} handleFileChange={handleFileChange} />;
            case 7:
                return <Step7IDVerification formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Left Sidebar - Progress */}
            <div className="hidden lg:flex lg:w-80 bg-white border-r border-slate-200 flex-col">
                {/* Logo */}
                <div className="p-8 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="size-10 text-primary">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>SalesFunnel</h2>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex-1 p-8">
                    <p className="text-sm font-semibold text-slate-500 mb-6">Our journey to setting up your workspace and company portal</p>

                    <div className="space-y-1">
                        {steps.map((step) => (
                            <div key={step.number} className="flex items-start gap-4 py-4">
                                {/* Icon/Number */}
                                <div className="flex-shrink-0">
                                    {currentStep > step.number ? (
                                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-lg">check</span>
                                        </div>
                                    ) : currentStep === step.number ? (
                                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                            <span className="text-white font-bold">{step.number}</span>
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <span className="text-slate-400 font-bold">{step.number}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Text */}
                                <div className="flex-1 pt-2">
                                    <p className={`text-sm font-semibold ${currentStep >= step.number ? 'text-slate-900' : 'text-slate-400'}`}>
                                        {step.title}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between lg:hidden">
                    <div className="flex items-center gap-2">
                        <div className="size-8 text-primary">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <span className="font-black">SalesFunnel</span>
                    </div>
                    <a href="#" className="text-sm text-primary font-semibold">Help Assistant</a>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    <div className="max-w-3xl mx-auto p-8 py-12">
                        {/* Step Indicator */}
                        <p className="text-sm font-semibold text-primary mb-2">STEP {currentStep} OF {steps.length}</p>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                                {renderStepContent()}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between mt-12 pt-8">
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    disabled={currentStep === 1}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${currentStep === 1
                                        ? 'text-slate-300 cursor-not-allowed'
                                        : 'text-slate-700 hover:text-slate-900'
                                        }`}
                                >
                                    ← Back
                                </button>

                                {currentStep < steps.length ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-all"
                                    >
                                        Save and continue →
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all"
                                    >
                                        Complete setup →
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Step Components remain similar but with updated styling
const Step1UserType = ({ formData, setFormData, setUserType }) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    Select your account type
                </h1>
                <p className="text-slate-600">Choose the option that best describes your business</p>
            </div>

            <div className="space-y-4 mt-8">
                <button
                    type="button"
                    onClick={() => {
                        setFormData({ ...formData, userType: 'wholesaler' });
                        setUserType('wholesaler');
                    }}
                    className={`w-full p-6 rounded-xl border-2 text-left transition-all ${formData.userType === 'wholesaler'
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 hover:border-slate-300'
                        }`}
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <span className="material-symbols-outlined text-3xl text-primary">shopping_cart</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Wholesaler (Buyer)</h3>
                            <p className="text-sm text-slate-600">I want to purchase products in bulk from distributors</p>
                        </div>
                        {formData.userType === 'wholesaler' && (
                            <span className="material-symbols-outlined text-primary">radio_button_checked</span>
                        )}
                    </div>
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setFormData({ ...formData, userType: 'distributor' });
                        setUserType('distributor');
                    }}
                    className={`w-full p-6 rounded-xl border-2 text-left transition-all ${formData.userType === 'distributor'
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 hover:border-slate-300'
                        }`}
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <span className="material-symbols-outlined text-3xl text-primary">store</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Distributor (Seller)</h3>
                            <p className="text-sm text-slate-600">I want to sell products to wholesalers</p>
                        </div>
                        {formData.userType === 'distributor' && (
                            <span className="material-symbols-outlined text-primary">radio_button_checked</span>
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
};

const Step2CompanyInfo = ({ formData, handleChange }) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    Company information
                </h1>
                <p className="text-slate-600">Provide your registered business details</p>
            </div>

            <div className="space-y-5 mt-8">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Registered Business Name *
                    </label>
                    <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Enter your registered business name"
                        required
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            CAC Registration Number *
                        </label>
                        <input
                            type="text"
                            name="cacNumber"
                            value={formData.cacNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="RC123456"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Business Phone Number *
                        </label>
                        <input
                            type="tel"
                            name="businessPhone"
                            value={formData.businessPhone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="+234 XXX XXX XXXX"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Business Email *
                    </label>
                    <input
                        type="email"
                        name="businessEmail"
                        value={formData.businessEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="business@company.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Business Address *
                    </label>
                    <textarea
                        name="businessAddress"
                        value={formData.businessAddress}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Enter your complete business address"
                        required
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

const Step3TaxCompliance = ({ formData, handleChange, handleFileChange }) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    Tax & compliance
                </h1>
                <p className="text-slate-600">Provide your tax information for compliance</p>
            </div>

            <div className="space-y-5 mt-8">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Tax Identification Number (TIN) *
                    </label>
                    <input
                        type="text"
                        name="tin"
                        value={formData.tin}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Enter your TIN"
                        required
                    />
                    <p className="mt-1.5 text-xs text-slate-500">Your company's Tax Identification Number</p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Tax Registration Document *
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                        <input
                            type="file"
                            name="taxDocument"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="taxDocument"
                            required
                        />
                        <label htmlFor="taxDocument" className="cursor-pointer">
                            <div className="flex flex-col items-center gap-3">
                                <span className="material-symbols-outlined text-5xl text-slate-300">upload_file</span>
                                <p className="text-sm font-semibold text-slate-700">
                                    {formData.taxDocument ? formData.taxDocument.name : 'Click to upload tax registration document'}
                                </p>
                                <p className="text-xs text-slate-500">PDF, JPG, or PNG (Max 5MB)</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Step4OwnerDetails = ({ formData, handleChange }) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    Owner/Director details
                </h1>
                <p className="text-slate-600">Information about the business owner or director</p>
            </div>

            <div className="space-y-5 mt-8">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        name="ownerFullName"
                        value={formData.ownerFullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Enter full name of owner/director"
                        required
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            name="ownerPhone"
                            value={formData.ownerPhone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="+234 XXX XXX XXXX"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            name="ownerEmail"
                            value={formData.ownerEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            placeholder="owner@example.com"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Step5BankDetails = ({ formData, handleChange }) => {
    const nigerianBanks = [
        'Access Bank', 'Citibank', 'Ecobank Nigeria', 'Fidelity Bank', 'First Bank of Nigeria',
        'First City Monument Bank (FCMB)', 'Globus Bank', 'Guaranty Trust Bank (GTBank)',
        'Heritage Bank', 'Keystone Bank', 'Polaris Bank', 'Providus Bank', 'Stanbic IBTC Bank',
        'Standard Chartered Bank', 'Sterling Bank', 'SunTrust Bank', 'Union Bank of Nigeria',
        'United Bank for Africa (UBA)', 'Unity Bank', 'Wema Bank', 'Zenith Bank'
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    Bank details
                </h1>
                <p className="text-slate-600">Provide your bank account details for payments</p>
            </div>

            <div className="space-y-5 mt-8">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Bank Name *
                    </label>
                    <select
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        required
                    >
                        <option value="">Select your bank</option>
                        {nigerianBanks.map((bank) => (
                            <option key={bank} value={bank}>{bank}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Account Name *
                    </label>
                    <input
                        type="text"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Account name as registered with bank"
                        required
                    />
                    <p className="mt-1.5 text-xs text-slate-500">Must match your business name</p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Account Number *
                    </label>
                    <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="XXXXXXXXXX"
                        maxLength="10"
                        pattern="[0-9]{10}"
                        required
                    />
                    <p className="mt-1.5 text-xs text-slate-500">10-digit account number</p>
                </div>
            </div>
        </div>
    );
};

const Step6Documents = ({ formData, handleFileChange }) => {
    const FileUploadBox = ({ name, label, fileName }) => (
        <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
                {label} *
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                    type="file"
                    name={name}
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id={name}
                    required
                />
                <label htmlFor={name} className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                        <span className="material-symbols-outlined text-4xl text-slate-300">upload_file</span>
                        <p className="text-sm font-semibold text-slate-700">
                            {fileName ? fileName : 'Click to upload'}
                        </p>
                        <p className="text-xs text-slate-500">PDF, JPG, PNG (Max 5MB)</p>
                    </div>
                </label>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    Verification documents
                </h1>
                <p className="text-slate-600">Upload the required business documents</p>
            </div>

            <div className="space-y-5 mt-8">
                <FileUploadBox
                    name="cacCertificate"
                    label="CAC Certificate"
                    fileName={formData.cacCertificate?.name}
                />

                <FileUploadBox
                    name="tinCertificate"
                    label="TIN Certificate"
                    fileName={formData.tinCertificate?.name}
                />

                <FileUploadBox
                    name="utilityBill"
                    label="Utility Bill (Proof of Address)"
                    fileName={formData.utilityBill?.name}
                />
            </div>
        </div>
    );
};

const Step7IDVerification = ({ formData, handleChange, handleFileChange }) => {
    const idTypes = [
        { value: 'nin', label: 'National Identification Number (NIN)' },
        { value: 'voters_card', label: "Voter's Card" },
        { value: 'international_passport', label: 'International Passport' },
        { value: 'drivers_license', label: "Driver's License" }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    ID verification
                </h1>
                <p className="text-slate-600">Upload a valid government-issued ID</p>
            </div>

            <div className="space-y-5 mt-8">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        ID Type *
                    </label>
                    <select
                        name="idType"
                        value={formData.idType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        required
                    >
                        <option value="">Select ID type</option>
                        {idTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Upload ID Document *
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                        <input
                            type="file"
                            name="idDocument"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            id="idDocument"
                            required
                        />
                        <label htmlFor="idDocument" className="cursor-pointer">
                            <div className="flex flex-col items-center gap-3">
                                <span className="material-symbols-outlined text-5xl text-slate-300">badge</span>
                                <p className="text-sm font-semibold text-slate-700">
                                    {formData.idDocument ? formData.idDocument.name : 'Click to upload ID document'}
                                </p>
                                <p className="text-xs text-slate-500">PDF, JPG, or PNG (Max 5MB)</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                    <div className="flex gap-3">
                        <span className="material-symbols-outlined text-green-600">verified_user</span>
                        <div className="text-sm text-green-900">
                            <p className="font-semibold mb-1">Almost Done!</p>
                            <p className="text-green-800">
                                After submitting your application, our team will review your information.
                                You'll receive an email notification once your account is approved (typically within 24-48 hours).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingFlow;
