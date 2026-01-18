import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, X, Play, Trophy, Languages } from 'lucide-react';
import { Player } from '../types';
import { Button } from './Button';
import { MAX_PLAYERS, MIN_PLAYERS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { MOBILE_CONSTANTS, MOBILE_CLASSES } from '../mobileConstants';

interface SetupScreenProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
  onStartGame: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  players,
  onAddPlayer,
  onRemovePlayer,
  onStartGame
}) => {
  const [inputValue, setInputValue] = useState('');
  const { t, language, toggleLanguage } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && players.length < MAX_PLAYERS) {
      onAddPlayer(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="min-h-screen bg-[#1B1F3B] text-white flex flex-col relative overflow-hidden safe-pt safe-pb">
      {/* Background Effects - Mobile Optimized */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#FF9F1C]/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[350px] h-[350px] bg-[#FF4D8D]/15 rounded-full blur-[90px]" />
      </div>

      {/* Header Section */}
      <header className="p-6 pt-12 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <img
            src="/images/logo.png"
            alt="Skrew Elite Logo"
            className="w-24 h-24 object-contain drop-shadow-xl"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF9F1C] to-[#FF4D8D] mb-2"
        >
          {t('setup.title')}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-base"
        >
          {t('setup.subtitle')}
        </motion.p>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-6 pb-32 overflow-y-auto">
        {/* Player Input Section */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="relative mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('setup.placeholder')}
              className={`${MOBILE_CLASSES.input} w-full bg-white/10 border-2 border-white/20 focus:border-[#4DFFF3] focus:ring-2 focus:ring-[#4DFFF3]/30 transition-all text-white placeholder-gray-400`}
              autoFocus
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!inputValue.trim() || players.length >= MAX_PLAYERS}
              aria-label={t('setup.addPlayer')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-[#FF9F1C] to-[#FF4D8D] rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <UserPlus size={24} />
            </motion.button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-500">
              {t('setup.playersCount')
                .replace('{count}', players.length.toString())
                .replace('{max}', MAX_PLAYERS.toString())}
            </span>
          </div>
        </motion.form>

        {/* Players List Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3 min-h-[200px]"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Trophy className="text-[#FFC857]" size={24} />
            {t('setup.playersHeader').replace('{count}', players.length.toString())}
          </h2>

          <AnimatePresence mode='popLayout'>
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 30 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-[#FF9F1C]/40 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9F1C] to-[#FF4D8D] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-lg text-white">{player.name}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemovePlayer(player.id)}
                  aria-label={`Remove ${player.name}`}
                  className="p-3 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-xl transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </motion.div>
            ))}

            {players.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500 border-2 border-dashed border-white/20 rounded-2xl bg-white/5"
              >
                <UserPlus size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-lg">{t('setup.noPlayers')}</p>
                <p className="text-sm mt-2">{t('setup.addPlayersHint')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Fixed Bottom Action Button */}
      <div className="fixed bottom-24 left-6 right-6 z-20 safe-pb">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            fullWidth
            size="lg"
            onClick={onStartGame}
            disabled={players.length < MIN_PLAYERS}
            className={`${MOBILE_CLASSES.button} h-16 text-lg font-semibold shadow-2xl shadow-[#FF9F1C]/30`}
            icon={<Play size={24} fill="currentColor" />}
          >
            {t('setup.startGame')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};