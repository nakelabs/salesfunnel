// This file lists all pages with demo data that needs to be removed for backend integration

export const PAGES_WITH_DEMO_DATA = [
    // Admin Pages
    'src/pages/admin/AdminDashboard.jsx', // ✓ Done
    'src/pages/admin/WholesalerDirectory.jsx', // ✓ Done
    'src/pages/admin/DistributorProfiles.jsx',
    'src/pages/admin/LiveOrderTicker.jsx',
    'src/pages/admin/ApprovalQueue.jsx',
    'src/pages/admin/PaymentReconciliation.jsx',
    'src/pages/admin/SLAMonitor.jsx',
    'src/pages/admin/ManualOverride.jsx',

    // Wholesaler Pages
    'src/pages/WholesalerDashboard.jsx',
    'src/pages/OrdersPage.jsx',
    'src/pages/PaymentsPage.jsx',
    'src/pages/InventoryPage.jsx',
    'src/pages/NotificationsPage.jsx',
    'src/pages/ProfilePage.jsx',
    'src/pages/SettingsPage.jsx',
    'src/pages/ShippingPage.jsx',
    'src/pages/PaymentPage.jsx',

    // Distributor Pages
    'src/pages/DistributorDashboard.jsx',
    'src/pages/DistributorProfilePage.jsx',
    'src/pages/DistributorNotificationsPage.jsx',
];
