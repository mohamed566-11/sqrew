import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, RotateCcw, Trash2, Crown, ChevronDown, ChevronUp, History, X, Settings, UserMinus, Eraser, Zap, Lightbulb, MoreHorizontal, Languages } from 'lucide-react';
import { GameState, GameActions } from '../types';
import { RoundInput } from './RoundInput';
import { Button } from './Button';
import { SuggestionModal } from './SuggestionModal';
import { DeletePlayerModal } from './DeletePlayerModal';
import { DeleteRoundModal } from './DeleteRoundModal';
import { useNotifications } from './NotificationProvider';
import { useLanguage } from '../contexts/LanguageContext';
import { MobileNavigation } from './MobileNavigation';
import { MOBILE_CONSTANTS } from '../mobileConstants';

type Props = GameState & GameActions;

export const Scoreboard: React.FC<Props> = ({
  players,
  rounds,
  resetGame,
  resetScores,
  clearAllData,
  removePlayer,
  submitRound,
  deleteRound
}) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDeletePlayer, setShowDeletePlayer] = useState(false);
  const [showDeleteRound, setShowDeleteRound] = useState(false);
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

  const handleSuggestionSubmit = (suggestion: string) => {
    // In a real app, this would send to backend
    showNotification({
      type: 'success',
      title: 'Feedback Received',
      message: 'Thank you for your suggestion!'
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
    console.log("Setup button clicked!");
    resetGame();
    showNotification({
      type: 'info',
      title: t('notify.gameReset'),
      message: 'Returned to player setup screen'
    });
  };

  const handleDirectSetup = () => {
    console.log("Direct setup button clicked!");
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

  return (
    <div className="min-h-screen bg-[#1B1F3B] text-white flex flex-col md:flex-row overflow-hidden">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-[#FF9F1C]/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#FF4D8D]/20 rounded-full blur-[100px]" />
      </div>

      {/* LEFT PANEL: MAIN SCOREBOARD */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden z-10 relative">
        {/* Header */}
        <header className="p-6 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-md relative z-50">
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
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDirectSetup}
              icon={<RotateCcw size={14} />}
            >
              إعداد
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              icon={<Settings size={14} />}
            >
              خيارات
            </Button>
          </div>
        </header>

        {/* Players Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence>
              {sortedPlayers.map((player, index) => {
                const isLeader = player.id === leaderId && rounds.length > 0;
                return (
                  <motion.div
                    layout
                    key={player.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 ${isLeader
                      ? 'bg-gradient-to-br from-[#FF9F1C]/20 to-[#FF4D8D]/10 border-[#FF9F1C]/50 shadow-lg shadow-[#FF9F1C]/20'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                  >
                    {/* Rank Badge */}
                    <div className="absolute top-3 right-3 text-xs font-mono text-gray-500">
                      #{index + 1}
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${isLeader ? 'bg-[#FFC857] text-black' : 'bg-white/10 text-gray-300'
                        }`}>
                        {player.name.charAt(0).toUpperCase()}
                      </div>
                      <h3 className={`font-semibold text-lg truncate ${isLeader ? 'text-[#FFC857]' : 'text-gray-200'}`}>
                        {player.name}
                      </h3>
                      {isLeader && <Crown size={16} className="text-[#FFC857] fill-[#FFC857]" />}
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

        {/* Action Bar (Mobile Sticky) */}
        <div className="p-4 md:p-6 border-t border-white/5 bg-black/40 backdrop-blur-xl md:bg-transparent md:backdrop-filter-none flex flex-col md:flex-row gap-4 items-center justify-center">
          <Button
            onClick={() => setIsInputOpen(true)}
            size="lg"
            className="w-full md:w-auto shadow-xl shadow-[#FF9F1C]/20 min-w-[200px]"
            icon={<Plus size={24} />}
          >
            {t('scoreboard.addRound')}
          </Button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="md:hidden flex items-center gap-2 text-sm text-gray-400 py-2"
          >
            {showHistory ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            {showHistory ? t('scoreboard.hideHistory') : t('scoreboard.viewHistory')}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL: HISTORY (Desktop: Sidebar, Mobile: Drawer/Accordion) */}
      <motion.div
        className={`bg-black/40 border-l border-white/10 overflow-hidden flex flex-col z-20 
          ${showHistory ? 'fixed inset-0 md:static' : 'hidden md:flex md:w-80 lg:w-96'}
        `}
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <History size={18} className="text-[#4DFFF3]" />
            <h2 className="font-semibold text-lg">{t('history.title')}</h2>
          </div>
          <button onClick={() => setShowHistory(false)} aria-label="Close history" className="md:hidden p-2">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {rounds.length === 0 ? (
            <div className="text-center text-gray-600 mt-10">
              <p>{t('history.empty')}</p>
              <p className="text-sm mt-2">{t('history.emptySubtitle')}</p>
            </div>
          ) : (
            [...rounds].reverse().map((round) => (
              <div key={round.id} className="bg-[#2A1E5C] rounded-xl p-4 border border-white/10 hover:border-[#FF9F1C]/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{t('history.round')} {round.number}</span>
                  <button
                    onClick={() => deleteRound(round.id)}
                    className="text-gray-600 hover:text-red-400 transition-colors p-1"
                    title="Delete Round"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="space-y-2">
                  {players.map(player => (
                    <div key={player.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">{player.name}</span>
                      <span className="font-mono text-white">
                        {round.scores[player.id]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* SETTINGS DROPDOWN */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/50"
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-20 right-6 z-40 w-64 bg-[#2A1E5C] border border-[#FF9F1C]/30 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-2 space-y-1">
                <button
                  onClick={() => {
                    setShowSuggestions(true);
                    setShowSettings(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-[#7B61FF]/20 rounded-lg transition-colors"
                >
                  <Lightbulb size={16} className="text-[#7B61FF]" />
                  {t('settings.suggestions')}
                </button>

                <div className="border-t border-white/5 my-1" />

                <button
                  onClick={() => {
                    handleResetScores();
                    setShowSettings(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-[#FFC857]/20 rounded-lg transition-colors"
                >
                  <Eraser size={16} className="text-[#FFC857]" />
                  {t('settings.resetScores')}
                </button>

                <button
                  onClick={() => {
                    setShowDeletePlayer(true);
                    setShowSettings(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <UserMinus size={16} className="text-red-400" />
                  {t('settings.deletePlayer')}
                </button>

                <button
                  onClick={() => {
                    setShowDeleteRound(true);
                    setShowSettings(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="text-red-400" />
                  {t('settings.deleteRound')}
                </button>

                <button
                  onClick={() => {
                    handleResetGame();
                    setShowSettings(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-300 hover:bg-[#4DFFF3]/20 rounded-lg transition-colors"
                >
                  <RotateCcw size={16} className="text-[#4DFFF3]" />
                  {t('settings.resetGame')}
                </button>

                <button
                  onClick={() => {
                    handleClearData();
                    setShowSettings(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Zap size={16} />
                  {t('settings.clearData')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODALS */}
      <AnimatePresence>
        {isInputOpen && (
          <RoundInput
            players={players}
            roundNumber={rounds.length + 1}
            onClose={() => setIsInputOpen(false)}
            onSubmit={handleRoundSubmit}
          />
        )}

        {showSuggestions && (
          <SuggestionModal
            onClose={() => setShowSuggestions(false)}
            onSubmit={handleSuggestionSubmit}
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