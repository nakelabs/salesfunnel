export default function Features() {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 md:text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                        Run your business on <span className="bg-[#137fec] px-2 text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg inline-block rotate-[-2deg]">autopilot</span>
                    </h2>
                    <p className="text-xl text-slate-600 font-medium">
                        We bridge the gap between supply and demand with technology built specifically for the Nigerian market's unique needs.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-8 relative max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className="relative flex flex-col justify-between rounded-3xl bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all w-full lg:w-[350px] aspect-square z-10 lg:-mr-12 lg:mt-0">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-12 h-12 rounded-lg border-2 border-black bg-[#137fec] flex items-center justify-center text-white text-xs font-black uppercase tracking-widest mb-6">
                                Auto
                            </div>
                            <div>
                                <h3 className="mb-4 text-4xl font-black text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>Instant Bank Transfers</h3>
                                <p className="text-slate-600 font-bold text-base leading-relaxed">Direct Naira (₦) payments with automated receipt generation and zero transaction delays.</p>
                            </div>
                            <div className="mt-auto pt-4 flex justify-end">
                                <span className="text-slate-400 text-sm font-bold">salesfunnel.ng</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 - Center (Larger) */}
                    <div className="relative flex flex-col justify-between rounded-3xl bg-[#137fec] border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all w-full lg:w-[380px] aspect-square z-20 lg:mt-24 lg:-mr-12">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-12 h-12 rounded-lg border-2 border-black bg-white flex items-center justify-center text-black text-xs font-black uppercase tracking-widest mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                Live
                            </div>
                            <div>
                                <h3 className="mb-4 text-4xl font-black text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>Real-time Tracking</h3>
                                <p className="text-white font-bold text-base leading-relaxed">Live map view of drivers, ETA updates via SMS, and digital proof of delivery.</p>
                            </div>
                            <div className="mt-auto pt-4 flex justify-end">
                                <span className="text-white/80 text-sm font-bold">salesfunnel.ng</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative flex flex-col justify-between rounded-3xl bg-black border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all w-full lg:w-[350px] aspect-square z-10 lg:mt-48">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="w-12 h-12 rounded-lg border-2 border-[#137fec] bg-black flex items-center justify-center text-[#137fec] text-xs font-black uppercase tracking-widest mb-6">
                                Safe
                            </div>
                            <div>
                                <h3 className="mb-4 text-4xl font-black text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>Secure Payments</h3>
                                <p className="text-slate-300 font-bold text-base leading-relaxed">Bank-grade data security, funds held in escrow, and dedicated dispute resolution.</p>
                            </div>
                            <div className="mt-auto pt-4 flex justify-end">
                                <span className="text-slate-500 text-sm font-bold">salesfunnel.ng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
