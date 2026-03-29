import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const SignUp = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        userType: 'wholesaler',
        password: ''
    });

    // Service highlight cards for continuous slideshow
    const performanceCards = [
        {
            type: 'user',
            name: 'Verified Distributors',
            role: 'Nationwide Network'
        },
        {
            type: 'metric',
            title: 'LOGISTICS',
            value: '2-Hour',
            subtitle: 'Delivery SLA',
            description: 'Lightning-fast delivery for local orders to keep your shelves stocked.',
            chart: 'bar'
        },
        {
            type: 'metric',
            title: 'PAYMENTS',
            value: 'Instant',
            subtitle: 'Settlements',
            description: 'Secure B2B payment processing with automated escrow protection.',
            chart: 'line'
        },
        {
            type: 'user',
            name: 'Direct Sourcing',
            role: 'Zero Middlemen'
        },
        {
            type: 'metric',
            title: 'TRACKING',
            value: 'Real-Time',
            subtitle: 'Order Updates',
            description: 'Track your inventory from the distributor warehouse to your storefront.',
            chart: 'line'
        },
        {
            type: 'metric',
            title: 'CATALOG',
            value: 'Digital',
            subtitle: 'Ordering',
            description: 'Browse wholesale prices and place bulk orders with a single click.',
            chart: 'bar'
        },
        {
            type: 'user',
            name: 'Supply Chain',
            role: 'Management'
        },
        {
            type: 'metric',
            title: 'SUPPORT',
            value: '24/7',
            subtitle: 'Dedicated Help',
            description: 'Round-the-clock support for all your business and supply needs.',
            chart: 'line'
        },
        {
            type: 'metric',
            title: 'NETWORK',
            value: 'Pan-Nigeria',
            subtitle: 'Coverage',
            description: 'Connecting businesses across all states with reliable distribution.',
            chart: 'bar'
        }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleContinue = (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
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
        <div className="flex min-h-screen w-full bg-slate-100">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link to="/" className="inline-flex items-center gap-3 mb-12 group relative z-20">
                        <div className="bg-white border-2 border-black p-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-0.5 transition-all">
                            <img src="/images/logo.png" alt="SalesFunnel" className="h-10 w-auto" />
                        </div>
                    </Link>

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-slate-900 mb-3 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                            {step === 1 ? 'Keep your business organized' : 'Secure your account'}
                        </h1>
                        <p className="text-slate-500 text-base">
                            {step === 1 ? 'Sign up to start your journey with SalesFunnel' : 'Create a strong password to continue'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
                            {error}
                        </div>
                    )}

                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <form onSubmit={handleContinue} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-black text-slate-900 mb-2">
                                    Name*
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all font-bold"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-black text-slate-900 mb-2">
                                    Email*
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all font-bold"
                                />
                            </div>

                            {/* User Type */}
                            <div>
                                <label className="block text-sm font-black text-slate-900 mb-2">
                                    I am a*
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, userType: 'wholesaler' })}
                                        className={`px-4 py-3 font-black text-sm border-2 border-black transition-all ${formData.userType === 'wholesaler'
                                            ? 'bg-[#137fec] text-white rounded-xl shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.2)] translate-y-[2px]'
                                            : 'bg-white text-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                                            }`}
                                    >
                                        Wholesaler
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, userType: 'distributor' })}
                                        className={`px-4 py-3 font-black text-sm border-2 border-black transition-all ${formData.userType === 'distributor'
                                            ? 'bg-[#137fec] text-white rounded-xl shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.2)] translate-y-[2px]'
                                            : 'bg-white text-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                                            }`}
                                    >
                                        Distributor
                                    </button>
                                </div>
                            </div>

                            {/* Continue Button */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-[#137fec] text-white font-black text-lg border-4 border-black rounded-2xl hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all mt-6"
                            >
                                Continue
                            </button>

                            {/* Login Link */}
                            <p className="text-center text-sm text-slate-600 mt-6">
                                Already have an account?{' '}
                                <Link to="/login" className="font-semibold text-slate-900 hover:underline">
                                    Login Here
                                </Link>
                            </p>
                        </form>
                    )}

                    {/* Step 2: Password */}
                    {step === 2 && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Password */}
                            <div>
                                <label className="block text-sm font-black text-slate-900 mb-2">
                                    Password*
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                        minLength={8}
                                        className="w-full px-4 py-3 pr-12 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all font-bold"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 transition-colors p-1 flex items-center justify-center focus:outline-none"
                                        tabIndex="-1"
                                        title={showPassword ? "Hide password" : "Show password"}
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                                <p className="text-xs font-bold text-slate-500 mt-2">Must be at least 8 characters.</p>
                            </div>

                            {/* Create Account Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-[#137fec] text-white font-black text-lg border-4 border-black rounded-2xl hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all mt-6 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>

                            {/* Back Button */}
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full py-4 mt-3 bg-white text-black border-2 border-black font-black text-base rounded-2xl hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            >
                                ← Back
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Right Side - Solid Neo-Brutalist Blue with Continuous Scrolling Cards */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#137fec]">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>

                {/* Continuous Scrolling Container */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <div className="absolute right-12 w-[340px]">
                        {/* First set of cards */}
                        <div className="animate-scroll-up space-y-6">
                            {performanceCards.map((card, index) => (
                                <div key={`card-1-${index}`} className="mb-6">
                                    {card.type === 'user' ? (
                                        <div className="bg-white border-4 border-black rounded-2xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-[#137fec] font-black text-lg shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)]">
                                                {card.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-sm">{card.name}</p>
                                                <p className="text-xs font-bold text-slate-600">{card.role}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                            <p className="text-xs font-bold text-slate-600 tracking-wider mb-2">{card.title}</p>
                                            <h3 className="text-5xl font-black text-slate-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                                {card.value}
                                            </h3>
                                            <p className="text-sm text-slate-600 font-semibold mb-4">{card.subtitle}</p>
                                            <p className="text-xs text-slate-500 leading-relaxed mb-4">{card.description}</p>

                                            {/* Chart Visualization */}
                                            {card.chart === 'line' ? (
                                                <div className="h-24 flex items-end">
                                                    <svg viewBox="0 0 200 80" className="w-full h-full">
                                                        <path
                                                            d="M 0,60 Q 40,50 80,40 T 160,10 L 200,5"
                                                            stroke="#8b5cf6"
                                                            strokeWidth="3"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                        />
                                                        <circle cx="200" cy="5" r="4" fill="#8b5cf6" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div className="h-24 flex items-end gap-2">
                                                    <div className="flex-1 bg-purple-300 rounded-t" style={{ height: '40%' }}></div>
                                                    <div className="flex-1 bg-purple-300 rounded-t" style={{ height: '25%' }}></div>
                                                    <div className="flex-1 bg-purple-400 rounded-t" style={{ height: '60%' }}></div>
                                                    <div className="flex-1 bg-purple-400 rounded-t" style={{ height: '50%' }}></div>
                                                    <div className="flex-1 bg-purple-500 rounded-t" style={{ height: '85%' }}></div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Duplicate set for seamless loop */}
                        <div className="animate-scroll-up-delay space-y-6">
                            {performanceCards.map((card, index) => (
                                <div key={`card-2-${index}`} className="mb-6">
                                    {card.type === 'user' ? (
                                        <div className="bg-white border-4 border-black rounded-2xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-[#137fec] font-black text-lg shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)]">
                                                {card.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-sm">{card.name}</p>
                                                <p className="text-xs font-bold text-slate-600">{card.role}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                            <p className="text-xs font-bold text-slate-600 tracking-wider mb-2">{card.title}</p>
                                            <h3 className="text-5xl font-black text-slate-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                                                {card.value}
                                            </h3>
                                            <p className="text-sm text-slate-600 font-semibold mb-4">{card.subtitle}</p>
                                            <p className="text-xs text-slate-500 leading-relaxed mb-4">{card.description}</p>

                                            {/* Chart Visualization */}
                                            {card.chart === 'line' ? (
                                                <div className="h-24 flex items-end">
                                                    <svg viewBox="0 0 200 80" className="w-full h-full">
                                                        <path
                                                            d="M 0,60 Q 40,50 80,40 T 160,10 L 200,5"
                                                            stroke="#8b5cf6"
                                                            strokeWidth="3"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                        />
                                                        <circle cx="200" cy="5" r="4" fill="#8b5cf6" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div className="h-24 flex items-end gap-2">
                                                    <div className="flex-1 bg-purple-300 rounded-t" style={{ height: '40%' }}></div>
                                                    <div className="flex-1 bg-purple-300 rounded-t" style={{ height: '25%' }}></div>
                                                    <div className="flex-1 bg-purple-400 rounded-t" style={{ height: '60%' }}></div>
                                                    <div className="flex-1 bg-purple-400 rounded-t" style={{ height: '50%' }}></div>
                                                    <div className="flex-1 bg-purple-500 rounded-t" style={{ height: '85%' }}></div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CSS for infinite scroll animation */}
                <style>{`
                    @keyframes scroll-up {
                        0% {
                            transform: translateY(0);
                        }
                        100% {
                            transform: translateY(-100%);
                        }
                    }
                    
                    .animate-scroll-up {
                        animation: scroll-up 45s linear infinite;
                    }
                    
                    .animate-scroll-up-delay {
                        animation: scroll-up 45s linear infinite;
                        transform: translateY(100%);
                    }
                `}</style>
            </div>
        </div>
    );
};

export default SignUp;
