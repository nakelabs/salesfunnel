import { Link } from 'react-router-dom';

export default function UserRoles() {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                        complete control for <span className="bg-[#137fec] px-2 text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg inline-block rotate-[2deg]">everyone</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 font-bold max-w-2xl mx-auto">
                        Whether you are buying or selling, SalesFunnel gives you the superpowers you need to handle your logistics efficiently.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {/* Wholesaler Card */}
                    <div className="relative overflow-visible rounded-3xl bg-[#137fec] p-10 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all skew-y-[-2deg]">
                        <div className="relative z-10 skew-y-[2deg]">
                            <div className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-xs font-bold text-white mb-6 shadow-md">
                                FOR RETAILERS
                            </div>
                            <h3 className="mb-4 text-3xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>Restock Your Shop</h3>
                            <p className="mb-8 text-base text-slate-900 leading-relaxed font-bold">
                                Access best prices, reduce downtime, and manage your inventory from your phone.
                            </p>
                            <ul className="space-y-3 mb-10">
                                <li className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#137fec] flex-shrink-0">
                                        <span className="text-[12px] font-bold">✓</span>
                                    </div>
                                    <span className="text-sm text-white font-bold">Compare distributor prices instantly</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#137fec] flex-shrink-0">
                                        <span className="text-[12px] font-bold">✓</span>
                                    </div>
                                    <span className="text-sm text-white font-bold">Order history & quick re-order</span>
                                </li>
                            </ul>
                            <Link to="/signup" className="block w-full rounded-2xl border-4 border-black bg-white px-6 py-4 text-base font-black text-black hover:bg-slate-100 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                                Sign Up as Wholesaler
                            </Link>
                        </div>
                    </div>

                    {/* Distributor Card */}
                    <div className="relative overflow-visible rounded-3xl bg-[#137fec] p-10 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all skew-y-[2deg]">
                        <div className="relative z-10 skew-y-[-2deg]">
                            <div className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-xs font-bold text-white mb-6 shadow-md">
                                FOR SUPPLIERS
                            </div>
                            <h3 className="mb-4 text-3xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>Expand Your Reach</h3>
                            <p className="mb-8 text-base text-slate-900 leading-relaxed font-bold">
                                Sell to thousands of verified retailers, get paid instantly, and simplify logistics.
                            </p>
                            <ul className="space-y-3 mb-10">
                                <li className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#137fec] flex-shrink-0">
                                        <span className="text-[12px] font-bold">✓</span>
                                    </div>
                                    <span className="text-sm text-white font-bold">Automated payment reconciliation</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#137fec] flex-shrink-0">
                                        <span className="text-[12px] font-bold">✓</span>
                                    </div>
                                    <span className="text-sm text-white font-bold">Real-time inventory management</span>
                                </li>
                            </ul>
                            <Link to="/signup" className="block w-full rounded-2xl border-4 border-black bg-white px-6 py-4 text-base font-black text-black hover:bg-slate-100 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                                Sign Up as Distributor
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
