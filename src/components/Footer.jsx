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
                        <span className="text-green-500 text-2xl">•</span>
                        <span className="text-white text-4xl md:text-5xl font-black tracking-tight">ORDER</span>
                        <span className="text-green-500 text-2xl">•</span>
                        <span className="text-white text-4xl md:text-5xl font-black tracking-tight">SELL</span>
                        <span className="text-green-500 text-2xl">•</span>
                    </div>
                    {/* Duplicate for seamless loop */}
                    <div className="flex items-center gap-8 pr-8">
                        <span className="text-white text-4xl md:text-5xl font-black tracking-tight">SIGN UP</span>
                        <span className="text-green-500 text-2xl">•</span>
                        <span className="text-white text-4xl md:text-5xl font-black tracking-tight">ORDER</span>
                        <span className="text-green-500 text-2xl">•</span>
                        <span className="text-white text-4xl md:text-5xl font-black tracking-tight">SELL</span>
                        <span className="text-green-500 text-2xl">•</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black text-white pt-20 pb-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                        <div className="lg:col-span-5">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent text-white shadow-lg">
                                    <span className="material-symbols-outlined text-[24px]">inventory_2</span>
                                </div>
                                <span className="text-2xl font-black tracking-tight text-white">SalesFunnel</span>
                            </div>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
                                Secure your business. Simplify orders. Connect your supply chain. The modern standard for B2B commerce in Nigeria.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/signup" className="px-8 py-4 bg-[#d4ff00] text-black font-black border-4 border-black hover:scale-105 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] skew-x-[-12deg] animate-pulse text-center">
                                    <span className="block skew-x-[12deg]">Sign up as Distributor</span>
                                </Link>
                                <Link to="/signup" className="px-8 py-4 bg-[#d4ff00] text-black font-black border-4 border-black hover:scale-105 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] skew-x-[-12deg] text-center">
                                    <span className="block skew-x-[12deg]">Sign up as Wholesaler</span>
                                </Link>
                            </div>
                            <p className="text-slate-500 text-sm mt-12">
                                © 2024 SalesFunnel NG. Made for Lagos with ❤️.
                                <br />(RC: 8420460)
                            </p>
                        </div>

                        <div className="lg:col-start-7 lg:col-span-2">
                            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Product</h4>
                            <ul className="space-y-4">
                                <li><a className="text-slate-400 hover:text-white transition-colors" href="#">For Distributors</a></li>
                                <li><a className="text-slate-400 hover:text-white transition-colors" href="#">For Wholesalers</a></li>
                                <li><a className="text-slate-400 hover:text-white transition-colors" href="#">Pricing Plan (₦)</a></li>
                                <li><a className="text-slate-400 hover:text-white transition-colors" href="#">Download App</a></li>
                                <li><Link to="/login" className="text-slate-400 hover:text-white transition-colors">Login</Link></li>
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
                                className="h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-all shadow-lg shadow-green-500/30"
                            >
                                <span className="material-symbols-outlined">arrow_upward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
