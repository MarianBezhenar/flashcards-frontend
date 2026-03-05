export interface Deck {
  id: string;
  subject: string;
  topic: string;
  cards?: Flashcard[];        // For when full deck is fetched
  totalCards?: Flashcard[];   // Your backend uses this name!
  cardCount?: number;
  createdAt?: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface GenerateDeckRequest {
  subject: string;
  topic: string;
  quantity: number;
  difficulty: string;
  sourceText?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

export interface StudyProgress {
  known: number;
  notKnown: number;
  currentIndex: number;
  total: number;
}
