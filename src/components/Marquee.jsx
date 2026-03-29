import React from 'react';

const Marquee = () => {
    const texts = [
        "2-HOUR DELIVERY SLA",
        "SECURE ESCROW PAYMENTS",
        "NATIONWIDE LOGISTICS",
        "VERIFIED DISTRIBUTORS",
        "REAL-TIME TRACKING",
        "INSTANT SETTLEMENTS",
        "WHOLESALER PROTECTION"
    ];

    return (
        <div className="w-full bg-[#137fec] border-y-4 border-black py-5 overflow-hidden flex whitespace-nowrap relative z-10">
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 25s linear infinite;
                }
            `}</style>
            
            <div className="animate-marquee inline-flex items-center">
                {/* We render the text list twice side-by-side to create a seamless infinite scroll loop */}
                {[...texts, ...texts].map((text, i) => (
                    <div key={i} className="flex items-center">
                        <span className="text-white font-black text-2xl tracking-widest px-8">{text}</span>
                        <img src="/images/logo.png" alt="SalesFunnel Icon" className="h-8 md:h-10 w-auto mx-4 -rotate-90" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
