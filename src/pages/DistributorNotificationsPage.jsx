import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DistributorNavbar from '../components/DistributorNavbar';
import { Star, FileText, Trash2, Search, Bell, MoreVertical } from 'lucide-react';

const DistributorNotificationsPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: "Order #SF-1209 from Lagos Retail Hub has been placed. Amount: ₦245,000. Awaiting payment verification.",
            time: 'Just Now',
            read: false,
            favorite: false,
            archived: false
        },
        {
            id: 2,
            message: 'Payment verification complete for order #SF-1205. Amount: ₦120,500 has been confirmed. You can now proceed with shipping.',
            time: '30 minutes ago',
            read: false,
            favorite: true,
            archived: false
        },
        {
            id: 3,
            message: "Low Stock Alert: Dangote Sugar is running low (only 8 units remaining). Consider restocking soon to avoid shortage.",
            time: '2 hours ago',
            read: false,
            favorite: false,
            archived: false
        },
        {
            id: 4,
            message: "New wholesaler registration: 'Quick-Buy Vendors' has joined your distribution network. Review their profile and approve.",
            time: '5 hours ago',
            read: true,
            favorite: true,
            archived: false
        },
        {
            id: 5,
            message: "Monthly revenue summary: You earned ₦4,520,000 this month, an increase of 12.5% from last month. View detailed report.",
            time: '1 day ago',
            read: true,
            favorite: false,
            archived: false
        },
        {
            id: 6,
            message: 'System Update: New analytics dashboard is now available. Track your sales, inventory, and revenue in real-time.',
            time: '2 days ago',
            read: true,
            favorite: false,
            archived: false
        },
        {
            id: 7,
            message: "Delivery completed for order #SF-1192. Wholesaler 'Golden Star Stores' has confirmed receipt of 500 units.",
            time: '3 days ago',
            read: true,
            favorite: true,
            archived: false
        },
        {
            id: 8,
            message: 'Price update reminder: Remember to update your product prices before the end of the month to reflect current market rates.',
            time: '5 days ago',
            read: true,
            favorite: false,
            archived: false
        },
    ]);

    const toggleFavorite = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, favorite: !n.favorite } : n
        ));
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const archiveNotification = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, archived: true } : n
        ));
    };

    const filteredNotifications = notifications.filter(n => {
        if (n.archived && activeTab !== 'archived') return false;

        const matchesTab =
            activeTab === 'all' ||
            (activeTab === 'unread' && !n.read) ||
            (activeTab === 'favorites' && n.favorite) ||
            (activeTab === 'archived' && n.archived);

        const matchesSearch = searchQuery === '' ||
            n.message.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    const unreadCount = notifications.filter(n => !n.read && !n.archived).length;

    return (
        <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Navbar */}
            <DistributorNavbar />

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Bell className="text-primary" size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
                                <p className="text-sm text-slate-500">
                                    You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search notifications..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="flex gap-6 border-b border-slate-200">
                        {[
                            { id: 'all', label: 'All', count: notifications.filter(n => !n.archived).length },
                            { id: 'unread', label: 'Unread', count: unreadCount },
                            { id: 'favorites', label: 'Favorites', count: notifications.filter(n => n.favorite && !n.archived).length },
                            { id: 'archived', label: 'Archived', count: notifications.filter(n => n.archived).length }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-3 px-1 text-sm font-semibold border-b-2 transition-colors relative ${activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {tab.label}
                                {tab.count > 0 && (
                                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === tab.id
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-2">
                    {filteredNotifications.length === 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bell className="text-slate-400" size={32} />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">No notifications</h3>
                            <p className="text-slate-500">You're all caught up! Check back later for updates.</p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`group bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all ${!notification.read ? 'bg-blue-50/50' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Favorite Star */}
                                    <button
                                        onClick={() => toggleFavorite(notification.id)}
                                        className="mt-1 flex-shrink-0"
                                    >
                                        <Star
                                            size={18}
                                            className={`transition-colors ${notification.favorite
                                                    ? 'fill-amber-400 text-amber-400'
                                                    : 'text-slate-300 hover:text-amber-400'
                                                }`}
                                        />
                                    </button>

                                    {/* Icon */}
                                    <div className="flex-shrink-0 mt-0.5">
                                        <FileText size={18} className="text-slate-400" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm ${!notification.read ? 'font-semibold text-slate-900' : 'text-slate-600'
                                            }`}>
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!notification.read && (
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                                                title="Mark as read"
                                            >
                                                <span className="material-symbols-outlined text-slate-400 text-lg">done</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteNotification(notification.id)}
                                            className="p-1.5 hover:bg-red-50 rounded transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} className="text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DistributorNotificationsPage;
