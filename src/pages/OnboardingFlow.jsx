import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OnboardingFlow = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [userType, setUserType] = useState(''); // 'wholesaler' or 'distributor'

    const [formData, setFormData] = useState({
        // Step 1: User Type Selection (already done in signup)
        userType: '',

        // Step 2: Company Information
        businessName: '',
        cacNumber: '',
        businessAddress: '',
        businessPhone: '',
        businessEmail: '',

        // Step 3: Tax & Compliance
        tin: '',
        taxDocument: null,

        // Step 4: Owner/Director Details
        ownerFullName: '',
        ownerPhone: '',
        ownerEmail: '',

        // Step 5: Bank Details
        bankName: '',
        accountName: '',
        accountNumber: '',

        // Step 6: Verification Documents
        cacCertificate: null,
        tinCertificate: null,
        utilityBill: null,

        // Step 7: Individual ID
        idType: '',
        idDocument: null,
    });

    const steps = [
        { number: 1, title: 'User Type', icon: 'person' },
        { number: 2, title: 'Company Info', icon: 'business' },
        { number: 3, title: 'Tax & Compliance', icon: 'receipt_long' },
        { number: 4, title: 'Owner Details', icon: 'badge' },
        { number: 5, title: 'Bank Details', icon: 'account_balance' },
        { number: 6, title: 'Documents', icon: 'upload_file' },
        { number: 7, title: 'ID Verification', icon: 'verified_user' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        }
    };

    const handleNext = () => {
        // Add validation here
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Onboarding completed:', formData);
        // Submit to backend
        // After submission, navigate to pending approval page
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
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-4 lg:px-10">
                <div className="flex items-center gap-4 text-slate-900">
                    <div className="size-8 text-primary">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-tight">SalesFunnel</h2>
                </div>
                <div className="hidden sm:flex text-sm font-medium text-slate-500">
                    <span>Need help? <a className="text-primary hover:underline" href="#">Contact Support</a></span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 flex-col py-10 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-4xl">
                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            {steps.map((step, index) => (
                                <React.Fragment key={step.number}>
                                    <div className="flex flex-col items-center">
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${currentStep >= step.number
                                            ? 'bg-primary border-primary text-white'
                                            : 'bg-white border-slate-300 text-slate-400'
                                            }`}>
                                            {currentStep > step.number ? (
                                                <span className="material-symbols-outlined text-lg">check</span>
                                            ) : (
                                                <span className="material-symbols-outlined text-lg">{step.icon}</span>
                                            )}
                                        </div>
                                        <span className={`text-xs mt-2 hidden md:block ${currentStep >= step.number ? 'text-primary font-bold' : 'text-slate-400'
                                            }`}>
                                            {step.title}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-2 transition-all ${currentStep > step.number ? 'bg-primary' : 'bg-slate-300'
                                            }`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-slate-500">
                                Step {currentStep} of {steps.length}
                            </p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
                        <form onSubmit={handleSubmit}>
                            {renderStepContent()}

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    disabled={currentStep === 1}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${currentStep === 1
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                                    Previous
                                </button>

                                {currentStep < steps.length ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-all shadow hover:shadow-md"
                                    >
                                        Next
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all shadow hover:shadow-md"
                                    >
                                        <span className="material-symbols-outlined text-lg">check_circle</span>
                                        Submit Application
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Help Text */}
                    <div className="mt-6 text-center text-sm text-slate-500">
                        <p>All fields marked with * are required. Your information is secure and encrypted.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Step 1: User Type Selection
const Step1UserType = ({ formData, setFormData, setUserType }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Select Your Account Type</h2>
                <p className="text-slate-500">Choose the option that best describes your business</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => {
                        setFormData({ ...formData, userType: 'wholesaler' });
                        setUserType('wholesaler');
                    }}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${formData.userType === 'wholesaler'
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 hover:border-slate-300'
                        }`}
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <span className="material-symbols-outlined text-3xl text-primary">shopping_cart</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Wholesaler (Buyer)</h3>
                            <p className="text-sm text-slate-500">I want to purchase products in bulk from distributors</p>
                            <ul className="mt-3 space-y-1 text-xs text-slate-600">
                                <li className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                                    Browse products from verified distributors
                                </li>
                                <li className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                                    Place bulk orders
                                </li>
                                <li className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                                    Track orders and shipments
                                </li>
                            </ul>
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
                    className={`p-6 rounded-xl border-2 text-left transition-all ${formData.userType === 'distributor'
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 hover:border-slate-300'
                        }`}
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <span className="material-symbols-outlined text-3xl text-primary">store</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Distributor (Seller)</h3>
                            <p className="text-sm text-slate-500">I want to sell products to wholesalers</p>
                            <ul className="mt-3 space-y-1 text-xs text-slate-600">
                                <li className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                                    List products for wholesale
                                </li>
                                <li className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                                    Manage inventory and pricing
                                </li>
                                <li className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                                    Receive orders from buyers
                                </li>
                            </ul>
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

// Step 2: Company Information
const Step2CompanyInfo = ({ formData, handleChange }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Company Information</h2>
                <p className="text-slate-500">Provide your registered business details</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        Registered Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Enter your registered business name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        CAC Registration Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="cacNumber"
                        value={formData.cacNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="RC123456"
                        required
                    />
                </div>

                <div>
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        Business Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="businessPhone"
                        value={formData.businessPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="+234 XXX XXX XXXX"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        Business Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="businessEmail"
                        value={formData.businessEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="business@company.com"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        Business Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="businessAddress"
                        value={formData.businessAddress}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Enter your complete business address"
                        required
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

// Step 3: Tax & Compliance
const Step3TaxCompliance = ({ formData, handleChange, handleFileChange }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Tax & Compliance</h2>
                <p className="text-slate-500">Provide your tax information for compliance</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        Tax Identification Number (TIN) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="tin"
                        value={formData.tin}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Enter your TIN"
                        required
                    />
                    <p className="mt-1 text-xs text-slate-500">Your company's Tax Identification Number</p>
                </div>

                <div>
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        Tax Registration Document <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
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
                            <div className="flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-4xl text-slate-400">upload_file</span>
                                <p className="text-sm font-medium text-slate-700">
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

// Step 4: Owner/Director Details
const Step4OwnerDetails = ({ formData, handleChange }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Owner/Director Details</h2>
                <p className="text-slate-500">Information about the business owner or director</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="ownerFullName"
                        value={formData.ownerFullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Enter full name of owner/director"
                        required
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-slate-900 text-sm font-medium mb-2">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="ownerPhone"
                            value={formData.ownerPhone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            placeholder="+234 XXX XXX XXXX"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-slate-900 text-sm font-medium mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="ownerEmail"
                            value={formData.ownerEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            placeholder="owner@example.com"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Step 5: Bank Details
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
                <h2 className="text-2xl font-black text-slate-900 mb-2">Bank Details</h2>
                <p className="text-slate-500">Provide your bank account details for payments</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        Bank Name <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        required
                    >
                        <option value="">Select your bank</option>
                        {nigerianBanks.map((bank) => (
                            <option key={bank} value={bank}>{bank}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        Account Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Account name as registered with bank"
                        required
                    />
                    <p className="mt-1 text-xs text-slate-500">Must match your business name</p>
                </div>

                <div>
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="XXXXXXXXXX"
                        maxLength="10"
                        pattern="[0-9]{10}"
                        required
                    />
                    <p className="mt-1 text-xs text-slate-500">10-digit account number</p>
                </div>
            </div>
        </div>
    );
};

// Step 6: Verification Documents
const Step6Documents = ({ formData, handleFileChange }) => {
    const FileUploadBox = ({ name, label, fileName }) => (
        <div>
            <label className="block text-slate-900 text-sm font-medium mb-2">
                {label} <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
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
                        <span className="material-symbols-outlined text-3xl text-slate-400">upload_file</span>
                        <p className="text-sm font-medium text-slate-700">
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
                <h2 className="text-2xl font-black text-slate-900 mb-2">Verification Documents</h2>
                <p className="text-slate-500">Upload the required business documents</p>
            </div>

            <div className="space-y-4">
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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                    <span className="material-symbols-outlined text-blue-600">info</span>
                    <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">Document Requirements:</p>
                        <ul className="list-disc list-inside space-y-1 text-blue-800">
                            <li>All documents must be clear and legible</li>
                            <li>Documents should not be older than 3 months (utility bill)</li>
                            <li>File formats: PDF, JPG, or PNG only</li>
                            <li>Maximum file size: 5MB per document</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Step 7: ID Verification
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
                <h2 className="text-2xl font-black text-slate-900 mb-2">ID Verification</h2>
                <p className="text-slate-500">Upload a valid government-issued ID</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        ID Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="idType"
                        value={formData.idType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        required
                    >
                        <option value="">Select ID type</option>
                        {idTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-slate-900 text-sm font-medium mb-2">
                        Upload ID Document <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
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
                            <div className="flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-4xl text-slate-400">badge</span>
                                <p className="text-sm font-medium text-slate-700">
                                    {formData.idDocument ? formData.idDocument.name : 'Click to upload ID document'}
                                </p>
                                <p className="text-xs text-slate-500">PDF, JPG, or PNG (Max 5MB)</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
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
