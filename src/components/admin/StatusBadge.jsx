import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusStyles = () => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return {
                    bg: 'bg-orange-100',
                    text: 'text-orange-700',
                    label: 'Pending'
                };
            case 'paid':
                return {
                    bg: 'bg-blue-100',
                    text: 'text-blue-700',
                    label: 'Paid'
                };
            case 'approved':
            case 'ready':
                return {
                    bg: 'bg-purple-100',
                    text: 'text-purple-700',
                    label: 'Approved'
                };
            case 'completed':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-700',
                    label: 'Completed'
                };
            case 'cancelled':
            case 'rejected':
                return {
                    bg: 'bg-red-100',
                    text: 'text-red-700',
                    label: 'Cancelled'
                };
            case 'active':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-700',
                    label: 'Active'
                };
            case 'suspended':
                return {
                    bg: 'bg-red-100',
                    text: 'text-red-700',
                    label: 'Suspended'
                };
            case 'verified':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-700',
                    label: 'Verified'
                };
            case 'unverified':
                return {
                    bg: 'bg-amber-100',
                    text: 'text-amber-700',
                    label: 'Unverified'
                };
            default:
                return {
                    bg: 'bg-slate-100',
                    text: 'text-slate-700',
                    label: status || 'Unknown'
                };
        }
    };

    const styles = getStatusStyles();

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles.bg} ${styles.text}`}>
            {styles.label}
        </span>
    );
};

export default StatusBadge;
