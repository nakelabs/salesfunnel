import React, { useState } from 'react';

const tabs = ['Wholesaler', 'Distributor'];

const faqsByTab = {
    Wholesaler: [
        {
            question: "What can wholesalers do in the app?",
            answer: "Wholesalers can browse distributors, place orders, make secure payments via escrow, track deliveries in real-time, manage order history, and receive instant notifications when something needs attention."
        },
        {
            question: "How does escrow payment protection work?",
            answer: "When you place an order, funds are held in a secure escrow account. They are only released to the distributor once you confirm receipt of your goods — protecting you from fraud or non-delivery."
        },
        {
            question: "Can wholesalers compare prices from different distributors?",
            answer: "Yes! You can browse multiple distributors, compare pricing, check ratings, and choose the best deal before placing your order."
        },
        {
            question: "How fast is delivery?",
            answer: "All distributors on SalesFunnel are bound by a strict 2-Hour SLA for local orders. You can track your driver in real-time and receive SMS updates."
        },
    ],
    Distributor: [
        {
            question: "How do distributors get paid?",
            answer: "Immediately upon delivery confirmation. When the wholesaler confirms receipt of intact goods, funds are instantly released from escrow to your wallet — no delays."
        },
        {
            question: "How are distributors vetted?",
            answer: "Every distributor undergoes a rigorous verification process including background checks, business registration verification, and facility inspections to guarantee authenticity."
        },
        {
            question: "Can distributors manage their inventory?",
            answer: "Yes — the platform provides full inventory management with low-stock alerts, product listing management, and order fulfillment tracking."
        },
        {
            question: "What happens if there's a dispute?",
            answer: "Our 24/7 support team steps in to mediate. Because funds are in escrow, disputes can be cleanly resolved before any money changes hands."
        },
    ],
};

export default function FAQ() {
    const [activeTab, setActiveTab] = useState('Wholesaler');
    const [openIndex, setOpenIndex] = useState(0);
    const faqs = faqsByTab[activeTab];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setOpenIndex(0);
    };

    return (
        <section id="faq" className="py-12 bg-[#f5f4f0]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Left: Heading + Tab Switcher */}
                    <div className="lg:w-80 flex-shrink-0">
                        {/* Tab Switcher — same as Features */}
                        <div className="inline-flex bg-white border border-slate-200 rounded-full p-1 gap-1 shadow-sm mb-8">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabChange(tab)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${activeTab === tab
                                            ? 'bg-[#0f0f14] text-white shadow-md'
                                            : 'text-slate-400 hover:text-slate-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Frequently<br />Asked<br />Questions
                        </h2>
                        <p className="mt-4 text-slate-500 text-sm leading-relaxed">
                            Everything you need to know about SalesFunnel filtered by role.
                        </p>
                    </div>

                    {/* Right: FAQ Accordion */}
                    <div className="flex-1 flex flex-col divide-y divide-slate-200">
                        {faqs.map((faq, index) => (
                            <div key={`${activeTab}-${index}`} className="py-5">
                                <button
                                    className="w-full flex items-start justify-between gap-4 text-left group"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <span className={`text-base font-semibold transition-colors ${openIndex === index ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                        {faq.question}
                                    </span>
                                    <span className={`flex-shrink-0 w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-[#0f0f14] border-[#0f0f14] rotate-180' : 'bg-white'}`}>
                                        <svg className={`w-3.5 h-3.5 transition-colors ${openIndex === index ? 'text-white' : 'text-slate-400'}`} viewBox="0 0 14 14" fill="none">
                                            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-64 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-slate-500 text-sm leading-relaxed pr-8">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
