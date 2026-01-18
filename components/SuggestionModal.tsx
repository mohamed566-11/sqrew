import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Lightbulb } from 'lucide-react';
import { Button } from './Button';

interface SuggestionModalProps {
    onClose: () => void;
    onSubmit: (suggestion: string) => void;
}

export const SuggestionModal: React.FC<SuggestionModalProps> = ({ onClose, onSubmit }) => {
    const [suggestion, setSuggestion] = useState('');

    const handleSubmit = () => {
        if (suggestion.trim()) {
            onSubmit(suggestion);
            setSuggestion('');
            onClose();
        }
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
                className="relative w-full max-w-lg bg-[#2A1E5C] border border-[#FF9F1C]/30 rounded-3xl shadow-2xl overflow-hidden"
            >
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#7B61FF]/20 rounded-lg text-[#7B61FF] relative">
                            <Lightbulb size={24} />
                            <img
                                src="/images/logo.png"
                                alt="Skrew Elite Logo"
                                className="absolute -top-1 -right-1 w-5 h-5 object-contain"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Suggestions & Feedback</h2>
                            <p className="text-sm text-gray-400">Help us improve Skrew Elite</p>
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
                    <textarea
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                        placeholder="Share your ideas, suggestions, or report issues..."
                        rows={6}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#7B61FF] focus:ring-1 focus:ring-[#7B61FF] transition-all resize-none"
                        autoFocus
                    />
                    <div className="mt-4 text-xs text-gray-500">
                        Your feedback helps make the game better for everyone!
                    </div>
                </div>

                <div className="p-6 border-t border-white/5 bg-black/20">
                    <Button
                        fullWidth
                        onClick={handleSubmit}
                        disabled={!suggestion.trim()}
                        icon={<Send size={20} />}
                    >
                        Submit Feedback
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};