import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Replace with actual authentication
        console.log('Login attempt:', credentials);
        // For now, just navigate to admin dashboard
        navigate('/admin/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <div className="flex flex-col items-center mb-8">
                        <img src="/images/logo.png" alt="SalesFunnel" className="h-20 w-auto mb-4" />
                        <p className="text-sm text-slate-500 mt-1">Internal Staff Portal</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                placeholder="admin@salesfunnel.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                                />
                                <span className="text-sm text-slate-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-semibold text-primary hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg active:scale-95"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Security Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <span className="material-symbols-outlined text-amber-600 text-[20px]">lock</span>
                        <div>
                            <p className="text-sm font-semibold text-amber-900">Authorized Access Only</p>
                            <p className="text-xs text-amber-700 mt-1">
                                This portal is restricted to SalesFunnel internal staff. All activities are logged and monitored.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back to Main Site */}
                <div className="text-center mt-6">
                    <Link to="/" className="text-sm text-slate-500 hover:text-primary transition-colors">
                        ← Back to main site
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
