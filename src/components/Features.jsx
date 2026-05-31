import { useState } from 'react';

const tabs = ['Wholesaler', 'Distributor'];

const tabContent = {
    Wholesaler: {
        headline: 'Everything wholesalers need, without the usual friction.',
        description: 'Invite distributors, make secure payments, receive order updates, and stay connected with your supply chain all from one app that feels simple and familiar.',
        bullets: [
            'Browse and compare distributor prices instantly',
            'Pay with bank transfer escrow-protected',
            'Real-time order tracking and status updates',
            'Order history and quick re-order in seconds',
            'Emergency escalation when something needs attention',
        ],
    },
    Distributor: {
        headline: 'Run your distribution business like a pro.',
        description: 'Manage incoming orders, track deliveries, and get paid instantly when goods are confirmed. Built for Nigerian distributors at scale.',
        bullets: [
            'Dashboard with live order and revenue overview',
            'Automated payment reconciliation',
            'Driver dispatch and delivery confirmation',
            'Inventory sync and low-stock alerts',
            'Verified wholesaler network access',
        ],
    },
};

export default function Features() {
    const [activeTab, setActiveTab] = useState('Wholesaler');
    const content = tabContent[activeTab];

    return (
        <section id="features" className="py-12 bg-[#f5f4f0]">
            {/* Backed by / Partnership bar */}
            <div className="flex items-center justify-center gap-3 mb-16">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Backed by</span>
                <div className="h-px w-8 bg-slate-200"></div>
                <span className="text-sm font-bold text-slate-600">SalesFunnel NG</span>
                <span className="text-slate-300">•</span>
                {/* <span className="text-sm font-bold text-slate-600">Nigerian SME Alliance</span> */}
            </div>

            {/* Tab Switcher */}
            <div className="flex justify-center mb-16">
                <div className="inline-flex bg-slate-100 rounded-full p-1 gap-1">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${activeTab === tab
                                ? 'bg-[#0f0f14] text-white shadow-md'
                                : 'text-slate-500 hover:text-slate-800'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content: Left text + Right phone mockup */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
                    {/* Left: Text Content */}
                    <div className="flex-1 order-2 lg:order-1 max-w-lg">
                        <h2 className="text-4xl sm:text-5xl lg:text-[44px] font-black tracking-tighter text-[#111] leading-[1.1] mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {content.headline}
                        </h2>
                        <p className="text-slate-600 text-base sm:text-lg font-bold leading-relaxed mb-8">
                            {content.description}
                        </p>
                        <ul className="space-y-4 mb-10">
                            {content.bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#818cf8] flex items-center justify-center">
                                        <svg className="w-3 h-3 text-[#818cf8]" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="text-slate-700 text-base font-bold leading-snug">{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Phone Mockup */}
                    <div className="order-1 lg:order-2 flex-shrink-0 flex justify-center">
                        <div className="relative -rotate-6 hover:-rotate-3 hover:scale-105 transition-transform duration-700">
                            {/* Glow effect */}
                            <div className="absolute inset-0 -m-8 bg-[#5b6af0]/10 rounded-full blur-3xl pointer-events-none"></div>
                            {/* Ultra-Clean Modern iPhone Frame */}
                            <div className="relative w-[240px] h-[500px] sm:w-[270px] sm:h-[560px] bg-[#111] rounded-[3.5rem] p-[6px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-[#333]/40">
                                {/* Side Buttons - very subtle */}
                                <div className="absolute top-24 -left-[2px] w-[2px] h-6 bg-[#222] rounded-l-md"></div>
                                <div className="absolute top-36 -left-[2px] w-[2px] h-10 bg-[#222] rounded-l-md"></div>
                                <div className="absolute top-48 -left-[2px] w-[2px] h-10 bg-[#222] rounded-l-md"></div>
                                <div className="absolute top-40 -right-[2px] w-[2px] h-14 bg-[#222] rounded-r-md"></div>

                                {/* Inner Screen */}
                                <div className="relative w-full h-full bg-black rounded-[3.25rem] overflow-hidden">
                                    {/* Dynamic Island (Subtle) */}
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-black rounded-full z-20 flex items-center justify-end px-2">
                                        <div className="w-2 h-2 rounded-full bg-[#111] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"></div>
                                    </div>

                                    <img
                                        src="/images/dashboard_mockup.png"
                                        alt="SalesFunnel Dashboard"
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
