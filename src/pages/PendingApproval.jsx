import React from 'react';
import { Link } from 'react-router-dom';

const PendingApproval = () => {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-4 lg:px-10">
                <div className="flex items-center gap-4 text-slate-900">
                    <img src="/images/logo.png" alt="SalesFunnel" className="h-12 w-auto" />
                </div>
                <div className="hidden sm:flex text-sm font-medium text-slate-500">
                    <span>Need help? <a className="text-primary hover:underline" href="#">Contact Support</a></span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-2xl">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl"></div>
                                <div className="relative bg-green-100 rounded-full p-6">
                                    <span className="material-symbols-outlined text-6xl text-green-600">check_circle</span>
                                </div>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                            Application Submitted Successfully!
                        </h1>

                        <p className="text-lg text-slate-600 mb-8">
                            Thank you for submitting your application to join SalesFunnel
                        </p>

                        {/* Status Card */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8 text-left">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-500 rounded-full p-2 mt-1">
                                    <span className="material-symbols-outlined text-white text-xl">schedule</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-blue-900 mb-2">What Happens Next?</h3>
                                    <ul className="space-y-3 text-sm text-blue-800">
                                        <li className="flex items-start gap-2">
                                            <span className="material-symbols-outlined text-blue-600 text-lg mt-0.5">done</span>
                                            <span>Our team will review your application and documents</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="material-symbols-outlined text-blue-600 text-lg mt-0.5">done</span>
                                            <span>We'll verify your business information with relevant authorities</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="material-symbols-outlined text-blue-600 text-lg mt-0.5">done</span>
                                            <span>You'll receive an email notification once your account is approved</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="material-symbols-outlined text-blue-600 text-lg mt-0.5">done</span>
                                            <span>The review process typically takes 24-48 hours</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">Expected Timeline</h3>
                            <div className="flex items-center justify-center gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                                        <span className="material-symbols-outlined text-white">upload</span>
                                    </div>
                                    <span className="text-xs font-medium text-slate-600">Submitted</span>
                                    <span className="text-xs text-slate-500">Now</span>
                                </div>

                                <div className="h-0.5 w-16 bg-slate-300"></div>

                                <div className="flex flex-col items-center">
                                    <div className="bg-slate-300 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                                        <span className="material-symbols-outlined text-slate-600">fact_check</span>
                                    </div>
                                    <span className="text-xs font-medium text-slate-600">Under Review</span>
                                    <span className="text-xs text-slate-500">12-24 hrs</span>
                                </div>

                                <div className="h-0.5 w-16 bg-slate-300"></div>

                                <div className="flex flex-col items-center">
                                    <div className="bg-slate-300 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                                        <span className="material-symbols-outlined text-slate-600">verified</span>
                                    </div>
                                    <span className="text-xs font-medium text-slate-600">Approved</span>
                                    <span className="text-xs text-slate-500">24-48 hrs</span>
                                </div>
                            </div>
                        </div>

                        {/* Info Cards */}
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-slate-50 rounded-lg p-4 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-primary">email</span>
                                    <h4 className="font-bold text-slate-900">Check Your Email</h4>
                                </div>
                                <p className="text-sm text-slate-600">
                                    We've sent a confirmation email with your application reference number.
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-4 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-primary">headset_mic</span>
                                    <h4 className="font-bold text-slate-900">Need Help?</h4>
                                </div>
                                <p className="text-sm text-slate-600">
                                    Contact our support team if you have any questions about your application.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/"
                                className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-all shadow hover:shadow-md"
                            >
                                Return to Homepage
                            </Link>
                            <a
                                href="mailto:support@salesfunnel.com"
                                className="px-8 py-3 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200 transition-all"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-500">
                            <span className="material-symbols-outlined text-xs align-middle">lock</span>
                            {' '}Your information is secure and encrypted. We never share your data with third parties.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-slate-500">
                        © 2026 SalesFunnel. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PendingApproval;
