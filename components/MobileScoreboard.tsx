import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, RotateCcw, Trash2, Crown, History, X, Settings, UserMinus, Eraser, Zap } from 'lucide-react';
import { GameState, GameActions } from '../types';
import { RoundInput } from './RoundInput';
import { Button } from './Button';
import { DeletePlayerModal } from './DeletePlayerModal';
import { DeleteRoundModal } from './DeleteRoundModal';
import { useNotifications } from './NotificationProvider';
import { useLanguage } from '../contexts/LanguageContext';
import { MobileNavigation } from './MobileNavigation';
import { MOBILE_CONSTANTS } from '../mobileConstants';

type Props = GameState & GameActions;

export const MobileScoreboard: React.FC<Props> = ({
    players,
    rounds,
    resetGame,
    resetScores,
    clearAllData,
    removePlayer,
    submitRound,
    deleteRound
}) => {
    const [activeTab, setActiveTab] = useState<'home' | 'history' | 'settings'>('home');
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showDeletePlayer, setShowDeletePlayer] = useState(false);
    const [showDeleteRound, setShowDeleteRound] = useState(false);
    const [showHistoryPanel, setShowHistoryPanel] = useState(false);
    const { showNotification } = useNotifications();
    const { t, language, toggleLanguage } = useLanguage();

    // Calculate ranks
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const leaderId = sortedPlayers[0]?.id;

    const handleRoundSubmit = (scores: Record<string, number>) => {
        submitRound(scores);
        setIsInputOpen(false);
        showNotification({
            type: 'success',
            title: t('notify.roundSubmitted'),
            message: 'New scores recorded successfully'
        });
    };



    const handlePlayerDelete = (playerId: string) => {
        const playerName = players.find(p => p.id === playerId)?.name || 'Player';
        removePlayer(playerId);
        showNotification({
            type: 'success',
            title: t('notify.playerRemoved'),
            message: `${playerName} has been removed from the game`
        });
    };

    const handleRoundDelete = (roundId: string) => {
        const roundNumber = rounds.find(r => r.id === roundId)?.number || 0;
        deleteRound(roundId);
        showNotification({
            type: 'success',
            title: t('notify.roundDeleted'),
            message: `Round ${roundNumber} has been deleted`
        });
    };

    const handleResetScores = () => {
        if (window.confirm(t('confirm.resetScores'))) {
            resetScores();
            showNotification({
                type: 'success',
                title: t('notify.scoresReset'),
                message: 'All player scores have been reset to zero'
            });
        }
    };

    const handleResetGame = () => {
        resetGame();
        showNotification({
            type: 'info',
            title: t('notify.gameReset'),
            message: 'Returned to player setup screen'
        });
    };

    const handleClearData = () => {
        if (window.confirm(t('confirm.clearData'))) {
            clearAllData();
            showNotification({
                type: 'warning',
                title: t('notify.dataCleared'),
                message: 'All game data has been permanently deleted'
            });
        }
    };

    const renderHomeTab = () => (
        <div className="pb-32 pt-6 safe-pt">
            {/* Header */}
            <div className="px-6 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/logo.png"
                            alt="Skrew Elite Logo"
                            className="w-10 h-10 object-contain"
                        />
                        <div>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF9F1C] to-[#FF4D8D]">
                                Skrew Elite
                            </h1>
                            <p className="text-xs text-gray-500 font-mono tracking-wider mt-1">
                                ROUND {rounds.length + 1}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleResetGame}
                        className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                        aria-label="Reset game"
                    >
                        <RotateCcw size={20} className="text-gray-300" />
                    </button>
                </div>
            </div>

            {/* Players List */}
            <div className="px-6">
                <div className="space-y-4">
                    <AnimatePresence>
                        {sortedPlayers.map((player, index) => {
                            const isLeader = player.id === leaderId && rounds.length > 0;
                            return (
                                <motion.div
                                    layout
                                    key={player.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`relative overflow-hidden rounded-2xl p-5 border transition-all ${isLeader
                                        ? 'bg-gradient-to-br from-[#FF9F1C]/20 to-[#FF4D8D]/10 border-[#FF9F1C]/50 shadow-lg shadow-[#FF9F1C]/20'
                                        : 'bg-white/10 border-white/20 hover:border-white/40'
                                        }`}
                                >
                                    {/* Rank Badge */}
                                    <div className="absolute top-3 right-3 text-xs font-mono text-gray-500">
                                        #{index + 1}
                                    </div>

                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${isLeader ? 'bg-[#FFC857] text-black' : 'bg-white/20 text-gray-300'
                                            }`}>
                                            {player.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-semibold text-lg truncate ${isLeader ? 'text-[#FFC857]' : 'text-gray-200'
                                                }`}>
                                                {player.name}
                                            </h3>
                                            {isLeader && (
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Crown size={14} className="text-[#FFC857] fill-[#FFC857]" />
                                                    <span className="text-xs text-[#FFC857]">LEADER</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between">
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">{t('scoreboard.totalScore')}</div>
                                            <div className={`text-4xl font-bold font-mono tracking-tighter ${isLeader ? 'text-white' : 'text-gray-300'
                                                }`}>
                                                {player.totalScore}
                                            </div>
                                        </div>

                                        {/* Last Round Diff */}
                                        {rounds.length > 0 && (
                                            <div className="text-right">
                                                <div className="text-xs text-gray-500 mb-1">{t('scoreboard.last')}</div>
                                                <div className="text-lg font-mono text-gray-400">
                                                    +{player.history[player.history.length - 1] || 0}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );

    const renderHistoryTab = () => (
        <div className="pb-32 pt-6 safe-pt">
            <div className="px-6">
                <div className="flex items-center gap-3 mb-6">
                    <History size={24} className="text-[#4DFFF3]" />
                    <h2 className="text-2xl font-bold text-white">{t('history.title')}</h2>
                </div>

                <div className="space-y-4">
                    {rounds.length === 0 ? (
                        <div className="text-center py-12 text-gray-600 bg-white/5 rounded-2xl border border-white/10">
                            <History size={48} className="mx-auto mb-4 text-gray-600" />
                            <p className="text-lg">{t('history.empty')}</p>
                            <p className="text-sm mt-2">{t('history.emptySubtitle')}</p>
                        </div>
                    ) : (
                        [...rounds].reverse().map((round) => (
                            <motion.div
                                key={round.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                        {t('history.round')} {round.number}
                                    </span>
                                    <button
                                        onClick={() => deleteRound(round.id)}
                                        className="p-2 text-gray-600 hover:text-red-400 transition-colors"
                                        aria-label="Delete round"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {players.map(player => (
                                        <div key={player.id} className="flex justify-between items-center">
                                            <span className="text-gray-400">{player.name}</span>
                                            <span className="font-mono text-white text-lg">
                                                {round.scores[player.id]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

    const renderSettingsTab = () => (
        <div className="pb-32 pt-6 safe-pt">
            <div className="px-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Settings size={24} className="text-[#7B61FF]" />
                    Settings
                </h2>

                <div className="space-y-3">

                    <button
                        onClick={handleResetScores}
                        className="w-full flex items-center gap-4 p-4 text-left bg-white/10 rounded-2xl border border-white/20 hover:border-[#FFC857]/40 transition-all"
                    >
                        <Eraser size={20} className="text-[#FFC857]" />
                        <div>
                            <div className="font-medium text-white">{t('settings.resetScores')}</div>
                            <div className="text-sm text-gray-400">{t('settings.resetScoresDesc')}</div>
                        </div>
                    </button>

                    <button
                        onClick={() => setShowDeletePlayer(true)}
                        className="w-full flex items-center gap-4 p-4 text-left bg-white/10 rounded-2xl border border-white/20 hover:border-red-400/40 transition-all"
                    >
                        <UserMinus size={20} className="text-red-400" />
                        <div>
                            <div className="font-medium text-white">{t('settings.deletePlayer')}</div>
                            <div className="text-sm text-gray-400">{t('settings.deletePlayerDesc')}</div>
                        </div>
                    </button>

                    <button
                        onClick={() => setShowDeleteRound(true)}
                        className="w-full flex items-center gap-4 p-4 text-left bg-white/10 rounded-2xl border border-white/20 hover:border-red-400/40 transition-all"
                    >
                        <Trash2 size={20} className="text-red-400" />
                        <div>
                            <div className="font-medium text-white">{t('settings.deleteRound')}</div>
                            <div className="text-sm text-gray-400">{t('settings.deleteRoundDesc')}</div>
                        </div>
                    </button>

                    <button
                        onClick={handleResetGame}
                        className="w-full flex items-center gap-4 p-4 text-left bg-white/10 rounded-2xl border border-white/20 hover:border-[#4DFFF3]/40 transition-all"
                    >
                        <RotateCcw size={20} className="text-[#4DFFF3]" />
                        <div>
                            <div className="font-medium text-white">{t('settings.resetGame')}</div>
                            <div className="text-sm text-gray-400">{t('settings.resetGameDesc')}</div>
                        </div>
                    </button>

                    <button
                        onClick={handleClearData}
                        className="w-full flex items-center gap-4 p-4 text-left bg-red-500/20 rounded-2xl border border-red-400/30 hover:border-red-400/60 transition-all"
                    >
                        <Zap size={20} className="text-red-400" />
                        <div>
                            <div className="font-medium text-red-400">{t('settings.clearData')}</div>
                            <div className="text-sm text-red-300">{t('settings.clearDataDesc')}</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#1B1F3B] text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-[#FF9F1C]/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#FF4D8D]/20 rounded-full blur-[100px]" />
            </div>

            {/* Main Content */}
            <main className="h-full overflow-y-auto">
                {activeTab === 'home' && renderHomeTab()}
                {activeTab === 'history' && renderHistoryTab()}
                {activeTab === 'settings' && renderSettingsTab()}
            </main>

            {/* Mobile Navigation */}
            <MobileNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onAddRound={() => setIsInputOpen(true)}
                onResetGame={handleResetGame}
                showAddButton={activeTab === 'home'}
            />

            {/* Modals */}
            <AnimatePresence>
                {isInputOpen && (
                    <RoundInput
                        players={players}
                        roundNumber={rounds.length + 1}
                        onClose={() => setIsInputOpen(false)}
                        onSubmit={handleRoundSubmit}
                    />
                )}


                {showDeletePlayer && (
                    <DeletePlayerModal
                        players={players}
                        onClose={() => setShowDeletePlayer(false)}
                        onDelete={handlePlayerDelete}
                    />
                )}

                {showDeleteRound && (
                    <DeleteRoundModal
                        rounds={rounds}
                        onClose={() => setShowDeleteRound(false)}
                        onDelete={handleRoundDelete}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};