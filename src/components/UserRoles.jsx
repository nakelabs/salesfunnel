import { Link } from 'react-router-dom';

const roles = [
    {
        tag: 'For Wholesalers',
        title: 'Restock Your Shop',
        description: 'Access best prices, reduce downtime, and manage your inventory from your phone. Compare distributors, pay securely, and track deliveries in real time.',
        bullets: [
            'Compare distributor prices instantly',
            'Order history & quick re-order',
            'Escrow-protected payments',
            'Real-time delivery tracking',
        ],
        cta: 'Sign Up as Wholesaler',
        link: '/signup?role=wholesaler',
        accent: '#5b6af0',
    },
    {
        tag: 'For Distributors',
        title: 'Expand Your Reach',
        description: 'Sell to thousands of verified wholesalers, get paid instantly on delivery confirmation, and simplify your logistics operations end-to-end.',
        bullets: [
            'Automated payment reconciliation',
            'Real-time inventory management',
            'Driver dispatch & delivery tracking',
            'Verified wholesaler network',
        ],
        cta: 'Sign Up as Distributor',
        link: '/signup?role=distributor',
        accent: '#0f0f14',
    },
];

export default function UserRoles() {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <span className="inline-block bg-[#5b6af0]/10 text-[#5b6af0] text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest">
                        Who it's for
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Complete control for everyone
                    </h2>
                    <p className="mt-3 text-slate-500 text-base max-w-xl mx-auto">
                        Whether you're buying or selling, SalesFunnel gives you the tools to run your business efficiently.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {roles.map((role) => (
                        <div
                            key={role.tag}
                            className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
                            style={{ background: role.accent === '#5b6af0' ? 'linear-gradient(135deg, #5b6af0 0%, #818cf8 100%)' : '#0f0f14' }}
                        >
                            <div className="p-8 sm:p-10">
                                {/* Tag */}
                                <span className="inline-block bg-white/15 text-white text-xs font-bold rounded-full px-3 py-1 mb-6 uppercase tracking-wider">
                                    {role.tag}
                                </span>

                                {/* Title */}
                                <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    {role.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/70 text-sm leading-relaxed mb-7">
                                    {role.description}
                                </p>

                                {/* Bullets */}
                                <ul className="space-y-2.5 mb-10">
                                    {role.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-center gap-2.5">
                                            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                                                    <path d="M2 5l2.5 2.5 3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </span>
                                            <span className="text-white/80 text-sm">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link
                                    to={role.link}
                                    className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-sm rounded-full px-6 py-3 hover:bg-white/90 transition-all"
                                >
                                    {role.cta}
                                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
