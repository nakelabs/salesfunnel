import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import PerformanceInsights from './components/PerformanceInsights'
import HowItWorks from './components/HowItWorks'
import UserRoles from './components/UserRoles'
import Footer from './components/Footer'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import OnboardingFlow from './pages/OnboardingFlow'
import PendingApproval from './pages/PendingApproval'
import WholesalerDashboard from './pages/WholesalerDashboard'
import DistributorDashboard from './pages/DistributorDashboard'
import OrdersPage from './pages/OrdersPage'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import ShippingPage from './pages/ShippingPage'
import ReviewPage from './pages/ReviewPage'
import PaymentPage from './pages/PaymentPage'
import NotificationsPage from './pages/NotificationsPage'
import ProfilePage from './pages/ProfilePage'
import InventoryPage from './pages/InventoryPage'
import EditProductPage from './pages/EditProductPage'
import AddProductPage from './pages/AddProductPage'
import PaymentsPage from './pages/PaymentsPage'
import SettingsPage from './pages/SettingsPage'
import DistributorProfilePage from './pages/DistributorProfilePage'
import DistributorNotificationsPage from './pages/DistributorNotificationsPage'
import DistributorOrderDetailPage from './pages/DistributorOrderDetailPage'
import DistributorOrdersPage from './pages/DistributorOrdersPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import WholesalerDirectory from './pages/admin/WholesalerDirectory'
import DistributorProfiles from './pages/admin/DistributorProfiles'
import ApprovalQueue from './pages/admin/ApprovalQueue'
import LiveOrderTicker from './pages/admin/LiveOrderTicker'
import PaymentReconciliation from './pages/admin/PaymentReconciliation'
import SLAMonitor from './pages/admin/SLAMonitor'
import ManualOverride from './pages/admin/ManualOverride'
import CodeReset from './pages/admin/CodeReset'

function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-light text-slate-900 transition-colors duration-200" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
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

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />
        <Route path="/pending-approval" element={<PendingApproval />} />
        <Route path="/dashboard" element={<WholesalerDashboard />} />
        <Route path="/distributor-dashboard" element={<DistributorDashboard />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout/shipping" element={<ShippingPage />} />
        <Route path="/checkout/review" element={<ReviewPage />} />
        <Route path="/checkout/payment" element={<PaymentPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/add" element={<AddProductPage />} />
        <Route path="/inventory/edit/:productId" element={<EditProductPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/distributor-profile" element={<DistributorProfilePage />} />
        <Route path="/distributor-notifications" element={<DistributorNotificationsPage />} />
        <Route path="/distributor-orders" element={<DistributorOrdersPage />} />
        <Route path="/distributor-orders/:orderId" element={<DistributorOrderDetailPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/wholesalers" element={<WholesalerDirectory />} />
        <Route path="/admin/distributors" element={<DistributorProfiles />} />
        <Route path="/admin/approvals" element={<ApprovalQueue />} />
        <Route path="/admin/orders" element={<LiveOrderTicker />} />
        <Route path="/admin/payments" element={<PaymentReconciliation />} />
        <Route path="/admin/sla" element={<SLAMonitor />} />
        <Route path="/admin/override" element={<ManualOverride />} />
        <Route path="/admin/codes" element={<CodeReset />} />
      </Routes>
    </CartProvider>
  )
}

export default App
