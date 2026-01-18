import React from 'react';
import { motion } from 'framer-motion';
import { X, UserMinus, AlertTriangle } from 'lucide-react';
import { Player } from '../types';
import { Button } from './Button';

interface DeletePlayerModalProps {
    players: Player[];
    onClose: () => void;
    onDelete: (playerId: string) => void;
}

export const DeletePlayerModal: React.FC<DeletePlayerModalProps> = ({ players, onClose, onDelete }) => {
    const handleDelete = (playerId: string) => {
        onDelete(playerId);
        onClose();
    };

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
                className="relative w-full max-w-lg bg-[#2A1E5C] border border-red-500/30 rounded-3xl shadow-2xl overflow-hidden"
            >
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Delete Player</h2>
                            <p className="text-sm text-gray-400">Select player to remove</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="space-y-3">
                        {players.map((player) => (
                            <button
                                key={player.id}
                                onClick={() => handleDelete(player.id)}
                                className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-xl transition-all text-left"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center font-bold text-sm text-gray-300">
                                    {player.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-white">{player.name}</div>
                                    <div className="text-sm text-gray-400">Score: {player.totalScore}</div>
                                </div>
                                <UserMinus size={20} className="text-red-400" />
                            </button>
                        ))}
                    </div>

                    {players.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No players to delete
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};