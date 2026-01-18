import React from 'react';
import { motion } from 'framer-motion';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import { Round } from '../types';

interface DeleteRoundModalProps {
    rounds: Round[];
    onClose: () => void;
    onDelete: (roundId: string) => void;
}

export const DeleteRoundModal: React.FC<DeleteRoundModalProps> = ({ rounds, onClose, onDelete }) => {
    const handleDelete = (roundId: string) => {
        onDelete(roundId);
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
                            <h2 className="text-xl font-bold text-white">Delete Round</h2>
                            <p className="text-sm text-gray-400">Select round to remove</p>
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
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {[...rounds].reverse().map((round) => (
                            <button
                                key={round.id}
                                onClick={() => handleDelete(round.id)}
                                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-xl transition-all text-left"
                            >
                                <div>
                                    <div className="font-medium text-white">Round {round.number}</div>
                                    <div className="text-sm text-gray-400">
                                        {new Date(round.timestamp).toLocaleString()}
                                    </div>
                                </div>
                                <Trash2 size={20} className="text-red-400" />
                            </button>
                        ))}
                    </div>

                    {rounds.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No rounds to delete
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};