import React from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { SetupScreen } from './components/SetupScreen';
import { MobileScoreboard } from './components/MobileScoreboard';
import { GameStatus } from './types';
import { NotificationProvider } from './components/NotificationProvider';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const game = useGameEngine();

  return (
    <LanguageProvider>
      <NotificationProvider>
        <div className="antialiased text-white bg-[#1B1F3B]" dir="ltr">
          {game.status === GameStatus.SETUP ? (
            <SetupScreen
              players={game.players}
              onAddPlayer={game.addPlayer}
              onRemovePlayer={game.removePlayer}
              onStartGame={game.startGame}
            />
          ) : (
            <MobileScoreboard {...game} />
          )}
        </div>
      </NotificationProvider>
    </LanguageProvider>
  );
}

export default App;