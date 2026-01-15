export default function HowItWorks() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-20 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 backdrop-blur-sm border border-primary/20">Simple Process</span>
                    <h2 className="text-4xl font-black tracking-tight text-black sm:text-5xl animate-bounce" style={{ fontFamily: 'var(--font-heading)' }}>
                        How SalesFunnel Works?
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8 max-w-6xl mx-auto lg:h-[480px]">
                    {/* Step 1 */}
                    <div className="relative w-full max-w-[360px] bg-white rounded-3xl p-8 lg:p-10 shadow-2xl transition-all duration-300 transform hover:scale-105 hover:z-20 lg:-rotate-6 lg:translate-y-4 lg:hover:rotate-0 border-2 border-slate-100 flex flex-col h-full lg:h-[420px]">
                        <div className="flex justify-center mb-6">
                            <span className="text-7xl font-black text-accent opacity-30 select-none">01</span>
                        </div>
                        <div className="text-center mt-2 flex-grow flex flex-col">
                            <h3 className="text-3xl font-black text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Sign Up</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">Create your verified wholesaler or distributor account in seconds.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative w-full max-w-[380px] bg-white rounded-3xl p-8 lg:p-10 shadow-2xl z-10 transition-all duration-300 transform hover:scale-105 border-2 border-slate-100 flex flex-col h-full lg:h-[460px]">
                        <div className="flex justify-center mb-6">
                            <span className="text-7xl font-black text-accent opacity-30 select-none">02</span>
                        </div>
                        <div className="text-center mt-2 flex-grow flex flex-col">
                            <h3 className="text-3xl font-black text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Order & Pay</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">Browse products and make secure instant transfers in Naira (₦).</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative w-full max-w-[360px] bg-white rounded-3xl p-8 lg:p-10 shadow-2xl transition-all duration-300 transform hover:scale-105 hover:z-20 lg:rotate-6 lg:translate-y-4 lg:hover:rotate-0 border-2 border-slate-100 flex flex-col h-full lg:h-[420px]">
                        <div className="flex justify-center mb-6">
                            <span className="text-7xl font-black text-accent opacity-30 select-none">03</span>
                        </div>
                        <div className="text-center mt-2 flex-grow flex flex-col">
                            <h3 className="text-3xl font-black text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Go Sell</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">Receive goods in under 2 hours and keep your business moving.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
