import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import PerformanceInsights from './components/PerformanceInsights'
import HowItWorks from './components/HowItWorks'
import UserRoles from './components/UserRoles'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <Header />

      {/* Welcome Text Overlay */}
      <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none opacity-0 animate-[welcomeFade_4s_ease-in-out] [animation-fill-mode:forwards]">
        <h1 className="text-6xl md:text-8xl font-bold text-[#d4ff00] drop-shadow-[0_0_30px_rgba(212,255,0,0.5)] overflow-hidden whitespace-nowrap animate-[typewriter_4s_steps(24)_forwards]" style={{ fontFamily: "'Pacifico', cursive", width: '0', borderRight: '3px solid #d4ff00' }}>
          Welcome to SalesFunnel
        </h1>
      </div>

      <main className="flex-grow animate-[fadeIn_1s_ease-in_4s] opacity-0 [animation-fill-mode:forwards]">
        <Hero />
        <Features />
        <PerformanceInsights />
        <HowItWorks />
        <UserRoles />
      </main>
      <Footer />
    </div>
  )
}

export default App
