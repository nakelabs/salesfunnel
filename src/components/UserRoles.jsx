import { Link } from 'react-router-dom';

export default function UserRoles() {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                        Complete Control For <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Everyone</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Whether you are buying or selling, SalesFunnel gives you the superpowers you need to handle your logistics efficiently.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {/* Wholesaler Card */}
                    <div className="relative overflow-visible rounded-3xl bg-[#d4ff00] p-10 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-all skew-y-[-2deg] animate-pulse">
                        <div className="relative z-10 skew-y-[2deg]">
                            <div className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-xs font-bold text-[#d4ff00] mb-6 shadow-md">
                                <span className="material-symbols-outlined text-[20px] animate-pulse">shopping_cart</span>
                                FOR RETAILERS
                            </div>
                            <h3 className="mb-4 text-3xl font-black text-black">Restock Your Shop</h3>
                            <p className="mb-8 text-base text-slate-900 leading-relaxed font-bold">
                                Access best prices, reduce downtime, and manage your inventory from your phone.
                            </p>
                            <ul className="space-y-3 mb-10">
                                <li className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[#d4ff00] flex-shrink-0">
                                        <span className="material-symbols-outlined text-[12px]">check</span>
                                    </div>
                                    <span className="text-sm text-black font-bold">Compare distributor prices instantly</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[#d4ff00] flex-shrink-0">
                                        <span className="material-symbols-outlined text-[12px]">check</span>
                                    </div>
                                    <span className="text-sm text-black font-bold">Order history & quick re-order</span>
                                </li>
                            </ul>
                            <Link to="/signup" className="block w-full rounded-2xl border-4 border-black bg-black px-6 py-4 text-base font-black text-[#d4ff00] hover:bg-slate-900 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                                Sign Up as Wholesaler
                            </Link>
                        </div>
                    </div>

                    {/* Distributor Card */}
                    <div className="relative overflow-visible rounded-3xl bg-[#d4ff00] p-10 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-all skew-y-[2deg]">
                        <div className="relative z-10 skew-y-[-2deg]">
                            <div className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-xs font-bold text-[#d4ff00] mb-6 shadow-md">
                                <span className="material-symbols-outlined text-[20px] animate-pulse">local_shipping</span>
                                FOR SUPPLIERS
                            </div>
                            <h3 className="mb-4 text-3xl font-black text-black">Expand Your Reach</h3>
                            <p className="mb-8 text-base text-slate-900 leading-relaxed font-bold">
                                Sell to thousands of verified retailers, get paid instantly, and simplify logistics.
                            </p>
                            <ul className="space-y-3 mb-10">
                                <li className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[#d4ff00] flex-shrink-0">
                                        <span className="material-symbols-outlined text-[12px]">check</span>
                                    </div>
                                    <span className="text-sm text-black font-bold">Automated payment reconciliation</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[#d4ff00] flex-shrink-0">
                                        <span className="material-symbols-outlined text-[12px]">check</span>
                                    </div>
                                    <span className="text-sm text-black font-bold">Real-time inventory management</span>
                                </li>
                            </ul>
                            <Link to="/signup" className="block w-full rounded-2xl border-4 border-black bg-black px-6 py-4 text-base font-black text-[#d4ff00] hover:bg-slate-900 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                                Sign Up as Distributor
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
