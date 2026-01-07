export default function Features() {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 md:text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl mb-6 animate-pulse">
                        Run your business on <span className="text-primary underline decoration-wavy decoration-accent decoration-2 underline-offset-4">autopilot</span>
                    </h2>
                    <p className="text-xl text-slate-600 font-medium">
                        We bridge the gap between supply and demand with technology built specifically for the Nigerian market's unique needs.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-8 relative max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#E88B73] p-10 shadow-lg transition-all hover:scale-[1.02] w-full lg:w-[350px] aspect-square z-10 lg:-mr-12 lg:mt-0">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-12 h-12 rounded border border-white/40 flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest mb-6">
                                Auto
                            </div>
                            <div>
                                <h3 className="mb-4 text-4xl font-black text-white leading-tight">Instant Bank Transfers</h3>
                                <p className="text-white/80 font-medium text-lg leading-relaxed">Direct Naira (₦) payments with automated receipt generation and zero transaction delays.</p>
                            </div>
                            <div className="mt-auto pt-4 flex justify-end">
                                <span className="text-white/90 text-sm font-semibold">salesfunnel.ng</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 - Center (Larger) */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#FACC73] p-10 shadow-xl transition-all hover:scale-[1.02] w-full lg:w-[380px] aspect-square z-20 lg:mt-24 lg:-mr-12">
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-12 h-12 rounded border border-black/10 flex items-center justify-center text-slate-800 text-xs font-bold uppercase tracking-widest mb-6">
                                Live
                            </div>
                            <div>
                                <h3 className="mb-4 text-4xl font-black text-slate-900 leading-tight">Real-time Tracking</h3>
                                <p className="text-slate-800/80 font-medium text-lg leading-relaxed">Live map view of drivers, ETA updates via SMS, and digital proof of delivery.</p>
                            </div>
                            <div className="mt-auto pt-4 flex justify-end">
                                <span className="text-slate-900/60 text-sm font-semibold">salesfunnel.ng</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#4B4B4B] p-10 shadow-lg transition-all hover:scale-[1.02] w-full lg:w-[350px] aspect-square z-10 lg:mt-48">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-12 h-12 rounded border border-white/20 flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest mb-6">
                                Safe
                            </div>
                            <div>
                                <h3 className="mb-4 text-4xl font-black text-white leading-tight">Secure Payments</h3>
                                <p className="text-white/70 font-medium text-lg leading-relaxed">Bank-grade data security, funds held in escrow, and dedicated dispute resolution.</p>
                            </div>
                            <div className="mt-auto pt-4 flex justify-end">
                                <span className="text-white/50 text-sm font-semibold">salesfunnel.ng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
