import React, { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How do instant payments and escrow work?",
            answer: "When a wholesaler places an order, their funds are held in a secure escrow account. The funds are only released to the distributor instantly once the delivery is confirmed, protecting both parties."
        },
        {
            question: "Who handles the delivery logistics?",
            answer: "Distributors manage their own logistics teams, but they are bound by our strict 2-Hour Delivery Service Level Agreement (SLA) for local orders to ensure you get your goods fast."
        },
        {
            question: "How are distributors vetted?",
            answer: "Every distributor on SalesFunnel undergoes a rigorous verification process, including background checks, business registration verification, and facility inspections to guarantee authenticity."
        },
        {
            question: "What if there is an issue with my order?",
            answer: "Our 24/7 dedicated support team is always available to step in. Because payments are held in escrow, any disputes can be cleanly resolved before funds are transferred."
        },
        {
            question: "How much does it cost to use SalesFunnel?",
            answer: "Signing up as a wholesaler or distributor is completely free. We take a minimal, transparent transaction fee on completed orders to fund the escrow and platform services."
        },
        {
            question: "Can I track my orders in real time?",
            answer: "Yes! The platform provides a comprehensive dashboard for both wholesalers and distributors to track order statuses from acceptance to final delivery."
        },
        {
            question: "How fast do distributors get paid?",
            answer: "Immediately. The moment the wholesaler confirms receipt of intact goods, the escrow smart contract instantly settles the funds into the distributor's wallet."
        }
    ];

    return (
        <section className="py-20 bg-slate-50 border-t-4 border-black relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4 uppercase tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-600 font-bold max-w-2xl mx-auto">
                        Everything you need to know about how SalesFunnel protects your business.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`border-[3px] border-black bg-white rounded-xl transition-all duration-200 cursor-pointer 
                                ${openIndex === index ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'}`}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <div className="p-4 md:p-5 flex justify-between items-center">
                                <h3 className="text-lg md:text-xl font-black text-black pr-4">{faq.question}</h3>
                                <div className={`w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center rounded-lg border-2 border-black font-black text-xl transition-all duration-300 ${openIndex === index ? 'bg-black text-[#d4ff00] rotate-45' : 'bg-white text-black'}`}>
                                    +
                                </div>
                            </div>
                            <div className={`px-4 md:px-5 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 pb-4 md:pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-base text-slate-700 font-semibold leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Decorative background blocks */}
            <div className="absolute top-10 -left-10 w-48 h-48 bg-[#d4ff00] border-4 border-black rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-0"></div>
            <div className="absolute bottom-20 -right-10 w-40 h-40 bg-[#137fec] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-0 rotate-12"></div>
        </section>
    );
};

export default FAQ;
