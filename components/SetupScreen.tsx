import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, X, Play, Trophy, Languages } from 'lucide-react';
import { Player } from '../types';
import { Button } from './Button';
import { MAX_PLAYERS, MIN_PLAYERS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#1B1F3B]">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#FF9F1C]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#FF4D8D]/20 rounded-full blur-[100px]" />
        {/* Logo Background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
          <img
            src="/images/logo.png"
            alt="Skrew Elite Logo"
            className="w-96 h-96 object-contain"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#2A1E5C] backdrop-blur-xl border border-[#FF9F1C]/30 p-8 rounded-3xl shadow-2xl relative"
      >
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleLanguage}
            icon={<Languages size={14} />}
          >
            {language === 'en' ? 'عربي' : 'ENG'}
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <img
              src="/images/logo.png"
              alt="Skrew Elite Logo"
              className="w-32 h-32 object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF9F1C] to-[#FF4D8D]">
            {t('setup.title')}
          </h1>
          <p className="text-gray-400 mt-2">{t('setup.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('setup.placeholder')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4DFFF3] focus:ring-1 focus:ring-[#4DFFF3] transition-all"
              autoFocus
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || players.length >= MAX_PLAYERS}
              aria-label={t('setup.addPlayer')}
              className="absolute right-2 top-2 p-1.5 bg-white/10 rounded-lg text-[#4DFFF3] hover:bg-[#4DFFF3] hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus size={20} />
            </button>
          </div>
          <div className="text-right mt-2 text-xs text-gray-500">
            {players.length}/{MAX_PLAYERS} Players
          </div>
        </form>

        <div className="space-y-3 mb-8 min-h-[150px]">
          <AnimatePresence mode='popLayout'>
            {players.map((player) => (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group"
              >
                <span className="font-medium text-lg">{player.name}</span>
                <button
                  onClick={() => onRemovePlayer(player.id)}
                  aria-label={`Remove ${player.name}`}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X size={18} />
                </button>
              </motion.div>
            ))}
            {players.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-600 border border-dashed border-white/10 rounded-xl"
              >
                {t('setup.noPlayers')}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={onStartGame}
          disabled={players.length < MIN_PLAYERS}
          icon={<Play size={20} fill="currentColor" />}
        >
          {t('setup.startGame')}
        </Button>
      </motion.div>
    </div>
  );
};