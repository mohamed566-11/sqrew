import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Trophy, Settings, Plus, History, Languages, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MobileNavigationProps {
    activeTab: 'home' | 'history' | 'settings';
    onTabChange: (tab: 'home' | 'history' | 'settings') => void;
    onAddRound?: () => void;
    onResetGame?: () => void;
    onToggleLanguage?: () => void;
    showAddButton?: boolean;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
    activeTab,
    onTabChange,
    onAddRound,
    onResetGame,
    onToggleLanguage,
    showAddButton = true
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();

    const tabs = [
        { id: 'home', label: 'الرئيسية', icon: Home },
        { id: 'history', label: 'السجل', icon: History },
        { id: 'settings', label: 'الإعدادات', icon: Settings }
    ];

    const handleLanguageToggle = () => {
        toggleLanguage();
        if (onToggleLanguage) onToggleLanguage();
    };

    return (
        <>
            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 z-50 safe-pb">
                <div className="flex items-center justify-around h-20 px-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id as any)}
                                className={`flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all ${isActive
                                    ? 'text-[#FF9F1C] bg-[#FF9F1C]/10'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={24} className="mb-1" />
                                <span className="text-xs font-medium">{tab.label}</span>
                            </button>
                        );
                    })}


                </div>

                {/* Floating Add Button - Centered on Screen */}
                {showAddButton && onAddRound && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onAddRound}
                        className="fixed bottom-32 left-[46%] transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-[#FF9F1C] to-[#FF4D8D] rounded-full flex items-center justify-center shadow-2xl shadow-[#FF9F1C]/40 z-30"
                        aria-label="Add new round"
                    >
                        <Plus size={32} className="text-white" />
                    </motion.button>
                )}
            </nav>

            {/* Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-[#2A1E5C] border-l border-[#FF9F1C]/30 z-50 overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-white">Menu</h2>
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="p-2 text-gray-400 hover:text-white"
                                        aria-label="Close menu"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Menu Items */}
                                <div className="space-y-2">
                                    <button
                                        onClick={() => {
                                            onTabChange('home');
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 p-4 text-left text-gray-300 hover:bg-white/5 rounded-xl transition-colors"
                                    >
                                        <Home size={20} />
                                        <span>الرئيسية</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            onTabChange('history');
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 p-4 text-left text-gray-300 hover:bg-white/5 rounded-xl transition-colors"
                                    >
                                        <History size={20} />
                                        <span>سجل اللعبة</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            onTabChange('settings');
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 p-4 text-left text-gray-300 hover:bg-white/5 rounded-xl transition-colors"
                                    >
                                        <Settings size={20} />
                                        <span>الإعدادات</span>
                                    </button>

                                    {onResetGame && (
                                        <>
                                            <div className="border-t border-white/10 my-4" />
                                            <button
                                                onClick={() => {
                                                    onResetGame();
                                                    setIsMenuOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 p-4 text-left text-[#FF9F1C] hover:bg-[#FF9F1C]/20 rounded-xl transition-colors"
                                            >
                                                <RotateCcw size={20} />
                                                <span>إعداد اللعبة</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Hamburger Menu Button (Top Right) */}
            <button
                onClick={() => setIsMenuOpen(true)}
                className="fixed top-4 right-4 z-40 p-3 bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 text-white hover:bg-black/60 transition-colors"
                aria-label="Open menu"
            >
                <Menu size={24} />
            </button>
        </>
    );
};