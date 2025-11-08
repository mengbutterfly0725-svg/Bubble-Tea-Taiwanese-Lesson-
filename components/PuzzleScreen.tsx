import React, { useState, useMemo, useEffect } from 'react';
import { getHint, getFunFact, FunFact } from '../services/geminiService';
import { Puzzle, MatchItem } from '../types';
import { playSound, SoundEffect } from '../utils/audio';
import { LightbulbIcon, LoaderIcon, LockIcon, StarIcon } from './icons';
import ProgressBar from './ProgressBar';
import { BobaPearlIllustration, ShakerIllustration, ShavedIceIllustration, RobotIllustration } from './Illustrations';

interface PuzzleScreenProps {
  onComplete: (finalScore: number) => void;
  onRestart: () => void;
}

const illustrationMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  ShakerIllustration,
  ShavedIceIllustration,
  RobotIllustration,
};

const puzzles: Puzzle[] = [
  {
    id: 1,
    type: 'text',
    question: "文章中提到，珍珠奶茶的珍珠，除了『珍珠』這個好聽的名字，還有一個不太雅觀的俗稱是什麼？",
    answer: "水雞仔卵",
    contextForHint: "珍珠的另一個俗稱是什麼？",
    funFactTopic: "珍珠奶茶的綽號"
  },
  {
    id: 2,
    type: 'text',
    question: "文中的女兒為了感謝神明保佑她考試順利，準備用什麼來『請客』？",
    answer: "珍珠奶茶",
    contextForHint: "女兒要用什麼謝謝神明？",
    funFactTopic: "台灣珍珠奶茶文化"
  },
  {
    id: 3,
    type: 'matching',
    question: "文章用了一些生動的台語詞彙，請將圖片與對應的詞彙配對。",
    matchItems: [
      { id: 'shaker', imageComponent: 'ShakerIllustration', text: '搖摵杯' },
      { id: 'ice', imageComponent: 'ShavedIceIllustration', text: '礤冰' },
      { id: 'robot', imageComponent: 'RobotIllustration', text: '機器尪仔' },
    ],
    contextForHint: "試著在文章中找出這幾個詞，看看上下文是怎麼描述它們的。",
    funFactTopic: "台灣閩南語"
  },
  {
    id: 4,
    type: 'text',
    question: "作者和阿母是在哪個城市品嚐到讓阿母心花開的珍珠奶茶？",
    answer: "臺南",
    contextForHint: "故事發生的城市是哪裡？",
    funFactTopic: "台南小吃"
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: "在寒冷的天氣裡，粉圓會搭配什麼溫暖的甜品一起吃？",
    options: ["愛玉冰", "燒仙草", "綠豆湯", "米苔目"],
    answer: "燒仙草",
    contextForHint: "冬天時，粉圓通常會加進什麼熱甜湯裡？",
    funFactTopic: "仙草的功效"
  },
  {
    id: 6,
    type: 'text',
    question: "除了搭配熱飲，文章提到粉圓在熱天時可以搭配什麼來吃，感覺很清涼？",
    answer: "礤冰",
    contextForHint: "夏天時，粉圓可以加什麼冰品一起吃？",
    funFactTopic: "台灣傳統冰品"
  },
  {
    id: 7,
    type: 'text',
    question: "後來店家改用一種外型像在跳舞的「東西」來搖飲料，請問那是什麼？",
    answer: "機器尪仔",
    contextForHint: "搖飲料的杯子後來進化成什麼機器？",
    funFactTopic: "手搖飲店的自動化"
  },
  {
    id: 8,
    type: 'text',
    question: "作者喝下珍珠奶茶時，形容粉圓滑入口中的感覺，像是搭乘什麼交通工具？",
    answer: "電梯",
    contextForHint: "喝下珍珠的感覺，被比喻成搭了什麼東西？",
    funFactTopic: "電梯的發明與原理"
  },
  {
    id: 9,
    type: 'multiple-choice',
    question: "女兒為了考大學，去向哪一位神明祈求保佑？",
    options: ["媽祖", "土地公", "關公", "文昌帝君"],
    answer: "文昌帝君",
    contextForHint: "女兒為了考試，拜了哪位神明？",
    funFactTopic: "台灣文昌帝君信仰"
  },
  {
    id: 10,
    type: 'text',
    question: "文章最後用什麼來比喻女兒努力不懈的「志氣」？",
    answer: "真珠",
    contextForHint: "女兒的志氣被比喻成什麼珍貴的東西？",
    funFactTopic: "珍珠粉圓的製作"
  }
];

const storyText = `
珍珠奶茶
佮阿母去臺南拜拜閣食東食西，有夠歡喜。燒的好味滋，冷的食著心涼脾土開。有一味予阿母心花開，就是滑溜滑溜的真珠奶茶。
阿母笑講：「啊都牛奶茶濫粉圓。」
「是啊！真珠䮽粉圓仔仝宗的。」
粉圓按怎濫攏四序，熱天濫礤冰足清涼，寒天摻燒仙草上溫暖！哪會變「真珠」？古早頭家共牛奶茶䮽粉圓仔貯入去搖摵杯，搖咧，摵咧，袂輸起童，搖甲起波上好啉。後來就做一身機器尪仔鬥摵，若咧跳舞。接過來，欶一喙，粉圓仔就若坐電梯仝款，隨粒仔滑入來我的喙裡跳舞。捌有人共號做「水雞仔卵」，毋過猶是「真珠」得人疼。阮同學對美國轉來，講伊行過千山萬水猶是上思念這味。
彼改拜拜，阮查某囝有去求文昌帝君保庇伊考大學。阮有轉去說多謝，才知伊欲請神明啉真珠奶茶！神定著知影伊拍拚的志氣若真珠遐寶貴，伊的誠意若粉圓仔遐古錐，連神明啉著嘛心花開！
`;

const PuzzleScreen: React.FC<PuzzleScreenProps> = ({ onComplete, onRestart }) => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [funFact, setFunFact] = useState<FunFact | null>(null);
  const [isFunFactLoading, setIsFunFactLoading] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [hintUsedThisTurn, setHintUsedThisTurn] = useState(false);
  const [isFading, setIsFading] = useState(false);

  // State for matching puzzle
  const [connections, setConnections] = useState<Map<string, string>>(new Map()); // textId -> imageId
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const currentPuzzle = puzzles[currentPuzzleIndex];

  const shuffledTexts = useMemo(() => {
    if (currentPuzzle.type === 'matching') {
      return [...currentPuzzle.matchItems].sort(() => Math.random() - 0.5);
    }
    return [];
  }, [currentPuzzle]);

  useEffect(() => {
    // Reset puzzle-specific state when puzzle changes
    setError(null);
    setHint(null);
    setInputValue('');
    if (currentPuzzle.type === 'matching') {
      setConnections(new Map());
      setSelectedImageId(null);
    }
  }, [currentPuzzleIndex, currentPuzzle.type]);


  const handleHint = async () => {
    playSound(SoundEffect.Click);
    if (isHintLoading) return;
    setHintUsedThisTurn(true);
    setIsHintLoading(true);
    setHint(null);
    setError(null);
    try {
      const newHint = await getHint(currentPuzzle.contextForHint);
      setHint(newHint);
    } catch (e) {
      console.error(e);
      setHint("無法取得提示，請檢查網路連線。");
    } finally {
      setIsHintLoading(false);
    }
  };

  const handleCorrectAnswer = async () => {
    playSound(SoundEffect.Success);

    const points = hintUsedThisTurn ? 5 : 10;
    const newScore = score + points;

    const solvedPuzzle = currentPuzzle;
    
    setIsFunFactLoading(true);
    setFunFact(null);
    const factPromise = getFunFact(solvedPuzzle.funFactTopic);

    setIsFading(true);

    setTimeout(async () => {
      setScore(newScore);
      setError(null);
      setHint(null);
      setInputValue('');
      setHintUsedThisTurn(false);

      if (currentPuzzle.type === 'matching') {
        setConnections(new Map());
        setSelectedImageId(null);
      }

      if (currentPuzzleIndex < puzzles.length - 1) {
        setCurrentPuzzleIndex(currentPuzzleIndex + 1);
      } else {
        setIsGameFinished(true);
      }
      
      const fact = await factPromise;
      setIsFunFactLoading(false);
      setFunFact(fact);

      setIsFading(false);
    }, 500);
  };

  const checkAnswer = (submittedAnswer: string) => {
    let isCorrect = false;
    if (currentPuzzle.type === 'text' || currentPuzzle.type === 'multiple-choice') {
      isCorrect = submittedAnswer.trim() === currentPuzzle.answer;
    }

    if (!isCorrect) {
      playSound(SoundEffect.Error);
      setError("答案不對喔，再想一想！");
      if (currentPuzzle.type === 'text') {
        setInputValue('');
      }
      return;
    }
    handleCorrectAnswer();
  };
  
  const handleMatchingSubmit = () => {
    if (currentPuzzle.type !== 'matching') return;
    if (connections.size !== currentPuzzle.matchItems.length) {
        playSound(SoundEffect.Error);
        setError("請完成所有的配對！");
        return;
    }

    let isCorrect = true;
    for (const [textId, imageId] of connections.entries()) {
        if (textId !== imageId) {
            isCorrect = false;
            break;
        }
    }

    if (!isCorrect) {
        playSound(SoundEffect.Disconnect);
        setError("配對不正確喔，再試一次！");
        setConnections(new Map());
        setSelectedImageId(null);
        return;
    }

    handleCorrectAnswer();
  };

  
  const handleRestartClick = () => {
    playSound(SoundEffect.Click);
    onRestart();
  };

  const renderPuzzleInput = () => {
    switch(currentPuzzle.type) {
      case 'text':
        return (
          <form onSubmit={(e) => { e.preventDefault(); checkAnswer(inputValue); }} className="flex flex-col space-y-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-white/80 border border-stone-400 rounded-md px-4 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-stone-200/50 placeholder:text-stone-500"
              placeholder="在這裡輸入答案..."
              disabled={isGameFinished || isFading}
            />
            <button
              type="submit"
              disabled={isGameFinished || isFading}
              className="w-full bg-amber-600 text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-amber-700 transition-all duration-300 disabled:bg-amber-800/50 disabled:text-stone-100 disabled:cursor-not-allowed"
            >
              解鎖
            </button>
          </form>
        );

      case 'multiple-choice':
        return (
          <div className="grid grid-cols-2 gap-3">
            {currentPuzzle.options.map(option => (
              <button
                key={option}
                onClick={() => checkAnswer(option)}
                disabled={isGameFinished || isFading}
                className="bg-white/80 border border-stone-400 rounded-md px-4 py-3 text-stone-800 hover:bg-amber-200/80 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-stone-200/50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        );
      
      case 'matching':
        return (
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              {/* Image Column */}
              <div className="flex flex-col items-center space-y-2">
                {currentPuzzle.matchItems.map(item => {
                  const Icon = illustrationMap[item.imageComponent];
                  const isSelected = selectedImageId === item.id;
                  const isConnected = Array.from(connections.values()).includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        playSound(SoundEffect.Select);
                        setSelectedImageId(item.id);
                      }}
                      className={`w-20 h-20 p-2 border-2 rounded-lg flex items-center justify-center transition-all ${
                        isSelected ? 'border-amber-500 scale-110 ring-2 ring-amber-500' : 'border-stone-400'
                      } ${
                        isConnected ? 'bg-green-200/50 border-green-500' : 'bg-white/70'
                      }`}
                    >
                      <Icon className="w-full h-full text-stone-700" />
                    </button>
                  );
                })}
              </div>
              {/* Text Column */}
              <div className="flex flex-col items-center space-y-4">
                {shuffledTexts.map(item => {
                  const isConnected = connections.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (selectedImageId) {
                          playSound(SoundEffect.Connect);
                          const newConnections = new Map(connections);
                          newConnections.set(item.id, selectedImageId);
                          setConnections(newConnections);
                          setSelectedImageId(null);
                        }
                      }}
                      className={`w-full p-2 border-2 rounded-lg transition-all ${
                        isConnected ? 'bg-green-200/50 border-green-500' : 'bg-white/70 border-stone-400'
                      } ${!selectedImageId && 'cursor-not-allowed opacity-70'} ${selectedImageId && 'hover:bg-amber-200/80'}`}
                      disabled={!selectedImageId || isConnected}
                    >
                      {item.text}
                    </button>
                  );
                })}
              </div>
            </div>
             <button
                onClick={handleMatchingSubmit}
                disabled={isGameFinished || isFading || connections.size !== currentPuzzle.matchItems.length}
                className="w-full bg-amber-600 text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-amber-700 transition-all duration-300 disabled:bg-amber-800/50 disabled:text-stone-100 disabled:cursor-not-allowed"
              >
                確認配對
              </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-white/70 border-2 border-stone-500/30 rounded-2xl shadow-2xl backdrop-blur-md text-stone-800 p-8 max-w-3xl mx-auto animate-fade-in w-[90vw] md:w-full">
      
      {/* Decorative Illustrations */}
      <BobaPearlIllustration className="absolute -top-4 -left-5 w-12 h-12 text-stone-400/50 transform rotate-12" />
      <BobaPearlIllustration className="absolute -bottom-6 -right-3 w-16 h-16 text-stone-400/50 transform -rotate-12" />
      <BobaPearlIllustration className="absolute -bottom-5 -left-2 w-8 h-8 text-stone-400/30 transform rotate-45" />
      <BobaPearlIllustration className="absolute top-10 -right-8 w-10 h-10 text-stone-400/40 transform" />


      <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
        <h2 className="text-2xl font-bold text-stone-800">
          謎題 {currentPuzzleIndex + 1} / {puzzles.length}
        </h2>
         <h2 className="text-2xl font-bold text-stone-800">
          得分: {score}
        </h2>
        <div className="flex items-center space-x-2 flex-wrap">
          {Array.from({ length: puzzles.length }).map((_, i) => (
            <LockIcon key={i} className={i < currentPuzzleIndex ? 'text-amber-500' : 'text-stone-400'} />
          ))}
        </div>
      </div>
      
      <ProgressBar 
        currentStep={isGameFinished ? puzzles.length : currentPuzzleIndex} 
        totalSteps={puzzles.length} 
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-stone-800/10 p-4 rounded-lg overflow-y-auto max-h-96 border border-stone-400/50">
          <h3 className="text-stone-800 font-bold">回憶片段</h3>
          <p className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-stone-600">{storyText}</p>
        </div>
        <div className={`flex flex-col justify-between transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          <div>
            <h3 className="text-xl text-stone-800 mb-4 font-semibold">{currentPuzzle.question}</h3>
            
            {renderPuzzleInput()}

            {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
             {isGameFinished && funFact && (
              <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in">
                <button
                  onClick={() => onComplete(score)}
                  className="w-full bg-green-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300"
                >
                  完成挑戰，逃出密室！
                </button>
                 <button
                    onClick={handleRestartClick}
                    className="w-full bg-amber-500 text-stone-900 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300"
                  >
                    重新開始
                  </button>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleHint}
              disabled={isHintLoading || isGameFinished || isFading}
              className="flex items-center justify-center w-full bg-transparent border border-stone-600/50 text-stone-700 px-6 py-2 rounded-lg hover:bg-stone-800/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isHintLoading ? (
                <><LoaderIcon className="animate-spin mr-2" />提示生成中...</>
              ) : (
                <><LightbulbIcon className="mr-2" />需要提示嗎？</>
              )}
            </button>
            {hint && (
              <div className="mt-4 p-4 bg-stone-800/10 border border-stone-400/50 rounded-lg animate-fade-in">
                <p className="text-stone-700">{hint}</p>
              </div>
            )}
            {isFunFactLoading && (
                 <div className="mt-4 p-4 bg-stone-800/10 border border-stone-400/50 rounded-lg flex items-center justify-center">
                    <LoaderIcon className="animate-spin mr-3" />
                    <span>正在查詢相關趣聞...</span>
                </div>
            )}
            {funFact && !isFunFactLoading && (
                 <div className="mt-4 p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg animate-fade-in">
                    <h4 className="font-bold text-teal-800 flex items-center mb-2">
                        <StarIcon className="w-5 h-5 mr-2 text-teal-600" />
                        你知道嗎？
                    </h4>
                    <p className="text-stone-700 mb-3 text-sm leading-relaxed">{funFact.text}</p>

                    {funFact.sources.length > 0 && (
                        <div>
                            <h5 className="text-xs text-stone-500 mb-1">資料來源：</h5>
                            <ul className="space-y-1">
                                {funFact.sources.map((source, index) => (
                                    <li key={index} className="text-sm truncate">
                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline hover:text-teal-600 transition-colors">
                                            {source.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleScreen;