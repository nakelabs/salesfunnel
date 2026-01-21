import React from 'react';
import AdminNavbar from './AdminNavbar';

const AdminLayout = ({ children }) => {

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'Josefin Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Navbar */}
            <AdminNavbar />

            {/* Main Content */}
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
