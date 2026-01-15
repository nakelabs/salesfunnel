import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="relative pt-32 lg:pt-48 pb-20 overflow-hidden bg-white">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
                <svg className="w-full h-full opacity-30" height="100%" preserveAspectRatio="none" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <path className="connection-line stroke-primary/30" d="M 200,300 C 200,400 400,400 600,600" fill="none" strokeWidth="2"></path>
                    <path className="connection-line stroke-primary/30" d="M 1200,300 C 1200,400 1000,400 800,600" fill="none" strokeWidth="2"></path>
                    <circle cx="200" cy="300" fill="#137fec" r="4"></circle>
                    <circle cx="1200" cy="300" fill="#137fec" r="4"></circle>
                </svg>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                        Restock Faster. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Sell More.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                        SalesFunnel automates restocking and payments for Nigerian businesses, speeding up deliveries while keeping your cash flow secure.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/signup" className="px-10 py-5 rounded-3xl bg-[#d4ff00] text-black font-black text-lg border-4 border-black hover:scale-105 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 animate-pulse">
                            I am a Wholesaler
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                        <Link to="/signup" className="px-10 py-5 rounded-3xl bg-[#d4ff00] text-black font-black text-lg border-4 border-black hover:scale-105 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                            I am a Distributor
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
