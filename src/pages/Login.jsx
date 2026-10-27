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
    const [showPassword, setShowPassword] = useState(false);

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

    const inputClass =
        "w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

    return (
        <div className="min-h-screen w-full bg-[#f4f4f4] flex p-3 lg:p-4 gap-4">
            {/* Left - Form */}
            <div className="flex-1 flex flex-col px-6 sm:px-12 lg:px-16 py-6">
                {/* Logo */}
                <Link to="/" className="inline-flex items-center gap-3 w-fit">
                    <img src="/images/logo.png" alt="SalesFunnel" className="h-9 w-auto" />
                </Link>

                <div className="flex-1 flex flex-col justify-center w-full max-w-[440px] py-10">
                    <h1 className="text-4xl sm:text-[42px] leading-tight font-normal tracking-tight text-slate-900 mb-3">
                        Sign into your account
                    </h1>
                    <p className="text-slate-500 text-base mb-8">
                        Welcome back. Please enter your details to continue.
                    </p>

                    <div className="bg-white/80 rounded-2xl p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* User Type - segmented control */}
                            <div>
                                <label className="block text-sm text-slate-700 mb-2">I am a</label>
                                <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
                                    {['wholesaler', 'distributor'].map((type) => (
                                        <button
                                            key={type}
                                            id={`login-type-${type}`}
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

                            {/* Email */}
                            <div>
                                <label htmlFor="login-email" className="block text-sm text-slate-700 mb-2">Email</label>
                                <input
                                    id="login-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className={inputClass}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="login-password" className="block text-sm text-slate-700">Password</label>
                                    <Link to="/forgot-password" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
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
                            </div>

                            {/* Submit */}
                            <button
                                id="login-submit"
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 mt-2 bg-[#171717] text-white rounded-full text-[15px] font-medium hover:bg-black active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>
                    </div>

                    <p className="text-sm text-slate-500 mt-8">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-slate-900 hover:underline">
                            Sign up →
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

export default Login;
