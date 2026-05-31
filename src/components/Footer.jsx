import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <section className="px-4 sm:px-6 lg:px-8 pb-8 bg-[#f5f4f0]">
            <div className="max-w-7xl mx-auto bg-[#0f0f14] rounded-[3rem] px-8 py-12 sm:p-14 lg:p-20 flex flex-col">
                
                {/* Top Section: CTA */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                    <h2 className="text-5xl sm:text-6xl font-bold text-white max-w-md tracking-tight leading-[1.05]" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Run your supply chain better.
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <Link
                            to="/signup"
                            className="w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-black text-white font-bold text-sm border border-[#3b82f6] px-8 py-4 hover:bg-[#0d1a2d] tracking-widest uppercase transition-all"
                            style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)' }}
                        >
                            Register Your Business Free
                        </Link>
                        <a
                            href="mailto:hello@salesfunnel.ng"
                            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 text-white font-bold text-sm border border-white/20 px-8 py-4 hover:border-white/50 tracking-wide uppercase transition-all"
                            style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)' }}
                        >
                            Talk to the team
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/10 my-16 lg:my-20"></div>

                {/* Middle Section: Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-8">
                    {/* Contact */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#818cf8] mb-6">Contact</h4>
                        <div className="space-y-4">
                            <a href="mailto:hello@salesfunnel.ng" className="block text-white font-bold text-sm hover:text-[#818cf8] transition-colors">
                                hello@salesfunnel.ng
                            </a>
                            <p className="text-white font-bold text-sm leading-relaxed">
                                Lagos, Nigeria
                                <br />
                                Victoria Island, 101241
                            </p>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#818cf8] mb-6">Explore</h4>
                        <div className="space-y-4">
                            <Link to="/" className="block text-white text-sm hover:text-[#818cf8] transition-colors">Home</Link>
                            <Link to="/platform" className="block text-white text-sm hover:text-[#818cf8] transition-colors">Platform</Link>
                            <Link to="/faq" className="block text-white text-sm hover:text-[#818cf8] transition-colors">FAQ</Link>
                        </div>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#818cf8] mb-6">Socials</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all text-white">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all text-white">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-white/60 text-xs font-medium">
                        © 2026 SalesFunnel NG Ltd. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-white/60 hover:text-white text-xs font-medium transition-colors">Privacy Policy</a>
                        <a href="#" className="text-white/60 hover:text-white text-xs font-medium transition-colors">Terms of Service</a>
                    </div>
                </div>

            </div>
        </section>
    );
}
