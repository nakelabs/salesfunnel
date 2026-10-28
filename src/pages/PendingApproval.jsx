import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, Mail, Headphones, ShieldCheck, ArrowRight } from 'lucide-react';

const PendingApproval = () => {
    return (
        <div
            className="min-h-screen w-full flex flex-col bg-[#f8fafc] text-slate-900 font-display antialiased"
            style={{ fontFamily: '"Google Sans", "Plus Jakarta Sans", system-ui, sans-serif' }}
        >
            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/images/logo.png" alt="SalesFunnel" className="h-8 w-auto object-contain" />
                    </Link>
                    <div className="text-xs text-slate-500 font-medium">
                        Need assistance? <a href="mailto:support@salesfunnel.com" className="text-blue-600 font-semibold hover:underline">Contact Support</a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
                <div className="max-w-xl w-full">
                    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 sm:p-10 text-center">
                        {/* Success Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-2xs">
                            <CheckCircle2 size={32} className="stroke-[2.5]" />
                        </div>

                        {/* Heading */}
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                            Application Submitted
                        </h1>
                        <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
                            Thank you for submitting your wholesale account verification details. Our statutory compliance team is reviewing your documentation.
                        </p>

                        {/* Status Card */}
                        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-6 text-left space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                                <Clock size={16} className="text-blue-600" />
                                <span>Verification Timeline</span>
                            </div>
                            <ul className="text-xs text-slate-600 space-y-2">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                                    <span>CAC & TIN automated registry lookup takes <strong>12-24 hours</strong>.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                                    <span>You will receive an automated confirmation email as soon as your account is activated.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                                    <span>Once approved, wholesale catalog pricing and escrow checkout will be immediately unlocked.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Contact & Support Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
                            <div className="p-4 rounded-xl border border-slate-200 bg-white">
                                <div className="flex items-center gap-2 mb-1">
                                    <Mail size={16} className="text-blue-600" />
                                    <span className="text-xs font-bold text-slate-900">Check Email</span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    We sent an application tracking reference to your registered email.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl border border-slate-200 bg-white">
                                <div className="flex items-center gap-2 mb-1">
                                    <Headphones size={16} className="text-blue-600" />
                                    <span className="text-xs font-bold text-slate-900">Priority Support</span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    Reach our compliance desk at support@salesfunnel.com.
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/"
                                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
                            >
                                <span>Return to Homepage</span>
                                <ArrowRight size={14} />
                            </Link>
                            <Link
                                to="/login"
                                className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center transition-colors"
                            >
                                Sign In with Existing Account
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                        <ShieldCheck size={14} className="text-emerald-600" />
                        <span>SalesFunnel Verified Wholesale Protocol</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PendingApproval;
