export default function PerformanceInsights() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center mb-16 text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white text-slate-600 text-sm font-semibold uppercase tracking-wider mb-6 border border-slate-200 shadow-sm">Our Success</span>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Performance Insights</h2>
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

                            {/* Graph Background */}
                            <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-10" preserveAspectRatio="none" viewBox="0 0 400 200">
                                <defs>
                                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#137fec" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#137fec" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {/* Area chart showing growth trend */}
                                <path
                                    d="M 0,180 L 0,120 Q 50,100 100,110 T 200,80 T 300,50 L 400,40 L 400,200 L 0,200 Z"
                                    fill="url(#areaGradient)"
                                />
                                <path
                                    d="M 0,120 Q 50,100 100,110 T 200,80 T 300,50 L 400,40"
                                    stroke="#137fec"
                                    strokeWidth="3"
                                    fill="none"
                                    className="animate-pulse"
                                />
                                {/* Data points */}
                                <circle cx="100" cy="110" r="4" fill="#137fec" />
                                <circle cx="200" cy="80" r="4" fill="#137fec" />
                                <circle cx="300" cy="50" r="4" fill="#137fec" />
                                <circle cx="400" cy="40" r="4" fill="#137fec" />
                            </svg>
                        </div>
                        <div className="relative z-10 h-full p-10 flex flex-col justify-between min-h-[400px]">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Wholesalers Active</h3>
                                <p className="text-slate-500">Businesses sourcing daily</p>
                            </div>
                            <div className="mt-auto">
                                <h2 className="text-7xl font-black text-slate-900 tracking-tighter mb-4">8,500+</h2>
                                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                    <div className="bg-primary h-2 rounded-full w-[78%]"></div>
                                </div>
                                <p className="text-sm text-slate-500 mt-3 font-medium flex items-center gap-2">
                                    <span className="text-green-600 flex items-center font-bold">
                                        ↑ 12%
                                    </span>
                                    increase this month
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Value Card */}
                    <div className="lg:col-span-8 bg-slate-50 p-10 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <div className="text-9xl font-black text-slate-900">₦</div>
                        </div>

                        {/* Bar Graph Background */}
                        <svg className="absolute bottom-0 right-0 w-2/3 h-full opacity-10" viewBox="0 0 300 200" preserveAspectRatio="none">
                            {/* Vertical bars representing transaction growth */}
                            <rect x="20" y="120" width="30" height="80" fill="#137fec" rx="4" />
                            <rect x="70" y="100" width="30" height="100" fill="#137fec" rx="4" />
                            <rect x="120" y="80" width="30" height="120" fill="#137fec" rx="4" />
                            <rect x="170" y="60" width="30" height="140" fill="#137fec" rx="4" />
                            <rect x="220" y="30" width="30" height="170" fill="#10b981" rx="4" />
                            <rect x="270" y="20" width="30" height="180" fill="#10b981" rx="4" className="animate-pulse" />
                        </svg>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 h-full">
                            <div className="flex-1">
                                <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-2" style={{ fontFamily: 'var(--font-heading)' }}>₦2.5B+</h2>
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
                    <div className="lg:col-span-4 bg-slate-50 p-8 rounded-3xl relative flex flex-col justify-center min-h-[200px] overflow-hidden">
                        {/* Mini bar chart background */}
                        <svg className="absolute bottom-0 right-0 w-full h-full opacity-10" viewBox="0 0 200 100" preserveAspectRatio="none">
                            <rect x="30" y="60" width="15" height="40" fill="#10b981" rx="2" />
                            <rect x="55" y="45" width="15" height="55" fill="#10b981" rx="2" />
                            <rect x="80" y="50" width="15" height="50" fill="#10b981" rx="2" />
                            <rect x="105" y="30" width="15" height="70" fill="#10b981" rx="2" />
                            <rect x="130" y="35" width="15" height="65" fill="#10b981" rx="2" />
                            <rect x="155" y="20" width="15" height="80" fill="#22c55e" rx="2" className="animate-pulse" />
                        </svg>

                        <div className="relative z-10">
                            <div className="flex items-end justify-between mb-4">
                                <h3 className="text-5xl font-black text-slate-900 tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>150k+</h3>
                            </div>
                            <p className="text-lg font-bold text-slate-800">Orders Processed</p>
                            <p className="text-sm text-slate-500">Across 12 major categories</p>
                        </div>
                    </div>

                    {/* Distributors Card */}
                    <div className="lg:col-span-4 bg-slate-50 p-8 rounded-3xl relative flex flex-col justify-center min-h-[200px] overflow-hidden">
                        {/* Stepped growth chart background */}
                        <svg className="absolute bottom-0 left-0 w-full h-full opacity-10" viewBox="0 0 200 100" preserveAspectRatio="none">
                            <path
                                d="M 0,90 L 30,90 L 30,75 L 60,75 L 60,60 L 90,60 L 90,45 L 120,45 L 120,30 L 150,30 L 150,15 L 200,15"
                                stroke="#8b5cf6"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                d="M 0,90 L 30,90 L 30,75 L 60,75 L 60,60 L 90,60 L 90,45 L 120,45 L 120,30 L 150,30 L 150,15 L 200,15 L 200,100 L 0,100 Z"
                                fill="#8b5cf6"
                                fillOpacity="0.2"
                            />
                            {/* Growth points */}
                            <circle cx="30" cy="75" r="3" fill="#8b5cf6" />
                            <circle cx="60" cy="60" r="3" fill="#8b5cf6" />
                            <circle cx="90" cy="45" r="3" fill="#8b5cf6" />
                            <circle cx="120" cy="30" r="3" fill="#8b5cf6" />
                            <circle cx="150" cy="15" r="4" fill="#a855f7" className="animate-pulse" />
                        </svg>

                        <div className="relative z-10">
                            <div className="flex items-end justify-between mb-4">
                                <h3 className="text-5xl font-black text-slate-900 tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>450+</h3>
                            </div>
                            <p className="text-lg font-bold text-slate-800">Distributors Onboarded</p>
                            <p className="text-sm text-slate-500">Verified partners nationwide</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
