import React from 'react';
import { Link } from 'react-router-dom';

const DistributorDashboard = () => {
    return (
        <div className="bg-background-light font-display text-slate-900 antialiased selection:bg-primary/30 min-h-screen flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-5xl">store</span>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
                    Distributor Dashboard
                </h1>

                {/* Message */}
                <p className="text-lg text-slate-600 mb-8">
                    Welcome to your distributor portal! This dashboard is currently under construction.
                </p>

                {/* Features Coming Soon */}
                <div className="bg-slate-50 rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Coming Soon:</h2>
                    <ul className="space-y-3 text-left">
                        <li className="flex items-start gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                            <span className="text-slate-700">Manage your product inventory and pricing</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                            <span className="text-slate-700">View and fulfill wholesaler orders</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                            <span className="text-slate-700">Track payments and revenue analytics</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                            <span className="text-slate-700">Manage delivery logistics and schedules</span>
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-blue-600 transition-colors"
                    >
                        Back to Home
                    </Link>
                    <a
                        href="#"
                        className="px-8 py-3 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold hover:border-primary hover:text-primary transition-colors"
                    >
                        Contact Support
                    </a>
                </div>

                {/* Footer Note */}
                <p className="text-sm text-slate-500 mt-8">
                    We're working hard to bring you the best distributor experience. Stay tuned!
                </p>
            </div>
        </div>
    );
};

export default DistributorDashboard;
