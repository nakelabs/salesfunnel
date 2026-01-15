import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WholesalerNavbar from '../components/WholesalerNavbar';
import { Star, FileText, Trash2, Search, Bell, MoreVertical } from 'lucide-react';

const NotificationsPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: "Order #SF-8821 confirmed! Your order of 50 bags of Dangote Sugar has been processed and will be delivered within 2 hours.",
            time: 'Just Now',
            read: false,
            favorite: false,
            archived: false
        },
        {
            id: 2,
            message: 'Price Drop Alert: Indomie Chicken Noodles 120 Cartons now ₦45,000 (was ₦52,000). Save ₦7,000 on your next order!',
            time: '30 minutes ago',
            read: false,
            favorite: true,
            archived: false
        },
        {
            id: 3,
            message: "Your order #SF-8734 is out for delivery. Expected arrival time: 3:45 PM. Track your delivery in real-time.",
            time: '2 hours ago',
            read: false,
            favorite: false,
            archived: false
        },
        {
            id: 4,
            message: "Stock Alert: Nestle Milo 400g Refill Pack is back in stock! Order now before it runs out again.",
            time: '5 hours ago',
            read: true,
            favorite: true,
            archived: false
        },
        {
            id: 5,
            message: "Payment received for order #SF-8621. Amount: ₦285,000. Your account has been credited. Thank you for your business!",
            time: '1 day ago',
            read: true,
            favorite: false,
            archived: false
        },
        {
            id: 6,
            message: 'New Product Alert: 25 new beverage products added to our catalog including Golden Morn, Peak Milk, and more. Check them out!',
            time: '2 days ago',
            read: true,
            favorite: false,
            archived: false
        },
        {
            id: 7,
            message: "Delivery completed for order #SF-8512. Please confirm receipt and rate your delivery experience.",
            time: '3 days ago',
            read: true,
            favorite: true,
            archived: false
        },
        {
            id: 8,
            message: 'Flash Sale Alert: Get 15% off on all Frozen Foods category. Valid until midnight tonight. Shop now and save!',
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

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const getFilteredNotifications = () => {
        let filtered = notifications;

        if (activeTab === 'archive') {
            filtered = filtered.filter(n => n.archived);
        } else if (activeTab === 'favorite') {
            filtered = filtered.filter(n => n.favorite);
        } else {
            filtered = filtered.filter(n => !n.archived);
        }

        if (searchQuery) {
            filtered = filtered.filter(n =>
                n.message.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    const filteredNotifications = getFilteredNotifications();
    const allCount = notifications.filter(n => !n.archived && !n.read).length;
    const archiveCount = notifications.filter(n => n.archived).length;
    const favoriteCount = notifications.filter(n => n.favorite).length;

    return (
        <div className="bg-slate-50 min-h-screen font-display" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <WholesalerNavbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Bell size={24} className="text-slate-700" />
                            List Notification
                        </h1>
                        <button className="text-slate-600 hover:text-slate-900">
                            <MoreVertical size={20} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-600 font-medium">
                            {notifications.length} Notification
                        </p>

                        <div className="relative w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by Name Product"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>
                </div>

                {/* Notifications Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Tabs */}
                    <div className="flex justify-between border-b border-slate-200 px-6">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`relative flex items-center gap-3 px-0 py-4 text-sm font-medium transition-colors ${activeTab === 'all'
                                ? 'text-slate-900'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {allCount > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold min-w-[32px] text-center">
                                    {allCount}
                                </span>
                            )}
                            All
                            {activeTab === 'all' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab('archive')}
                            className={`relative flex items-center gap-2 px-0 py-4 text-sm font-medium transition-colors ${activeTab === 'archive'
                                ? 'text-slate-900'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            <span className="text-sm">{archiveCount}</span>
                            Archive
                            {activeTab === 'archive' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab('favorite')}
                            className={`relative flex items-center gap-2 px-0 py-4 text-sm font-medium transition-colors ${activeTab === 'favorite'
                                ? 'text-slate-900'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            <span className="text-sm">{favoriteCount}</span>
                            Favorite
                            {activeTab === 'favorite' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
                            )}
                        </button>
                    </div>

                    {/* Notifications List */}
                    <div>
                        {filteredNotifications.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-slate-500">No notifications found</p>
                            </div>
                        ) : (
                            filteredNotifications.map((notification, index) => (
                                <div
                                    key={notification.id}
                                    className={`flex items-center gap-3 px-6 py-4 hover:bg-slate-50 transition-colors ${index !== filteredNotifications.length - 1 ? 'border-b border-slate-100' : ''
                                        }`}
                                >
                                    {/* Status Dot */}
                                    <div className="flex-shrink-0 w-6 flex justify-center">
                                        <span className={`size-2 rounded-full ${!notification.read ? 'bg-green-500' : 'bg-slate-300'
                                            }`}></span>
                                    </div>

                                    {/* Star Icon */}
                                    <button
                                        onClick={() => toggleFavorite(notification.id)}
                                        className="flex-shrink-0 transition-colors"
                                    >
                                        {notification.favorite ? (
                                            <Star size={20} className="fill-slate-900 text-slate-900" />
                                        ) : (
                                            <Star size={20} className="text-slate-300 hover:text-slate-400" />
                                        )}
                                    </button>

                                    {/* Document Icon */}
                                    <div className="flex-shrink-0">
                                        <FileText size={20} className="text-slate-400" />
                                    </div>

                                    {/* Message */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-slate-600 truncate">
                                            {notification.message}
                                        </p>
                                    </div>

                                    {/* Time */}
                                    <div className="flex-shrink-0 text-xs text-slate-400 w-28 text-right">
                                        {notification.time}
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => deleteNotification(notification.id)}
                                        className="flex-shrink-0 size-9 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotificationsPage;
