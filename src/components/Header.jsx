import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 40 && currentScrollY > lastScrollY) {
                // Scrolling down -> hide navbar
                setVisible(false);
                setMobileMenuOpen(false);
            } else if (currentScrollY <= 40 || currentScrollY < lastScrollY) {
                // Scrolling up or at top -> show navbar
                setVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = `/#${id}`;
        }
        setMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 transform ${
                visible
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-full opacity-0 pointer-events-none'
            } ${
                lastScrollY > 20
                    ? 'py-2.5 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-xl'
                    : 'py-5 bg-transparent'
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 z-10 hover:opacity-90 transition-opacity">
                    <img src="/images/logo.png" alt="SalesFunnel" className="h-8 sm:h-9 w-auto object-contain" />
                </Link>

                {/* Pill Navigation (Home, Features, FAQ) */}
                <nav
                    className="hidden md:flex items-center gap-1 bg-white/15 backdrop-blur-xl border border-white/20 rounded-full px-3 py-1.5 shadow-2xl"
                    style={{ fontFamily: '"Google Sans", "Plus Jakarta Sans", system-ui, sans-serif' }}
                >
                    <button
                        onClick={() => scrollTo('home')}
                        className="px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => scrollTo('features')}
                        className="px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                    >
                        Features
                    </button>
                    <button
                        onClick={() => scrollTo('faq')}
                        className="px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                    >
                        FAQ
                    </button>
                </nav>

                {/* CTA Action Buttons */}
                <div
                    className="hidden md:flex items-center gap-3 z-10"
                    style={{ fontFamily: '"Google Sans", "Plus Jakarta Sans", system-ui, sans-serif' }}
                >
                    <Link
                        to="/login"
                        className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white bg-black/60 hover:bg-black border border-white/20 rounded-full transition-all"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/signup"
                        className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-slate-100 rounded-full transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
                    aria-label="Toggle Menu"
                >
                    <span className="material-symbols-outlined text-xl">
                        {mobileMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Mobile Menu Modal */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden absolute top-20 left-4 right-4 bg-slate-950/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl animate-[fadeIn_0.2s_ease-in]"
                    style={{ fontFamily: '"Google Sans", "Plus Jakarta Sans", system-ui, sans-serif' }}
                >
                    <nav className="flex flex-col gap-2">
                        <button
                            onClick={() => scrollTo('home')}
                            className="px-4 py-3 text-left text-white font-semibold hover:bg-white/10 rounded-2xl transition-all"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollTo('features')}
                            className="px-4 py-3 text-left text-white font-semibold hover:bg-white/10 rounded-2xl transition-all"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollTo('faq')}
                            className="px-4 py-3 text-left text-white font-semibold hover:bg-white/10 rounded-2xl transition-all"
                        >
                            FAQ
                        </button>
                        <div className="border-t border-white/10 pt-4 mt-2 flex flex-col gap-3">
                            <Link
                                to="/login"
                                className="px-4 py-3 text-center text-white font-bold text-xs uppercase tracking-wider bg-black/90 border border-white/20 rounded-full hover:bg-black transition-all shadow-md"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-3 text-center text-black font-bold text-xs uppercase tracking-wider bg-white rounded-full hover:bg-slate-100 transition-all shadow-md"
                            >
                                Get Started
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
