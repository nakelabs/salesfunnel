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

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-300 animate-[slideDown_0.8s_ease-out] ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200' : 'bg-transparent'}`}>
            <div className={`mx-auto flex transition-all duration-300 ${isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'} max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8`}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-white border-2 border-black p-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-0.5 transition-all">
                        <img src="/images/logo.png" alt="SalesFunnel" className="h-8 md:h-10 w-auto" />
                    </div>
                </Link>

                {/* Desktop Navigation
                <nav className="hidden md:flex items-center gap-8 rounded-full bg-white/80 backdrop-blur-md px-8 py-3 shadow-sm border border-slate-100">
                    <a className="text-sm font-bold text-slate-600 hover:text-primary transition-colors" href="#">Features</a>
                    <a className="text-sm font-bold text-slate-600 hover:text-primary transition-colors" href="#">Pricing</a>
                    <a className="text-sm font-bold text-slate-600 hover:text-primary transition-colors" href="#">About</a>
                    <a className="text-sm font-bold text-slate-600 hover:text-primary transition-colors" href="#">Contact</a>
                </nav> */}

                {/* Desktop CTA Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Link to="/login" className="px-6 py-2.5 bg-transparent text-black font-bold hover:text-slate-600 transition-all skew-x-[-12deg]">
                        <span className="block skew-x-[12deg]">Sign in</span>
                    </Link>
                    <Link to="/signup" className="px-8 py-3 bg-[#137fec] text-white font-black border-4 border-black hover:scale-105 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] skew-x-[-12deg]">
                        <span className="block skew-x-[12deg]">Get Started</span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 backdrop-blur border border-slate-100 shadow-sm"
                >
                    <span className="material-symbols-outlined text-slate-900">
                        {mobileMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-xl animate-[fadeIn_0.3s_ease-in]">
                    <nav className="flex flex-col px-4 py-6 gap-4">
                        <div className="flex flex-col gap-3">
                            <Link to="/login" className="px-6 py-3 bg-transparent text-black font-bold hover:text-slate-600 transition-all border-2 border-black rounded-lg text-center">
                                Sign in
                            </Link>
                            <Link to="/signup" className="px-6 py-3 bg-[#137fec] text-white font-black border-4 border-black hover:scale-105 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-lg text-center">
                                Get Started
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
