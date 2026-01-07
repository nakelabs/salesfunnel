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
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                        Restock Faster. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Sell More.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                        SalesFunnel automates restocking and payments for Nigerian businesses, speeding up deliveries while keeping your cash flow secure.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="px-10 py-5 rounded-3xl bg-[#d4ff00] text-black font-black text-lg border-4 border-black hover:scale-105 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 animate-pulse">
                            I am a Wholesaler
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                        <button className="px-10 py-5 rounded-3xl bg-[#d4ff00] text-black font-black text-lg border-4 border-black hover:scale-105 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                            I am a Distributor
                        </button>
                    </div>
                </div>

                {/* Floating Cards Animation Area */}
                <div className="relative w-full h-[400px] md:h-[500px] mt-12 mx-auto max-w-6xl">
                    {/* Central Icon */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="relative flex items-center justify-center">
                            <div className="w-24 h-24 bg-white rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center border border-slate-100 z-10 relative">
                                <span className="material-symbols-outlined text-4xl text-primary animate-pulse">inventory_2</span>
                            </div>
                            <div className="absolute inset-0 bg-blue-50 rounded-2xl scale-150 -z-10 animate-ping opacity-20"></div>
                            <div className="absolute top-1/2 left-full w-24 h-[2px] bg-gradient-to-r from-slate-200 to-transparent"></div>
                            <div className="absolute top-1/2 right-full w-24 h-[2px] bg-gradient-to-l from-slate-200 to-transparent"></div>
                            <div className="absolute left-1/2 bottom-full h-24 w-[2px] bg-gradient-to-t from-slate-200 to-transparent"></div>
                        </div>
                    </div>

                    {/* Floating Card 1 */}
                    <div className="absolute left-4 md:left-20 top-1/3 floating-card" style={{ animationDelay: '0s' }}>
                        <div className="bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-[200px]">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <span className="material-symbols-outlined text-xl">payments</span>
                                </div>
                                <div className="flex-1">
                                    <div className="h-2 w-12 bg-slate-100 rounded mb-1"></div>
                                    <div className="h-2 w-8 bg-slate-100 rounded"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-slate-400">Payment</span>
                                <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Completed</span>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card 2 */}
                    <div className="absolute right-4 md:right-32 top-10 floating-card" style={{ animationDelay: '1.5s' }}>
                        <div className="bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">schedule</span>
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-800">2-Hour Delivery</div>
                                <div className="text-xs text-slate-400 mt-1">Estimating route...</div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card 3 */}
                    <div className="absolute left-10 md:left-32 bottom-20 floating-card" style={{ animationDelay: '2s' }}>
                        <div className="bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                            <div className="flex items-center justify-between gap-8 mb-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Growth</span>
                                <span className="text-green-500 text-xs font-bold flex items-center">
                                    <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span> 15%
                                </span>
                            </div>
                            <div className="flex -space-x-3">
                                <img alt="User" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8a03HsadFd7pnX_8_gS9nqYK0zqzcZRaTAFXXPmIcLhmwqBUr3pX4v9HE3YSX4KBp2ZjAQMv0UhajwvOtiXcCP2s0-v8LhyjEohh0ua-LCpGscT7Ic34oOr7_UcBB3BkpkdWoUr3K7WMb_3428zojiVFsQgDw0v0WC47xbHL8OmtBYw8LikSCgal5FX5EWDeZHm3807aAWY4Au7mVyhu2DLrSueoUxI1iM_vgc7WsWtJlPkGv2yMNQ4c7AX9eMjaXzIsRXZ_NHkk" />
                                <img alt="User" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcPRKRy4z78dfKb43b7I0bCP2oNU1nwdU9G3wqLdp4KEXqo9Nriq7rldSConWCvfPKy2005VJqkGvef5SqembPSeBosOPDpKPxz9oixxK3E4YzPuGpUrveWhtiaWJH5BIs-oHGr4u-xWuxZKtxmwshSmt1cmjyVuCmAcEdtPk6HTm9Wf8qtSDTzEZ1I8lO771wotlH44EHuftEYFmn2D06jEtB7Dq8ZfIr9vdWhldu0-9rqZ25UfRQIXXCU-BeHd2Mrl9Xw6dK7P0" />
                                <img alt="User" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL8CCiJHDgPqfvh2rl3fMy7gmrWCkmkDjuZf21VKu8pCcAz0SrHTnrADuTHASYc6tIETAMXAyskkD65grcA2HKYcZMKOLvCa2F5l5XVoNp0-_-92VlaxrSPK3DxIm9vdlYWLTi0XiZmQaj4guOSEy7dlOyfQFRzhWPQ6y9hZn2SENRRFogYmk79jZsQ93NJof0ot7wF48bQVxj8AFF-lTImqbOgXipAf7LgIsyyhqAj5LDYxxwe7k6bk5tQhDwjqXY9sWqyKHvUPA" />
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+2k</div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card 4 - Network Card */}
                    <div className="absolute left-8 md:left-40 top-10 floating-card" style={{ animationDelay: '1s' }}>
                        <div className="bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 min-w-[280px]">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Wholesalers */}
                                <div>
                                    <div className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-blue-500">storefront</span>
                                        Our Wholesalers
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white shadow-sm"></div>
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-300 to-blue-500 border-2 border-white shadow-sm"></div>
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 border-2 border-white shadow-sm"></div>
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center">
                                            <span className="text-xs font-bold text-slate-500">+8k</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Distributors */}
                                <div>
                                    <div className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-green-500">factory</span>
                                        Our Distributors
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-600 border-2 border-white shadow-sm"></div>
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-300 to-green-500 border-2 border-white shadow-sm"></div>
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-700 border-2 border-white shadow-sm"></div>
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center">
                                            <span className="text-xs font-bold text-slate-500">450+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Card 5 */}
                    <div className="absolute right-8 md:right-40 bottom-32 floating-card" style={{ animationDelay: '0.5s' }}>
                        <div className="bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-[220px]">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                                    <span className="material-symbols-outlined text-sm">shield</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800">Escrow Protected</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                                <div className="bg-purple-500 h-1.5 rounded-full w-[80%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
