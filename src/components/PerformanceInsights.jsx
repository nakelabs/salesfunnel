export default function PerformanceInsights() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center mb-16 text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white text-slate-600 text-sm font-semibold uppercase tracking-wider mb-6 border border-slate-200 shadow-sm">Our Success</span>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl mb-6">Performance Insights</h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Transforming the Nigerian wholesale market with real-time data. See how we drive efficiency and growth across the ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                    {/* Large Stat Card */}
                    <div className="lg:col-span-4 lg:row-span-2 relative bg-slate-50 rounded-3xl overflow-hidden group">
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-100 to-slate-200"></div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                            <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
                        </div>
                        <div className="relative z-10 h-full p-10 flex flex-col justify-between min-h-[400px]">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Wholesalers Active</h3>
                                <p className="text-slate-500">Businesses sourcing daily</p>
                            </div>
                            <div className="mt-auto">
                                <h2 className="text-7xl font-black text-slate-900 tracking-tighter mb-4">8,500+</h2>
                                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                    <div className="bg-primary h-2 rounded-full w-[78%]"></div>
                                </div>
                                <p className="text-sm text-slate-500 mt-3 font-medium flex items-center gap-2">
                                    <span className="text-green-600 flex items-center">
                                        <span className="material-symbols-outlined text-sm mr-1">trending_up</span> 12%
                                    </span>
                                    increase this month
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Value Card */}
                    <div className="lg:col-span-8 bg-slate-50 p-10 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <span className="material-symbols-outlined text-9xl text-slate-900">payments</span>
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 h-full">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-accent text-2xl">star</span>
                                </div>
                                <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-2">₦2.5B+</h2>
                                <p className="text-lg font-medium text-slate-500">Total Transaction Value Processed</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-xs w-full">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold text-slate-400">DAILY AVG</span>
                                    <span className="text-green-600 text-sm font-bold">+24%</span>
                                </div>
                                <p className="text-2xl font-black text-slate-900">₦45M+</p>
                            </div>
                        </div>
                    </div>

                    {/* Orders Card */}
                    <div className="lg:col-span-4 bg-slate-50 p-8 rounded-3xl relative flex flex-col justify-center min-h-[200px]">
                        <div className="flex items-end justify-between mb-4">
                            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">150k+</h3>
                            <div className="p-3 bg-green-100 text-green-700 rounded-full">
                                <span className="material-symbols-outlined">inventory</span>
                            </div>
                        </div>
                        <p className="text-lg font-bold text-slate-800">Orders Processed</p>
                        <p className="text-sm text-slate-500">Across 12 major categories</p>
                    </div>

                    {/* Distributors Card */}
                    <div className="lg:col-span-4 bg-slate-50 p-8 rounded-3xl relative flex flex-col justify-center min-h-[200px]">
                        <div className="flex items-end justify-between mb-4">
                            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">450+</h3>
                            <div className="p-3 bg-purple-100 text-purple-700 rounded-full">
                                <span className="material-symbols-outlined">local_shipping</span>
                            </div>
                        </div>
                        <p className="text-lg font-bold text-slate-800">Distributors Onboarded</p>
                        <p className="text-sm text-slate-500">Verified partners nationwide</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
