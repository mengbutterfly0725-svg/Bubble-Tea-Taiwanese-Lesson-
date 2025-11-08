
import React, { useState, useRef } from 'react';
import IntroScreen from './components/IntroScreen';
import PuzzleScreen from './components/PuzzleScreen';
import OutroScreen from './components/OutroScreen';
import { GameState } from './types';
import { MusicOnIcon, MusicOffIcon } from './components/icons';

const MUSIC_URL = 'https://cdn.pixabay.com/audio/2023/08/03/audio_5049b1399a.mp3';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [score, setScore] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMusicOn, setIsMusicOn] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicOn) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.warn("Music playback failed:", e);
        });
      }
      setIsMusicOn(!isMusicOn);
    }
  };


  const startGame = () => setGameState('playing');
  const finishGame = (finalScore: number) => {
    setScore(finalScore);
    setGameState('finished');
  };
  const restartGame = () => {
    setScore(0);
    setGameState('intro');
  };

  const renderScreen = () => {
    switch (gameState) {
      case 'intro':
        return <IntroScreen onStart={startGame} />;
      case 'playing':
        return <PuzzleScreen onComplete={finishGame} onRestart={restartGame} />;
      case 'finished':
        return <OutroScreen onRestart={restartGame} score={score} />;
      default:
        return <IntroScreen onStart={startGame} />;
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-orange-100 font-sans p-4">
       <audio ref={audioRef} src={MUSIC_URL} loop />
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/60 backdrop-blur-sm text-stone-700 hover:bg-white/90 transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        aria-label={isMusicOn ? "關閉音樂" : "開啟音樂"}
      >
        {isMusicOn ? (
          <MusicOffIcon className="w-6 h-6" />
        ) : (
          <MusicOnIcon className="w-6 h-6" />
        )}
      </button>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-center">
        {renderScreen()}
      </div>
    </main>
  );
};

export default App;
