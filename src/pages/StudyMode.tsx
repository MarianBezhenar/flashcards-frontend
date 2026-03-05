import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, X, Loader2 } from 'lucide-react';
import Flashcard from '@/components/Flashcard';
import ResultPanel from '@/components/ResultPanel';
import { api } from '@/services/api';
import type { Deck } from '@/types';

const StudyMode = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [deck, setDeck] = useState<Deck | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownCount, setKnownCount] = useState(0);
  const [notKnownCount, setNotKnownCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      if (!id) {
        setError('No deck ID provided');
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        const data = await api.getDeck(id);
        setDeck(data);
      } catch (err: any) {
        console.error('Failed to load deck:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load deck');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeck();
  }, [id]);

  // FIXED: Use totalCards instead of cards
  const getCards = () => deck?.totalCards || deck?.cards || [];
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    const cards = getCards();
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleKnown = () => {
    const cards = getCards();
    setKnownCount((prev) => prev + 1);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleNotKnown = () => {
    const cards = getCards();
    setNotKnownCount((prev) => prev + 1);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setKnownCount(0);
    setNotKnownCount(0);
    setIsComplete(false);
  };

  const handleBackToDecks = () => {
    navigate('/my-decks');
  };

  // FIXED: Use getCards() helper
  const cards = getCards();
  const progress = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading deck...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 pt-24 px-4">
        <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
          <p className="text-red-300 mb-4">{error}</p>
          <button
            onClick={() => navigate('/my-decks')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            Back to Decks
          </button>
        </div>
      </div>
    );
  }

  // FIXED: Check totalCards first
  if (!deck || cards.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 pt-24 px-4">
        <div className="max-w-md mx-auto bg-slate-800 rounded-2xl p-8 text-center">
          <p className="text-slate-400 mb-4">This deck has no cards.</p>
          <button
            onClick={() => navigate('/my-decks')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            Back to Decks
          </button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-sm text-slate-500 mb-2">flash card</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {deck.subject}
            {deck.topic && ` (${deck.topic})`}
          </h1>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-blue-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* Study Mode Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
            Study Mode
          </span>
        </motion.div>

        {/* Flashcard - FIXED: pass totalCards length */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Flashcard
              card={currentCard}
              cardNumber={currentIndex + 1}
              totalCards={cards.length}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center space-x-4 mt-8"
        >
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 flex items-center justify-center transition-colors text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNotKnown}
            className="flex items-center space-x-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors"
          >
            <X className="w-5 h-5" />
            <span>not knew</span>
          </button>

          <button
            onClick={handleKnown}
            className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-colors"
          >
            <Check className="w-5 h-5" />
            <span>knew</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 flex items-center justify-center transition-colors text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center space-x-8 mt-8"
        >
          <div className="text-center">
            <div className="flex items-center space-x-1 text-green-400">
              <Check className="w-5 h-5" />
              <span className="font-bold text-lg">{knownCount}</span>
            </div>
            <span className="text-sm text-slate-500">Knew</span>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-1 text-red-400">
              <X className="w-5 h-5" />
              <span className="font-bold text-lg">{notKnownCount}</span>
            </div>
            <span className="text-sm text-slate-500">Not Knew</span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isComplete && (
          <ResultPanel
            known={knownCount}
            notKnown={notKnownCount}
            total={cards.length}
            onRestart={handleRestart}
            onBackToDecks={handleBackToDecks}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyMode;
