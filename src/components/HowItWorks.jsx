export default function HowItWorks() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-20 text-center">
                    <span className="inline-block py-1 px-3 rounded-md bg-[#137fec] text-white border-2 border-black font-black text-sm mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-widest">Simple Process</span>
                    <h2 className="text-4xl font-black tracking-tight text-black sm:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                        How SalesFunnel Works
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8 max-w-6xl mx-auto lg:h-[480px]">
                    {/* Step 1 */}
                    <div className="relative w-full max-w-[360px] bg-[#137fec] rounded-3xl p-8 lg:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 lg:-rotate-2 border-4 border-black flex flex-col h-full lg:h-[420px]">
                        <div className="flex justify-center mb-6">
                            <span className="text-7xl font-black text-white select-none" style={{ WebkitTextStroke: '2px black' }}>01</span>
                        </div>
                        <div className="text-center mt-2 flex-grow flex flex-col">
                            <h3 className="text-3xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Sign Up</h3>
                            <p className="text-white font-bold text-base leading-relaxed">Create your verified wholesaler or distributor account in seconds.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative w-full max-w-[380px] bg-white rounded-3xl p-8 lg:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 border-4 border-black flex flex-col h-full lg:h-[460px] z-10">
                        <div className="flex justify-center mb-6">
                            <span className="text-7xl font-black text-white select-none" style={{ WebkitTextStroke: '2px black' }}>02</span>
                        </div>
                        <div className="text-center mt-2 flex-grow flex flex-col">
                            <h3 className="text-3xl font-black text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Order & Pay</h3>
                            <p className="text-slate-700 font-bold text-base leading-relaxed">Browse products and make secure instant transfers in Naira (₦).</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative w-full max-w-[360px] bg-black rounded-3xl p-8 lg:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 lg:rotate-2 border-4 border-black flex flex-col h-full lg:h-[420px]">
                        <div className="flex justify-center mb-6">
                            <span className="text-7xl font-black text-black select-none" style={{ WebkitTextStroke: '2px #137fec' }}>03</span>
                        </div>
                        <div className="text-center mt-2 flex-grow flex flex-col">
                            <h3 className="text-3xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Go Sell</h3>
                            <p className="text-slate-300 font-bold text-base leading-relaxed">Receive goods in under 2 hours and keep your business moving.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
