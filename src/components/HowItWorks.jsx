export default function HowItWorks() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-20 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 backdrop-blur-sm border border-primary/20">Simple Process</span>
                    <h2 className="text-4xl font-black tracking-tight text-black sm:text-5xl animate-bounce">
                        How SalesFunnel Works?
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8 max-w-6xl mx-auto lg:h-[480px]">
                    {/* Step 1 */}
                    <div className="relative w-full max-w-[360px] bg-black rounded-3xl p-8 lg:p-10 shadow-2xl transition-all duration-300 transform hover:scale-105 hover:z-20 lg:-rotate-6 lg:translate-y-4 lg:hover:rotate-0 border border-white/10 flex flex-col h-full lg:h-[420px]">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <span className="material-symbols-outlined text-accent text-3xl absolute -top-4 -right-4 animate-bounce">star</span>
                                <span className="text-7xl font-black text-white opacity-20 select-none">01</span>
                            </div>
                        </div>
                        <div className="text-center mt-2 flex-grow flex flex-col">
                            <h3 className="text-3xl font-black text-white mb-4">Sign Up</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">Create your verified wholesaler or distributor account in seconds.</p>
                            <div className="mt-auto pt-8">
                                <div className="w-full h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/5 relative overflow-hidden group">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white/20 text-5xl">person_add</span>
                                    </div>
                                    <div className="absolute bottom-2 left-4 h-2 w-16 bg-white/10 rounded-full"></div>
                                    <div className="absolute bottom-2 right-4 h-2 w-8 bg-accent/50 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative w-full max-w-[380px] bg-black rounded-3xl p-8 lg:p-10 shadow-2xl z-10 transition-all duration-300 transform hover:scale-105 border border-white/10 flex flex-col h-full lg:h-[460px]">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <span className="material-symbols-outlined text-green-400 text-3xl absolute -top-4 -right-4 animate-pulse">star</span>
                                <span className="text-7xl font-black text-white opacity-20 select-none">02</span>
                            </div>
                        </div>
                        <div className="text-center mt-2 flex-grow flex flex-col">
                            <h3 className="text-3xl font-black text-white mb-4">Order & Pay</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">Browse products and make secure instant transfers in Naira (₦).</p>
                            <div className="mt-auto pt-8">
                                <div className="w-full h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/5 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center space-x-2">
                                        <div className="h-10 w-16 bg-white/10 rounded border border-white/10 transform -rotate-6"></div>
                                        <div className="h-10 w-16 bg-green-500/20 rounded border border-green-500/30 transform rotate-3 flex items-center justify-center">
                                            <span className="text-green-400 font-bold text-xs">₦</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative w-full max-w-[360px] bg-black rounded-3xl p-8 lg:p-10 shadow-2xl transition-all duration-300 transform hover:scale-105 hover:z-20 lg:rotate-6 lg:translate-y-4 lg:hover:rotate-0 border border-white/10 flex flex-col h-full lg:h-[420px]">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <span className="material-symbols-outlined text-purple-400 text-3xl absolute -top-4 -right-4">star</span>
                                <span className="text-7xl font-black text-white opacity-20 select-none">03</span>
                            </div>
                        </div>
                        <div className="text-center mt-2 flex-grow flex flex-col">
                            <h3 className="text-3xl font-black text-white mb-4">Go Sell</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">Receive goods in under 2 hours and keep your business moving.</p>
                            <div className="mt-auto pt-8">
                                <div className="w-full h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/5 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white/20 text-5xl">local_shipping</span>
                                    </div>
                                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <button className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-primary hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                        Start Free Trial
                        <span className="material-symbols-outlined ml-2">arrow_forward</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
