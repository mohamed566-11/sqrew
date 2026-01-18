import { useState, useEffect, useCallback } from 'react';
import { GameState, GameStatus, Player, Round, GameActions } from '../types';
import { STORAGE_KEY } from '../constants';

const generateId = () => Math.random().toString(36).substr(2, 9);

const INITIAL_STATE: GameState = {
  status: GameStatus.SETUP,
  players: [],
  rounds: []
};

export const useGameEngine = (): GameState & GameActions => {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STATE;
    } catch (e) {
      console.error("Failed to load state", e);
      return INITIAL_STATE;
    }
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addPlayer = useCallback((name: string) => {
    if (!name.trim()) return;
    setState(prev => ({
      ...prev,
      players: [
        ...prev.players,
        {
          id: generateId(),
          name: name.trim(),
          totalScore: 0,
          history: []
        }
      ]
    }));
  }, []);

  const removePlayer = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== id)
    }));
  }, []);

  const updatePlayerName = useCallback((id: string, name: string) => {
    setState(prev => ({
      ...prev,
      players: prev.players.map(p => p.id === id ? { ...p, name } : p)
    }));
  }, []);

  const startGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      status: GameStatus.PLAYING,
      // Ensure totals are 0 at start
      players: prev.players.map(p => ({ ...p, totalScore: 0, history: [] })),
      rounds: []
    }));
  }, []);

  const resetGame = useCallback(() => {
    if (window.confirm("Are you sure you want to end this game and return to setup?")) {
      setState(INITIAL_STATE);
    }
  }, []);

  const resetScores = useCallback(() => {
    if (window.confirm("Reset all scores to zero? Players and game will continue.")) {
      setState(prev => ({
        ...prev,
        players: prev.players.map(p => ({ ...p, totalScore: 0, history: [] })),
        rounds: []
      }));
    }
  }, []);

  const clearAllData = useCallback(() => {
    if (window.confirm("⚠️ PERMANENTLY DELETE ALL GAME DATA? This cannot be undone.")) {
      localStorage.removeItem(STORAGE_KEY);
      setState(INITIAL_STATE);
    }
  }, []);

  const recalculateTotals = (players: Player[], rounds: Round[]): Player[] => {
    // Deep copy players to reset stats
    const newPlayers = players.map(p => ({ ...p, totalScore: 0, history: [] as number[] }));

    // Apply scores round by round
    rounds.forEach(round => {
      Object.entries(round.scores).forEach(([playerId, score]) => {
        const player = newPlayers.find(p => p.id === playerId);
        if (player) {
          player.history.push(score);
          player.totalScore += score;
        }
      });
    });

    return newPlayers;
  };

  const submitRound = useCallback((scores: Record<string, number>) => {
    setState(prev => {
      const newRound: Round = {
        id: generateId(),
        number: prev.rounds.length + 1,
        scores,
        timestamp: Date.now()
      };

      const newRounds = [...prev.rounds, newRound];
      const updatedPlayers = recalculateTotals(prev.players, newRounds);

      return {
        ...prev,
        rounds: newRounds,
        players: updatedPlayers
      };
    });
  }, []);

  const deleteRound = useCallback((roundId: string) => {
    setState(prev => {
      const newRounds = prev.rounds.filter(r => r.id !== roundId).map((r, idx) => ({
        ...r,
        number: idx + 1
      }));
      const updatedPlayers = recalculateTotals(prev.players, newRounds);
      return {
        ...prev,
        rounds: newRounds,
        players: updatedPlayers
      };
    });
  }, []);

  return {
    ...state,
    addPlayer,
    removePlayer,
    startGame,
    submitRound,
    deleteRound,
    resetGame,
    resetScores,
    clearAllData,
    updatePlayerName
  };
};
