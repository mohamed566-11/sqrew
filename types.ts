export interface Player {
  id: string;
  name: string;
  totalScore: number;
  history: number[]; // Scores for each round
}

export interface Round {
  id: string;
  number: number;
  scores: Record<string, number>; // playerId -> score
  timestamp: number;
}

export enum GameStatus {
  SETUP = 'SETUP',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export interface GameState {
  status: GameStatus;
  players: Player[];
  rounds: Round[];
}

export interface GameActions {
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  startGame: () => void;
  submitRound: (scores: Record<string, number>) => void;
  deleteRound: (roundId: string) => void;
  resetGame: () => void;
  resetScores: () => void;
  clearAllData: () => void;
  updatePlayerName: (id: string, name: string) => void;
}