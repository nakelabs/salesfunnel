import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userType: 'wholesaler',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await authService.login(formData.email, formData.password, formData.userType);

            // Redirect based on user type (assuming successful login)
            if (formData.userType === 'wholesaler') {
                navigate('/dashboard');
            } else if (formData.userType === 'distributor') {
                navigate('/distributor-dashboard');
            }
        } catch (err) {
            console.error('Login failed:', err);
            let errorMessage = 'Login failed. Please check your credentials.';

            // Safely parse potentially complex error objects (like Pydantic validation errors)
            if (err.response?.data?.detail) {
                const detail = err.response.data.detail;
                if (Array.isArray(detail)) {
                    errorMessage = detail.map(e => e.msg || 'Error').join(', ');
                } else if (typeof detail === 'object') {
                    errorMessage = JSON.stringify(detail);
                } else {
                    errorMessage = String(detail);
                }
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Artistic Background */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=2000"
                    alt="Abstract Art"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-amber-900/40"></div>

                {/* Logo */}
                <div className="absolute top-8 left-8 z-10 flex items-center gap-3">
                    <img src="/images/logo.png" alt="SalesFunnel" className="h-14 w-auto" />
                </div>

                {/* Quote/Tagline */}
                <div className="absolute bottom-12 left-8 right-8 z-10">
                    <h3 className="text-4xl font-black text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                        Connecting Nigerian<br />Businesses
                    </h3>
                    <p className="text-white/80 text-lg font-medium max-w-md">
                        Streamline your supply chain with instant payments, real-time tracking, and 2-hour delivery.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 relative overflow-hidden">
                {/* Mobile Logo */}
                <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
                    <img src="/images/logo.png" alt="SalesFunnel" className="h-12 w-auto" />
                </div>

                {/* Form Container */}

                {/* Form Container */}
                <div className="w-full max-w-md relative z-10">
                    <div className="mb-10">
                        <h1 className="text-4xl font-black text-slate-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                            Welcome Back
                        </h1>
                        <p className="text-slate-600 text-lg">Log in to continue your journey</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* User Type Selection */}
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
                                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <div className="flex justify-end mt-2">
                                <Link
                                    to="/forgot-password"
                                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-slate-900 text-white font-bold text-base rounded-lg hover:bg-slate-800 transition-all mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-slate-600 mt-6">
                            New to SalesFunnel?{' '}
                            <Link to="/signup" className="font-semibold text-slate-900 hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
