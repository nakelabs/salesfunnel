import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="absolute top-0 z-50 w-full bg-transparent animate-[slideDown_0.8s_ease-out]">
            <div className="mx-auto flex h-20 md:h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-sm border border-slate-100">
                    <img src="/images/logo.png" alt="SalesFunnel" className="h-12 md:h-14 w-auto" />
                </div>

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
                    <Link to="/signup" className="px-8 py-3 bg-[#d4ff00] text-black font-black border-4 border-black hover:scale-105 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] skew-x-[-12deg]">
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
                        <a className="text-base font-bold text-slate-600 hover:text-primary transition-colors py-2" href="#">Features</a>
                        <a className="text-base font-bold text-slate-600 hover:text-primary transition-colors py-2" href="#">Pricing</a>
                        <a className="text-base font-bold text-slate-600 hover:text-primary transition-colors py-2" href="#">About</a>
                        <a className="text-base font-bold text-slate-600 hover:text-primary transition-colors py-2" href="#">Contact</a>

                        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-200">
                            <Link to="/login" className="px-6 py-3 bg-transparent text-black font-bold hover:text-slate-600 transition-all border-2 border-black rounded-lg text-center">
                                Sign in
                            </Link>
                            <Link to="/signup" className="px-6 py-3 bg-[#d4ff00] text-black font-black border-4 border-black hover:scale-105 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-lg text-center">
                                Get Started
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
