export type GameState = 'intro' | 'playing' | 'finished';

interface BasePuzzle {
  id: number;
  question: string;
  contextForHint: string;
  funFactTopic: string;
}

export interface TextPuzzle extends BasePuzzle {
  type: 'text';
  answer: string;
}

export interface MultipleChoicePuzzle extends BasePuzzle {
  type: 'multiple-choice';
  options: string[];
  answer: string;
}

export interface MatchItem {
  id: string;
  imageComponent: string; 
  text: string;
}

export interface MatchingPuzzle extends BasePuzzle {
  type: 'matching';
  matchItems: MatchItem[];
}

export type Puzzle = TextPuzzle | MultipleChoicePuzzle | MatchingPuzzle;
