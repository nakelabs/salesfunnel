import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        userType: 'wholesaler',
        password: ''
    });

    // Performance metric cards for continuous slideshow
    const performanceCards = [
        {
            type: 'user',
            name: 'Oluwaseun Adebayo',
            role: 'Wholesaler'
        },
        {
            type: 'metric',
            title: 'WHOLESALERS',
            value: '+8,500',
            subtitle: 'active users',
            description: 'Growing network of verified wholesalers across Nigeria',
            chart: 'line'
        },
        {
            type: 'metric',
            title: 'TRANSACTIONS',
            value: '₦2.5B+',
            subtitle: 'monthly volume',
            description: 'Secure payment processing with instant transfers',
            chart: 'bar'
        },
        {
            type: 'user',
            name: 'Chioma Okafor',
            role: 'Distributor'
        },
        {
            type: 'metric',
            title: 'ORDERS',
            value: '+150k',
            subtitle: 'fulfilled',
            description: 'Orders processed across 12 major product categories',
            chart: 'line'
        },
        {
            type: 'metric',
            title: 'DELIVERY TIME',
            value: '2 Hours',
            subtitle: 'average',
            description: 'Fast turnaround to keep your business moving',
            chart: 'bar'
        },
        {
            type: 'user',
            name: 'Ahmed Ibrahim',
            role: 'Supply Manager'
        },
        {
            type: 'metric',
            title: 'SLA COMPLIANCE',
            value: '+96%',
            subtitle: 'on-time rate',
            description: 'Reliable delivery within our 2-hour promise',
            chart: 'line'
        },
        {
            type: 'metric',
            title: 'DISTRIBUTORS',
            value: '450+',
            subtitle: 'verified',
            description: 'Trusted partners ready to serve nationwide',
            chart: 'bar'
        }
    ];

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
        console.log('Signup submitted:', formData);
        navigate('/onboarding');
    };

    return (
        <div className="flex min-h-screen w-full bg-slate-100">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="size-10 text-primary">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <span className="text-2xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>SalesFunnel</span>
                    </div>

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-slate-900 mb-3 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                            {step === 1 ? 'Keep your business organized' : 'Secure your account'}
                        </h1>
                        <p className="text-slate-500 text-base">
                            {step === 1 ? 'Sign up to start your journey with SalesFunnel' : 'Create a strong password to continue'}
                        </p>
                    </div>

                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <form onSubmit={handleContinue} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Name*
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Email*
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>

                            {/* User Type */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    I am a*
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, userType: 'wholesaler' })}
                                        className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${formData.userType === 'wholesaler'
                                            ? 'bg-primary text-white'
                                            : 'bg-white border border-slate-300 text-slate-700 hover:border-slate-400'
                                            }`}
                                    >
                                        Wholesaler
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, userType: 'distributor' })}
                                        className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${formData.userType === 'distributor'
                                            ? 'bg-primary text-white'
                                            : 'bg-white border border-slate-300 text-slate-700 hover:border-slate-400'
                                            }`}
                                    >
                                        Distributor
                                    </button>
                                </div>
                            </div>

                            {/* Continue Button */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-slate-900 text-white font-bold text-base rounded-lg hover:bg-slate-800 transition-all mt-6"
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
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Password*
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    minLength={8}
                                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                                <p className="text-xs text-slate-500 mt-2">Must be at least 8 characters</p>
                            </div>

                            {/* Create Account Button */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-slate-900 text-white font-bold text-base rounded-lg hover:bg-slate-800 transition-all mt-6"
                            >
                                Create Account
                            </button>

                            {/* Back Button */}
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full py-3 text-slate-600 font-semibold hover:text-slate-900 transition-colors"
                            >
                                ← Back
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Right Side - Gradient with Continuous Scrolling Cards */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500">
                {/* Animated gradient blobs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Continuous Scrolling Container */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <div className="absolute right-12 w-[340px]">
                        {/* First set of cards */}
                        <div className="animate-scroll-up space-y-6">
                            {performanceCards.map((card, index) => (
                                <div key={`card-1-${index}`} className="mb-6">
                                    {card.type === 'user' ? (
                                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
                                                {card.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">{card.name}</p>
                                                <p className="text-xs text-slate-600">{card.role}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
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
                                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
                                                {card.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">{card.name}</p>
                                                <p className="text-xs text-slate-600">{card.role}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
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
