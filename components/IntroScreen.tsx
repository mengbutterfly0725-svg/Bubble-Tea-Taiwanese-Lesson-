
import React from 'react';
import { playSound, SoundEffect } from '../utils/audio';
import { BobaCharacterIllustration } from './Illustrations';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {

  const handleStartClick = () => {
    playSound(SoundEffect.Click);
    onStart();
  };

  return (
    <div className="bg-white/70 border-2 border-stone-500/30 rounded-2xl shadow-2xl backdrop-blur-md text-stone-800 p-8 max-w-lg mx-auto text-center animate-fade-in">
      <BobaCharacterIllustration className="w-40 h-40 mx-auto mb-4 text-stone-700" />
      <h1 className="text-4xl font-bold text-stone-800 mb-4 tracking-wider">
        回憶的滋味
      </h1>
      <h2 className="text-2xl text-stone-700 mb-6">
        珍珠奶茶密室
      </h2>
      <p className="text-stone-600 mb-8 leading-relaxed">
        你回到了那熟悉的台南巷弄，空氣中瀰漫著甜甜的茶香。推開一扇吱呀作響的木門，你發現自己身處一間從未見過的茶館，身後的門卻悄然鎖上...
        <br/><br/>
        唯一的線索，是腦海中那段與母親共度的溫馨回憶。
      </p>
      <button
        onClick={handleStartClick}
        className="bg-amber-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-amber-700 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-100 text-lg"
      >
        進入回憶
      </button>
    </div>
  );
};

export default IntroScreen;
