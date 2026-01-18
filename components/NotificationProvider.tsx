import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    duration?: number;
}

interface NotificationContextType {
    showNotification: (notification: Omit<Notification, 'id'>) => void;
}

const NotificationContext = React.createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
    const context = React.useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const showNotification = (notification: Omit<Notification, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification = { ...notification, id, duration: notification.duration || 4000 };

        setNotifications(prev => [...prev, newNotification]);

        // Auto remove after duration
        setTimeout(() => {
            removeNotification(id);
        }, newNotification.duration);
    };

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
            case 'error': return <XCircle className="w-5 h-5 text-red-400" />;
            case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
            default: return <Info className="w-5 h-5 text-blue-400" />;
        }
    };

    const getBackgroundColor = (type: NotificationType) => {
        switch (type) {
            case 'success': return 'bg-green-500/20 border-green-500/30';
            case 'error': return 'bg-red-500/20 border-red-500/30';
            case 'warning': return 'bg-yellow-500/20 border-yellow-500/30';
            default: return 'bg-blue-500/20 border-blue-500/30';
        }
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
                <AnimatePresence>
                    {notifications.map((notification) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className={`p-4 rounded-xl border backdrop-blur-xl ${getBackgroundColor(notification.type)}`}
                        >
                            <div className="flex items-start gap-3">
                                {getIcon(notification.type)}
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white">{notification.title}</h4>
                                    <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                                </div>
                                <button
                                    onClick={() => removeNotification(notification.id)}
                                    aria-label="Close notification"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
};