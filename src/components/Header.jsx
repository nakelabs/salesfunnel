import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setMobileMenuOpen(false)
    }

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 z-10">
                    <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-2 rounded-xl shadow-sm">
                        <img src="/images/logo.png" alt="SalesFunnel" className="h-7 w-auto" />
                    </div>
                </Link>

                {/* Pill Nav */}
                <nav className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full px-2 py-1.5 shadow-sm">
                    <button onClick={() => scrollTo('home')} className="px-5 py-2 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all">Home</button>
                    <button onClick={() => scrollTo('features')} className="px-5 py-2 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all">Platform</button>
                    <button onClick={() => scrollTo('faq')} className="px-5 py-2 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all">FAQ</button>
                </nav>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center gap-3 z-10">
                    <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-800 hover:text-black transition-colors">
                        Log In
                    </Link>
                    <Link
                        to="/signup"
                        className="px-5 py-2.5 bg-black text-white text-sm font-bold transition-all border border-[#3b82f6] hover:bg-[#0d1a2d] tracking-wide uppercase"
                        style={{ clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)' }}
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-800 shadow-sm"
                >
                    <span className="material-symbols-outlined text-xl">
                        {mobileMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl animate-[fadeIn_0.2s_ease-in]">
                    <nav className="flex flex-col p-4 gap-2">
                        <button onClick={() => scrollTo('home')} className="px-4 py-3 text-left text-slate-800 font-bold hover:bg-slate-50 rounded-xl transition-all">Home</button>
                        <button onClick={() => scrollTo('features')} className="px-4 py-3 text-left text-slate-800 font-bold hover:bg-slate-50 rounded-xl transition-all">Platform</button>
                        <button onClick={() => scrollTo('faq')} className="px-4 py-3 text-left text-slate-800 font-bold hover:bg-slate-50 rounded-xl transition-all">FAQ</button>
                        <div className="border-t border-slate-200 pt-3 mt-1 flex flex-col gap-2">
                            <Link to="/login" className="px-4 py-3 text-center text-slate-800 font-bold border border-slate-300 rounded-xl hover:bg-slate-50 transition-all">Log In</Link>
                            <Link
                                to="/signup"
                                className="px-4 py-3 text-center text-white font-bold bg-black border border-[#3b82f6] tracking-wide uppercase transition-all"
                                style={{ clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)' }}
                            >Get Started</Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
