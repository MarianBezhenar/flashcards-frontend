import axios from 'axios';

//const API_BASE_URL = 'http://localhost:8080/api';
const API_BASE_URL = 'https://flashcards-backend-production-601e.up.railway.app/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - automatically adds JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      // Redirect to login
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Types
export interface Deck {
  id: string;
  subject: string;
  topic: string;
  cards: Flashcard[];
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
}


// API Functions - now using axios with automatic auth
export const api = {
  // Get all decks
  getDecks: async (): Promise<Deck[]> => {
    const response = await apiClient.get('/decks');
    return response.data;
  },

  // Get a single deck by ID
  getDeck: async (deckId: string): Promise<Deck> => {
    const response = await apiClient.get(`/deck/${deckId}`);
    return response.data;
  },

  // Delete a deck
  deleteDeck: async (deckId: string): Promise<void> => {
    await apiClient.delete(`/deck/${deckId}`);
  },

  // Generate a new deck with AI
  generateDeck: async (data: GenerateDeckRequest): Promise<Deck> => {
    const response = await apiClient.post('/openai/generate-deck', data);
    return response.data;
  },

  // Send chat message to AI
  sendChatMessage: async (message: string): Promise<string> => {
    const encodedMessage = encodeURIComponent(message);
    const response = await apiClient.get(`/openai/${encodedMessage}`);
    
    // Handle both JSON and plain text responses
    if (typeof response.data === 'string') {
      return response.data;
    }
    return response.data.response || response.data.message || JSON.stringify(response.data);
  },
};

// Also export individual functions for direct import
export const getDecks = api.getDecks;
export const getDeck = api.getDeck;
export const deleteDeck = api.deleteDeck;
export const generateDeck = api.generateDeck;
export const sendChatMessage = api.sendChatMessage;

// Export axios instance for direct use if needed
export { apiClient };

export default api;