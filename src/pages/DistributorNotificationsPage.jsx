import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DistributorNotificationsPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'payment',
            title: 'Payment Verified',
            message: 'Payment #TRX-9821 from Aliko & Sons Ent. has been verified - ₦245,000',
            time: '10 minutes ago',
            read: false,
            icon: 'payments',
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            id: 2,
            type: 'order',
            title: 'New Order Received',
            message: 'Order #SF-1209 from Lagos Retail Hub - 15 items worth ₦120,500',
            time: '1 hour ago',
            read: false,
            icon: 'shopping_bag',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            id: 3,
            type: 'inventory',
            title: 'Low Stock Alert',
            message: 'Dangote Sugar is running low (8 cases remaining). Consider restocking.',
            time: '2 hours ago',
            read: false,
            icon: 'warning',
            color: 'text-amber-600',
            bgColor: 'bg-amber-50'
        },
        {
            id: 4,
            type: 'payment',
            title: 'Payment Pending',
            message: 'Payment #TRX-9814 is awaiting verification - ₦85,000',
            time: '3 hours ago',
            read: true,
            icon: 'pending_actions',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            id: 5,
            type: 'order',
            title: 'Order Completed',
            message: 'Order #SF-1205 has been marked as completed and delivered',
            time: '5 hours ago',
            read: true,
            icon: 'check_circle',
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            id: 6,
            type: 'system',
            title: 'System Update',
            message: 'New features added to the payment verification system. Check it out!',
            time: '1 day ago',
            read: true,
            icon: 'info',
            color: 'text-slate-600',
            bgColor: 'bg-slate-50'
        }
    ]);

    const filters = [
        { id: 'all', label: 'All Notifications' },
        { id: 'order', label: 'Orders' },
        { id: 'payment', label: 'Payments' },
        { id: 'inventory', label: 'Inventory' },
        { id: 'system', label: 'System' }
    ];

    const filteredNotifications = notifications.filter(notif =>
        activeFilter === 'all' || notif.type === activeFilter
    );

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
        if (window.confirm('Are you sure you want to clear all notifications?')) {
            setNotifications([]);
        }
    };

    return (
        <div className="bg-background-light font-display flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0">
                {/* Logo */}
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg p-2 text-white">
                            <span className="material-symbols-outlined text-2xl">monitoring</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 text-lg font-bold leading-tight">SalesFunnel</h1>
                            <p className="text-slate-500 text-xs font-medium">Distributor Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-1">
                    <Link
                        to="/distributor-dashboard"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <a
                        href="#"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">shopping_bag</span>
                        <span className="text-sm font-medium">Orders</span>
                    </a>
                    <Link
                        to="/payments"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">payments</span>
                        <span className="text-sm font-medium">Payments</span>
                    </Link>
                    <Link
                        to="/inventory"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined">inventory_2</span>
                        <span className="text-sm font-medium">Inventory</span>
                    </Link>
                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <Link
                            to="/settings"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            <span className="material-symbols-outlined">settings</span>
                            <span className="text-sm font-medium">Settings</span>
                        </Link>
                    </div>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-slate-200">
                    <Link to="/distributor-profile" className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className="size-10 rounded-full bg-slate-200"></div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate">Adeola Johnson</p>
                            <p className="text-xs text-slate-500 truncate">Main Distributor</p>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-background-light">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Link to="/distributor-dashboard" className="text-slate-500 hover:text-slate-700">
                                    <span className="material-symbols-outlined">arrow_back</span>
                                </Link>
                                <div>
                                    <h2 className="text-slate-900 text-3xl font-black tracking-tight">Notifications</h2>
                                    <p className="text-slate-500 mt-1">
                                        {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        Mark all as read
                                    </button>
                                )}
                                {notifications.length > 0 && (
                                    <button
                                        onClick={clearAll}
                                        className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeFilter === filter.id
                                            ? 'bg-primary text-white'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {filter.label}
                                    {filter.id === 'all' && unreadCount > 0 && (
                                        <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="space-y-3">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`bg-white rounded-xl border border-slate-200 p-4 shadow-sm transition-all hover:shadow-md ${!notification.read ? 'ring-2 ring-primary/20' : ''
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`p-3 rounded-lg ${notification.bgColor} shrink-0`}>
                                            <span className={`material-symbols-outlined ${notification.color}`}>
                                                {notification.icon}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3 mb-1">
                                                <h3 className="font-bold text-slate-900">
                                                    {notification.title}
                                                    {!notification.read && (
                                                        <span className="ml-2 inline-flex items-center justify-center w-2 h-2 bg-primary rounded-full"></span>
                                                    )}
                                                </h3>
                                                <span className="text-xs text-slate-400 whitespace-nowrap">
                                                    {notification.time}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-3">{notification.message}</p>

                                            {/* Actions */}
                                            <div className="flex items-center gap-3">
                                                {!notification.read && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-xs font-semibold text-primary hover:underline"
                                                    >
                                                        Mark as read
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                                <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                                    <span className="material-symbols-outlined text-slate-400 text-5xl">
                                        notifications_off
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">No notifications</h3>
                                <p className="text-sm text-slate-500">
                                    {activeFilter === 'all'
                                        ? "You're all caught up! No new notifications at the moment."
                                        : `No ${activeFilter} notifications found.`
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DistributorNotificationsPage;
