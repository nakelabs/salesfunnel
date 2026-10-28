import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-black text-white">
            {/* Background Warehouse Image Layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hero_bg.jpg"
                    alt="Modern Distribution and Restocking Warehouse"
                    className="w-full h-full object-cover object-center select-none"
                />

                {/* Asymmetric Directional Vignette: Deep dark on the left for contrast, open on the right for image depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 md:via-black/70 to-black/30" />

                {/* Top header shadow & bottom section blend */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/75 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
            </div>

            {/* Main Content with generous inward padding */}
            <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24 xl:px-28 w-full pt-36 pb-20">
                <div className="max-w-[40rem] pl-2 sm:pl-4 md:pl-6">
                    {/* Headline - Google Sans with upright pastel accent */}
                    <h1
                        className="text-[3.5rem] sm:text-[4.75rem] lg:text-[5.5rem] font-bold text-white tracking-[-0.03em] leading-[0.98] mb-0"
                        style={{ fontFamily: '"Google Sans", "Plus Jakarta Sans", system-ui, -apple-system, sans-serif' }}
                    >
                        Restock.
                        <br />
                        Manage.{' '}
                        <span className="font-normal text-[#d8b4fe]">
                            Scale.
                        </span>
                    </h1>

                    {/* Subtitle - Google Sans with relaxed line height */}
                    <p
                        className="mt-6 max-w-[34rem] text-[1.1rem] font-medium leading-[1.65] text-white/90 md:text-[1.2rem]"
                        style={{ fontFamily: '"Google Sans", "Plus Jakarta Sans", system-ui, -apple-system, sans-serif' }}
                    >
                        SalesFunnel automates restocking, payments, distributor workflows, communication, and inventory tracking in one platform built for Nigerian wholesalers, retailers, and modern commerce.
                    </p>


                </div>
            </div>
        </section>
    );
}
