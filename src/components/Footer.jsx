import { Link } from 'react-router-dom';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* Scrolling Marquee Bar */}
            <div className="w-full bg-black py-8 border-t border-slate-800 relative overflow-hidden">
                <div className="flex whitespace-nowrap animate-marquee">
                    <div className="flex items-center gap-8 pr-8">
                        <span className="text-white text-4xl md:text-5xl font-black tracking-tight">SIGN UP</span>
                        <span className="text-[#137fec] text-2xl">•</span>
                        <span className="text-white text-4xl md:text-5xl font-black tracking-tight">ORDER</span>
                        <span className="text-[#137fec] text-2xl">•</span>
                        <span className="text-white text-4xl md:text-5xl font-black tracking-tight">SELL</span>
                        <span className="text-[#137fec] text-2xl">•</span>
                    </div>
                    {/* Duplicate for seamless loop */}
                    <div className="flex items-center gap-8 pr-8">
                        <span className="text-white text-4xl md:text-5xl font-black tracking-tight">SIGN UP</span>
                        <span className="text-[#137fec] text-2xl">•</span>
                        <span className="text-white text-4xl md:text-5xl font-black tracking-tight">ORDER</span>
                        <span className="text-[#137fec] text-2xl">•</span>
                        <span className="text-white text-4xl md:text-5xl font-black tracking-tight">SELL</span>
                        <span className="text-[#137fec] text-2xl">•</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black text-white pt-20 pb-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                        <div className="lg:col-span-5">
                            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                                <div className="bg-white border-2 border-black p-2 rounded-xl shadow-[4px_4px_0px_0px_#137fec] group-hover:shadow-[6px_6px_0px_0px_#137fec] group-hover:-translate-y-0.5 transition-all">
                                    <img src="/images/logo.png" alt="SalesFunnel" className="h-10 w-auto" />
                                </div>
                            </Link>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
                                Secure your business. Simplify orders. Connect your supply chain. The modern standard for B2B commerce in Nigeria.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/signup?role=distributor" className="px-8 py-4 bg-[#137fec] text-white font-black border-4 border-[#137fec] hover:scale-105 transition-all shadow-[6px_6px_0px_0px_#ffffff] hover:shadow-[8px_8px_0px_0px_#ffffff] skew-x-[-12deg] text-center">
                                    <span className="block skew-x-[12deg]">Sign up as Distributor</span>
                                </Link>
                                <Link to="/signup?role=wholesaler" className="px-8 py-4 bg-transparent text-white font-black border-4 border-white hover:scale-105 transition-all shadow-[6px_6px_0px_0px_#137fec] hover:shadow-[8px_8px_0px_0px_#137fec] skew-x-[-12deg] text-center">
                                    <span className="block skew-x-[12deg]">Sign up as Wholesaler</span>
                                </Link>
                            </div>
                        </div>

                        <div className="lg:col-start-7 lg:col-span-2">
                            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Product</h4>
                            <ul className="space-y-4">
                                <li><a className="text-slate-400 hover:text-white transition-colors" href="#">For Distributors</a></li>
                                <li><a className="text-slate-400 hover:text-white transition-colors" href="#">For Wholesalers</a></li>
                                <li><a className="text-slate-400 hover:text-white transition-colors" href="#">Pricing Plan (₦)</a></li>
                                {/* <li><a className="text-slate-400 hover:text-white transition-colors" href="#">Download App</a></li> */}
                                <li><Link to="/login" className="text-slate-400 hover:text-white transition-colors">Login</Link></li>
                                <li><Link to="/signup" className="text-slate-400 hover:text-white transition-colors">signup</Link></li>
                            </ul>
                        </div>

                        <div className="lg:col-span-2">
                            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Support</h4>
                            <ul className="space-y-4">
                                <li><a className="text-slate-400 hover:text-white transition-colors" href="#">Contact</a></li>
                                <li><a className="text-slate-400 hover:text-white transition-colors" href="#">Privacy Policy</a></li>
                                <li><a className="text-slate-400 hover:text-white transition-colors" href="#">Terms & Conditions</a></li>
                            </ul>
                        </div>

                        <div className="lg:col-span-2 flex flex-col items-start lg:items-end justify-end">
                            <button
                                onClick={scrollToTop}
                                className="h-12 w-12 rounded-full bg-[#137fec] border-2 border-[#137fec] hover:bg-black hover:text-[#137fec] flex items-center justify-center text-white transition-all shadow-[0_0_15px_rgba(19,127,236,0.5)]"
                            >
                                <span className="material-symbols-outlined font-black">arrow_upward</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm text-center md:text-left">
                            © 2026 SalesFunnel NG. Made for Nigeria by SalesFunnel. 
                            <span className="hidden md:inline mx-2">•</span> 
                            <br className="md:hidden" />
                            RC: 9109427
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
