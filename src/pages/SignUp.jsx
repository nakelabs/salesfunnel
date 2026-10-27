import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const inputClass =
    "w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

const SignUp = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        userType: 'wholesaler',
        password: ''
    });
    const [error] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleContinue = (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Instead of registering here, we pass the data to the Onboarding Flow
        // because the backend requires full business details to create the account.
        navigate('/onboarding', {
            state: {
                initialData: {
                    ...formData,
                    // Map fullName to ownerFullName for the onboarding form consistency if needed
                    ownerFullName: formData.fullName,
                    ownerEmail: formData.email
                }
            }
        });
    };

    return (
        <div className="min-h-screen w-full bg-[#f4f4f4] flex p-3 lg:p-4 gap-4">
            {/* Left - Form */}
            <div className="flex-1 flex flex-col px-6 sm:px-12 lg:px-16 py-6">
                {/* Logo */}
                <Link to="/" className="inline-flex items-center gap-3 w-fit">
                    <img src="/images/logo.png" alt="SalesFunnel" className="h-9 w-auto" />
                </Link>

                <div className="flex-1 flex flex-col justify-center w-full max-w-[440px] py-10">
                    {/* Step indicator */}
                    <div className="flex items-center gap-2 mb-6">
                        {[1, 2].map((s) => (
                            <span
                                key={s}
                                className={`h-1.5 rounded-full transition-all duration-300 ${step >= s ? 'w-8 bg-slate-900' : 'w-4 bg-slate-300'}`}
                            />
                        ))}
                        <span className="ml-2 text-xs text-slate-500">Step {step} of 2</span>
                    </div>

                    <h1 className="text-4xl sm:text-[42px] leading-tight font-normal tracking-tight text-slate-900 mb-3">
                        {step === 1 ? 'Create your account' : 'Secure your account'}
                    </h1>
                    <p className="text-slate-500 text-base mb-8">
                        {step === 1
                            ? 'Get started with SalesFunnel in just a few steps.'
                            : 'Create a strong password to continue.'}
                    </p>

                    <div className="bg-white/80 rounded-2xl p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                                {error}
                            </div>
                        )}

                        {/* Step 1: Basic Info */}
                        {step === 1 && (
                            <form onSubmit={handleContinue} className="space-y-5">
                                {/* User Type - segmented control */}
                                <div>
                                    <label className="block text-sm text-slate-700 mb-2">I am a</label>
                                    <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
                                        {['wholesaler', 'distributor'].map((type) => (
                                            <button
                                                key={type}
                                                id={`signup-type-${type}`}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, userType: type })}
                                                className={`h-10 rounded-lg text-sm capitalize transition-all ${formData.userType === type
                                                    ? 'bg-white text-slate-900 shadow-sm font-medium'
                                                    : 'text-slate-500 hover:text-slate-800'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Name */}
                                <div>
                                    <label htmlFor="signup-name" className="block text-sm text-slate-700 mb-2">Full name</label>
                                    <input
                                        id="signup-name"
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="signup-email" className="block text-sm text-slate-700 mb-2">Email</label>
                                    <input
                                        id="signup-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                <button
                                    id="signup-continue"
                                    type="submit"
                                    className="w-full h-12 mt-2 bg-[#171717] text-white rounded-full text-[15px] font-medium hover:bg-black active:scale-[0.99] transition-all"
                                >
                                    Continue
                                </button>
                            </form>
                        )}

                        {/* Step 2: Password */}
                        {step === 2 && (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="signup-password" className="block text-sm text-slate-700 mb-2">Password</label>
                                    <div className="relative">
                                        <input
                                            id="signup-password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            required
                                            minLength={8}
                                            autoFocus
                                            className={`${inputClass} pr-12`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 transition-colors p-1 flex items-center"
                                            tabIndex="-1"
                                            title={showPassword ? "Hide password" : "Show password"}
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                {showPassword ? "visibility_off" : "visibility"}
                                            </span>
                                        </button>
                                    </div>
                                    <p className={`text-xs mt-2 transition-colors ${formData.password.length >= 8 ? 'text-emerald-600' : 'text-slate-500'}`}>
                                        Must be at least 8 characters.
                                    </p>
                                </div>

                                <button
                                    id="signup-submit"
                                    type="submit"
                                    className="w-full h-12 mt-2 bg-[#171717] text-white rounded-full text-[15px] font-medium hover:bg-black active:scale-[0.99] transition-all"
                                >
                                    Create account
                                </button>

                                <button
                                    id="signup-back"
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full h-12 bg-white text-slate-600 border border-slate-200 rounded-full text-[15px] hover:border-slate-300 hover:text-slate-900 transition-all"
                                >
                                    ← Back
                                </button>
                            </form>
                        )}
                    </div>

                    <p className="text-sm text-slate-500 mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-slate-900 hover:underline">
                            Sign in →
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right - Artwork */}
            <div className="hidden lg:block lg:w-1/2 relative rounded-3xl overflow-hidden">
                <img
                    src="/images/image.png"
                    alt="SalesFunnel Platform"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default SignUp;
