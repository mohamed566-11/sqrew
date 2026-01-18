import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Calculator } from 'lucide-react';
import { Player } from '../types';
import { Button } from './Button';

interface RoundInputProps {
  players: Player[];
  onClose: () => void;
  onSubmit: (scores: Record<string, number>) => void;
  roundNumber: number;
}

export const RoundInput: React.FC<RoundInputProps> = ({ players, onClose, onSubmit, roundNumber }) => {
  const [scores, setScores] = useState<Record<string, string>>({});
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus first input on mount
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);
  }, []);

  const handleScoreChange = (playerId: string, value: string) => {
    setScores(prev => ({
      ...prev,
      [playerId]: value
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextInput = document.getElementById(`score-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      } else {
        // Last input, submit
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    const finalScores: Record<string, number> = {};
    let isValid = true;

    players.forEach(p => {
      const val = scores[p.id];
      if (val === undefined || val === '') {
        isValid = false;
        return;
      }
      finalScores[p.id] = parseInt(val, 10);
    });

    if (isValid) {
      onSubmit(finalScores);
    }
  };

  const isFormValid = players.every(p => scores[p.id] !== undefined && scores[p.id] !== '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-[#2A1E5C] border border-[#FF9F1C]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF9F1C]/20 rounded-lg text-[#FF9F1C] relative">
              <Calculator size={24} />
              <img
                src="/images/logo.png"
                alt="Skrew Elite Logo"
                className="absolute -top-2 -right-2 w-6 h-6 object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Round {roundNumber}</h2>
              <p className="text-sm text-gray-400">Enter scores for all players</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close round input"
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          {players.map((player, index) => (
            <div key={player.id} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A1E5C] to-[#14172E] flex items-center justify-center font-bold text-sm text-gray-300 border border-[#FF9F1C]/20">
                {player.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-400 mb-1">{player.name}</label>
                <input
                  id={`score-input-${index}`}
                  ref={index === 0 ? firstInputRef : null}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={scores[player.id] || ''}
                  onChange={(e) => handleScoreChange(player.id, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  placeholder="0"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg placeholder-gray-600 focus:outline-none focus:border-[#4DFFF3] focus:ring-1 focus:ring-[#4DFFF3] transition-all"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-white/5 bg-black/20">
          <Button
            fullWidth
            onClick={handleSubmit}
            disabled={!isFormValid}
            icon={<Check size={20} />}
          >
            Submit Round
          </Button>
        </div>
      </motion.div>
    </div>
  );
};