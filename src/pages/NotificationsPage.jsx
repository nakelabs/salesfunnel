import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NotificationsPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'order',
            icon: 'shopping_bag',
            iconColor: 'text-green-600',
            iconBg: 'bg-green-100',
            title: 'Order Confirmed',
            message: 'Your order #SF-8821-ORD has been confirmed and is being processed.',
            time: '5 minutes ago',
            read: false
        },
        {
            id: 2,
            type: 'product',
            icon: 'local_offer',
            iconColor: 'text-blue-600',
            iconBg: 'bg-blue-100',
            title: 'Price Drop Alert',
            message: 'Dangote Sugar 50kg is now ₦26,500 (was ₦28,000). Save ₦1,500!',
            time: '1 hour ago',
            read: false
        },
        {
            id: 3,
            type: 'product',
            icon: 'inventory',
            iconColor: 'text-amber-600',
            iconBg: 'bg-amber-100',
            title: 'Stock Alert',
            message: 'Nestle Milo Pro Pack is back in stock. Order now before it sells out!',
            time: '2 hours ago',
            read: false
        },
        {
            id: 4,
            type: 'order',
            icon: 'local_shipping',
            iconColor: 'text-purple-600',
            iconBg: 'bg-purple-100',
            title: 'Order Shipped',
            message: 'Order #SF-7734-ORD is on its way. Expected delivery: Jan 10, 2026',
            time: '5 hours ago',
            read: true
        },
        {
            id: 5,
            type: 'system',
            icon: 'verified_user',
            iconColor: 'text-primary',
            iconBg: 'bg-blue-100',
            title: 'Account Verified',
            message: 'Your business documents have been verified. You now have full access to wholesale pricing.',
            time: '1 day ago',
            read: true
        },
        {
            id: 6,
            type: 'order',
            icon: 'cancel',
            iconColor: 'text-red-600',
            iconBg: 'bg-red-100',
            title: 'Payment Failed',
            message: 'Payment for order #SF-7621-ORD failed. Please try again or use a different payment method.',
            time: '1 day ago',
            read: true
        },
        {
            id: 7,
            type: 'product',
            icon: 'new_releases',
            iconColor: 'text-green-600',
            iconBg: 'bg-green-100',
            title: 'New Products Available',
            message: '15 new products added to the Beverages category. Check them out now!',
            time: '2 days ago',
            read: true
        },
        {
            id: 8,
            type: 'system',
            icon: 'campaign',
            iconColor: 'text-orange-600',
            iconBg: 'bg-orange-100',
            title: 'Special Promotion',
            message: 'Flash Sale! Get 20% off on all dry goods. Valid until midnight tonight.',
            time: '3 days ago',
            read: true
        }
    ]);

    const tabs = [
        { id: 'all', name: 'All', icon: 'notifications' },
        { id: 'order', name: 'Orders', icon: 'shopping_bag' },
        { id: 'product', name: 'Products', icon: 'inventory' },
        { id: 'system', name: 'System', icon: 'settings' }
    ];

    const filteredNotifications = activeTab === 'all'
        ? notifications
        : notifications.filter(n => n.type === activeTab);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="bg-background-light min-h-screen font-display">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <Link to="/dashboard" className="flex items-center gap-3">
                                <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-white">
                                    <span className="material-symbols-outlined">inventory_2</span>
                                </div>
                                <h1 className="text-xl font-bold tracking-tight text-slate-900">SalesFunnel</h1>
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-slate-500">Shop 4, Alaba Market</p>
                                <p className="text-xs text-slate-400">ID: SF-8821</p>
                            </div>
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">account_circle</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <Link to="/dashboard" className="text-slate-500 hover:text-slate-700">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-black text-slate-900">Notifications</h1>
                                <p className="text-slate-500 text-sm mt-1">
                                    {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
                                </p>
                            </div>
                        </div>

                        {notifications.length > 0 && (
                            <div className="flex items-center gap-2">
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-sm font-medium text-primary hover:text-blue-600 transition-colors"
                                    >
                                        Mark all as read
                                    </button>
                                )}
                                <button
                                    onClick={clearAll}
                                    className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="flex gap-2 border-b border-slate-200">
                        {tabs.map((tab) => {
                            const tabCount = tab.id === 'all'
                                ? notifications.length
                                : notifications.filter(n => n.type === tab.id).length;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab.id
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                                    {tab.name}
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {tabCount}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                    {filteredNotifications.length === 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">notifications_off</span>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">No notifications</h3>
                            <p className="text-slate-500">You're all caught up! Check back later for updates.</p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`bg-white rounded-xl border transition-all ${notification.read
                                        ? 'border-slate-200'
                                        : 'border-primary/30 shadow-sm'
                                    }`}
                            >
                                <div className="p-4 sm:p-5">
                                    <div className="flex gap-4">
                                        {/* Icon */}
                                        <div className={`flex-shrink-0 size-12 rounded-full ${notification.iconBg} flex items-center justify-center`}>
                                            <span className={`material-symbols-outlined ${notification.iconColor}`}>
                                                {notification.icon}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-bold text-slate-900">{notification.title}</h3>
                                                        {!notification.read && (
                                                            <span className="size-2 rounded-full bg-primary"></span>
                                                        )}
                                                    </div>
                                                    <p className="text-slate-600 text-sm">{notification.message}</p>
                                                    <p className="text-slate-400 text-xs mt-2">{notification.time}</p>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-1">
                                                    {!notification.read && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-blue-50 transition-colors"
                                                            title="Mark as read"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">
                                                                check_circle
                                                            </span>
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            close
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Back to Dashboard Link */}
                {filteredNotifications.length > 0 && (
                    <div className="mt-8 text-center">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 text-primary hover:text-blue-600 font-medium"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                            Back to Dashboard
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default NotificationsPage;
