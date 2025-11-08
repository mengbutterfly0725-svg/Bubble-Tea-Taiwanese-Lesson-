
import React from 'react';
import { playSound, SoundEffect } from '../utils/audio';
import { CelebrationBobaIllustration } from './Illustrations';

interface OutroScreenProps {
  onRestart: () => void;
  score: number;
}

const OutroScreen: React.FC<OutroScreenProps> = ({ onRestart, score }) => {
  
  const handleRestartClick = () => {
    playSound(SoundEffect.Click);
    onRestart();
  };

  return (
    <div className="bg-white/70 border-2 border-stone-500/30 rounded-2xl shadow-2xl backdrop-blur-md text-stone-800 p-8 max-w-lg mx-auto text-center animate-fade-in">
      <CelebrationBobaIllustration className="w-40 h-40 mx-auto mb-4 text-amber-700" />
      <h1 className="text-4xl font-bold text-stone-800 mb-4">
        成功逃脫！
      </h1>
      <h2 className="text-2xl text-stone-700 mb-6">
        你的最終得分是：{score} 分
      </h2>
      <p className="text-stone-600 mb-8 leading-relaxed">
        隨著最後一道鎖解開，木門發出「喀」的一聲，緩緩開啟。門外的陽光溫暖而和煦，空氣中飄散著你最熟悉的——珍珠奶茶的香甜。
        <br/><br/>
        你成功了！最重要的不是逃脫，而是再次品嚐了那段名為「回憶」的滋味。
      </p>
      <button
        onClick={handleRestartClick}
        className="bg-amber-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-amber-700 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-100 text-lg"
      >
        再玩一次
      </button>
    </div>
  );
};

export default OutroScreen;
