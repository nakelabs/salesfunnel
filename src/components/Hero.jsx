import { Link } from 'react-router-dom';





export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">



            {/* Main hero content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center pt-32 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="max-w-xl">
                    {/* Badge
                    <div className="mb-6 animate-[fadeIn_0.8s_ease-out]">
                        <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-800 text-xs font-bold rounded-full px-4 py-1.5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
                            #1 B2B Platform in Nigeria
                        </span>
                    </div> */}

                    {/* Main Heading */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black uppercase tracking-tight leading-[1.05] mb-6 animate-[fadeIn_1s_ease-out]" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Restock Faster.
                        <br />
                        Manage. Sell&nbsp;More.
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-600 font-medium text-base sm:text-lg mb-10 leading-relaxed animate-[fadeIn_1.2s_ease-out]">
                        SalesFunnel automates restocking and payments for Nigerian businesses speeding up deliveries while keeping your cash flow secure.
                    </p>

                    {/* CTA */}
                    <div className="animate-[fadeIn_1.4s_ease-out]">
                        <Link
                            to="/signup"
                            className="inline-flex items-center gap-2 bg-black text-white font-bold text-sm px-7 py-3.5 border border-[#3b82f6] hover:bg-[#0d1a2d] tracking-widest uppercase transition-all"
                            style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)' }}
                        >
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
}
