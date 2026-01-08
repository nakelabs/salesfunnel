import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userType: 'wholesaler', // wholesaler or distributor
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login submitted:', formData);

        // After successful login, redirect based on user type
        if (formData.userType === 'wholesaler') {
            navigate('/dashboard'); // Wholesaler dashboard
        } else if (formData.userType === 'distributor') {
            // TODO: Create distributor dashboard
            navigate('/distributor-dashboard'); // Distributor dashboard (to be created)
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleGoogleLogin = () => {
        // Handle Google login
        console.log('Google login clicked');
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
            <main className="flex flex-1 flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex w-full max-w-[960px] flex-col lg:flex-row lg:items-center lg:gap-16">
                    {/* Left Side - Features */}
                    <div className="hidden lg:flex lg:w-1/2 flex-col gap-6">
                        <div className="rounded-xl overflow-hidden shadow-lg h-64 w-full relative">
                            <img
                                alt="Warehouse shelves filled with cardboard boxes"
                                className="absolute inset-0 h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV0U_POfA1dxYD6A7crH-kQDx8Lt6DZxyMomBZOdgnjsmdfg0uPc6ktUXUx3qbjDuc2PQzIHI1XUqrWitcHNgqFcjJmFXnyamKwCyVB5Sg49beQDiY7CVc0Np2pPCHYrFYc5n5dqzezdxrHhRxZBTrKp1qPB-e7f9s-9JECIjNOOgj7S_ZTZAAUnj4qeMXwfYX6Zys25x2CxMrjLO7yPI8Zju3w9drBIDskrArgn0-r2ysoGckLpphbQNPYnQNK-3lDwDasTPBXmB1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                <p className="text-white font-bold text-xl">Streamline your ordering process today.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/10 p-3 text-primary">
                                    <span className="material-symbols-outlined text-2xl">inventory_2</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Real-time Tracking</h3>
                                    <p className="text-slate-500 text-sm">Monitor your stock levels and shipment status instantly.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-primary/10 p-3 text-primary">
                                    <span className="material-symbols-outlined text-2xl">payments</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Instant Transfers</h3>
                                    <p className="text-slate-500 text-sm">Secure and fast payment processing for all orders.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="flex flex-col flex-1 max-w-[480px] w-full mx-auto lg:mx-0 bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
                        <div className="flex flex-col gap-2 mb-8">
                            <p className="text-slate-900 text-3xl font-black leading-tight tracking-tight">Welcome Back</p>
                            <p className="text-slate-500 text-base font-normal">Enter your details to access SalesFunnel.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {/* User Type Selection */}
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-900 text-base font-medium leading-normal">
                                    I am a
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, userType: 'wholesaler' })}
                                        className={`flex items-center justify-center gap-2 h-12 rounded-lg border-2 transition-all ${formData.userType === 'wholesaler'
                                            ? 'border-primary bg-primary/10 text-primary font-bold'
                                            : 'border-slate-300 text-slate-700 hover:border-slate-400'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-xl">shopping_cart</span>
                                        Wholesaler
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, userType: 'distributor' })}
                                        className={`flex items-center justify-center gap-2 h-12 rounded-lg border-2 transition-all ${formData.userType === 'distributor'
                                            ? 'border-primary bg-primary/10 text-primary font-bold'
                                            : 'border-slate-300 text-slate-700 hover:border-slate-400'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-xl">store</span>
                                        Distributor
                                    </button>
                                </div>
                            </div>

                            {/* Email/Username Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-900 text-base font-medium leading-normal">
                                    Email or Username
                                </label>
                                <input
                                    className="form-input flex w-full rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 px-4 placeholder:text-slate-400 text-base"
                                    placeholder="user@example.com"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-slate-900 text-base font-medium leading-normal">
                                        Password
                                    </label>
                                </div>
                                <div className="relative flex w-full items-center">
                                    <input
                                        className="form-input flex w-full rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 pl-4 pr-12 placeholder:text-slate-400 text-base"
                                        placeholder="Enter your password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                <div className="flex justify-end">
                                    <Link to="/forgot-password" className="text-primary hover:text-blue-600 text-sm font-medium leading-normal transition-colors">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center rounded-lg bg-primary h-12 px-5 text-base font-bold text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all mt-2"
                            >
                                Log In
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative flex py-6 items-center">
                            <div className="flex-grow border-t border-slate-200"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">OR</span>
                            <div className="flex-grow border-t border-slate-200"></div>
                        </div>

                        {/* Google Login */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white h-12 px-5 text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <img
                                alt="Google logo"
                                className="w-5 h-5"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55bIRN7OTZATln0jCB_qHRqPQ69n0alwL5eCorn7i2HYJnm6O5XNPQgVnKBccob9AgcGy1Fs2TWcZC4vVmCfwMESJYgadwxcxRsCdYGmnOFRloKbglQxpotTjXrQSZ2DE81oPBf979jZmO5Wi5lXBUdouHRNn2vJRtPOCOGlqm_J1ranc0FTlIRQlpYaKNPP9eQAYwU_CDwO68Ks8nD6nB51Yx-tE1oVVAaYd_O85Mdb1I9aXdlgcwuDyG-Dt6O8WVc30OLz-aR-n"
                            />
                            <span>Continue with Google</span>
                        </button>

                        {/* Sign Up Link */}
                        <div className="flex justify-center gap-2 mt-6">
                            <p className="text-slate-500 text-sm">New to SalesFunnel?</p>
                            <Link to="/signup" className="text-primary hover:underline text-sm font-bold">
                                Create New Account
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Support Link */}
            <div className="lg:hidden flex justify-center py-6 text-sm text-slate-500">
                <a className="flex items-center gap-2" href="#">
                    <span className="material-symbols-outlined text-lg">headset_mic</span>
                    Contact Support
                </a>
            </div>

            {/* Floating Help Button */}
            <div className="fixed bottom-8 right-8 hidden lg:block z-50">
                <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                    <span className="material-symbols-outlined">headset_mic</span>
                    <span className="font-medium">Need Help?</span>
                </button>
            </div>
        </div>
    );
};

export default Login;
