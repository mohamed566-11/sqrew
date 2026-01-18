import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Translation dictionary
const translations = {
    en: {
        // Setup Screen
        'setup.title': 'Skrew Elite',
        'setup.subtitle': 'Initialize Mission',
        'setup.placeholder': 'Enter player name...',
        'setup.addPlayer': 'Add Player',
        'setup.noPlayers': 'No players added yet',
        'setup.startGame': 'Start Game',

        // Scoreboard
        'scoreboard.round': 'ROUND',
        'scoreboard.options': 'Options',
        'scoreboard.addRound': 'Add Round',
        'scoreboard.viewHistory': 'View History',
        'scoreboard.hideHistory': 'Hide History',
        'scoreboard.totalScore': 'Total Score',
        'scoreboard.last': 'Last',

        // History Panel
        'history.title': 'History',
        'history.empty': 'No rounds yet.',
        'history.emptySubtitle': 'Start playing to populate history.',
        'history.round': 'Round',

        // Modals
        'modal.close': 'Close',
        'modal.submit': 'Submit',
        'modal.delete': 'Delete',

        // Settings Menu
        'settings.suggestions': 'Submit Suggestions',
        'settings.resetScores': 'Reset Scores',
        'settings.deletePlayer': 'Delete Player',
        'settings.deleteRound': 'Delete Round',
        'settings.resetGame': 'Reset Game',
        'settings.clearData': 'Clear All Data',

        // Notifications
        'notify.playerAdded': 'Player Added',
        'notify.playerRemoved': 'Player Removed',
        'notify.roundSubmitted': 'Round Submitted',
        'notify.roundDeleted': 'Round Deleted',
        'notify.scoresReset': 'Scores Reset',
        'notify.gameReset': 'Game Reset',
        'notify.dataCleared': 'All Data Cleared',

        // Confirmations
        'confirm.resetScores': 'Reset all scores to zero? Players and game will continue.',
        'confirm.resetGame': 'Are you sure you want to end this game and return to setup?',
        'confirm.clearData': '⚠️ PERMANENTLY DELETE ALL GAME DATA? This cannot be undone.',

        // Errors
        'error.minPlayers': 'Minimum 2 players required',
        'error.maxPlayers': 'Maximum 12 players allowed'
    },
    ar: {
        // Setup Screen
        'setup.title': 'Skrew Elite',
        'setup.subtitle': 'تهيئة المهمة',
        'setup.placeholder': 'أدخل اسم اللاعب...',
        'setup.addPlayer': 'إضافة لاعب',
        'setup.playersCount': '{count} من {max} لاعب',
        'setup.playersHeader': 'اللاعبون ({count})',
        'setup.addPlayersHint': 'أضف لاعبين لبدء اللعبة',
        'setup.noPlayers': 'لم تتم إضافة لاعبين بعد',
        'setup.startGame': 'بدء اللعبة',

        // Scoreboard
        'scoreboard.round': 'الجولة',
        'scoreboard.options': 'الخيارات',
        'scoreboard.addRound': 'إضافة جولة',
        'scoreboard.viewHistory': 'عرض التاريخ',
        'scoreboard.hideHistory': 'إخفاء التاريخ',
        'scoreboard.totalScore': 'المجموع الكلي',
        'scoreboard.last': 'الأخير',

        // History Panel
        'history.title': 'التاريخ',
        'history.empty': 'لا توجد جولات بعد.',
        'history.emptySubtitle': 'ابدأ اللعب لملء التاريخ.',
        'history.round': 'الجولة',

        // Modals
        'modal.close': 'إغلاق',
        'modal.submit': 'إرسال',
        'modal.delete': 'حذف',

        // Settings Menu
        'settings.suggestions': 'إرسال اقتراحات',
        'settings.resetScores': 'إعادة تعيين النقاط',
        'settings.deletePlayer': 'حذف لاعب',
        'settings.deleteRound': 'حذف جولة',
        'settings.resetGame': 'إعادة اللعبة',
        'settings.clearData': 'مسح كل البيانات',

        // Modal Titles
        'modal.deletePlayer': 'حذف لاعب',
        'modal.selectPlayerToRemove': 'اختر لاعبًا للحذف',
        'modal.noPlayersToDelete': 'لا يوجد لاعبون للحذف',
        'modal.playerScore': 'النقاط: {score}',

        // Round Input Modal
        'modal.roundInputTitle': 'الجولة {round}',
        'modal.enterScores': 'أدخل نقاط جميع اللاعبين',
        'modal.submitRound': 'إرسال الجولة',
        'modal.scorePlaceholder': '0',

        // Settings Menu Descriptions
        'settings.resetScoresDesc': 'إعادة تعيين جميع نقاط اللاعبين إلى الصفر',
        'settings.deletePlayerDesc': 'إزالة لاعب من اللعبة',
        'settings.deleteRoundDesc': 'إزالة جولة محددة',
        'settings.resetGameDesc': 'العودة إلى إعداد اللاعبين',
        'settings.clearDataDesc': 'حذف جميع بيانات اللعبة بشكل دائم',

        // Notifications
        'notify.playerAdded': 'تمت إضافة اللاعب',
        'notify.playerRemoved': 'تم حذف اللاعب',
        'notify.roundSubmitted': 'تم إرسال الجولة',
        'notify.roundDeleted': 'تم حذف الجولة',
        'notify.scoresReset': 'تم إعادة تعيين النقاط',
        'notify.gameReset': 'تمت إعادة اللعبة',
        'notify.dataCleared': 'تم مسح جميع البيانات',

        // Confirmations
        'confirm.resetScores': 'هل تريد إعادة تعيين جميع النقاط إلى صفر؟ ستكمل اللاعبون واللعبة.',
        'confirm.resetGame': 'هل أنت متأكد من أنك تريد إنهاء هذه اللعبة والعودة إلى الإعداد؟',
        'confirm.clearData': '⚠️ هل تريد حذف جميع بيانات اللعبة نهائيًا؟ لا يمكن التراجع عن هذا.',

        // Errors
        'error.minPlayers': 'مطلوب 2 لاعبين على الأقل',
        'error.maxPlayers': 'مسموح بحد أقصى 12 لاعبًا'
    }
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ar'); // Default to Arabic

    useEffect(() => {
        // Force Arabic language
        setLanguage('ar');
        localStorage.setItem('skrew_language', 'ar');
    }, []);

    // Remove toggle functionality - app is Arabic only
    const toggleLanguage = () => {
        // Do nothing - language is fixed to Arabic
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.en] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};