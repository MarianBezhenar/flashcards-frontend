import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusCircle, Loader2, BookOpen } from 'lucide-react';
import DeckCard from '@/components/DeckCard';
import { api } from '@/services/api';
import type { Deck } from '@/types';

const MyDecks = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDecks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getDecks();
      setDecks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load decks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleDeleteDeck = async (deckId: string) => {
    try {
      await api.deleteDeck(deckId);
      setDecks((prev) => prev.filter((deck) => deck.id !== deckId));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete deck');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">
            My decks
          </h1>
          <p className="text-slate-600 text-lg">
            Manage and study your flashcard decks
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="w-12 h-12 text-[#0066cc] animate-spin mb-4" />
            <p className="text-slate-600">Loading your decks...</p>
          </motion.div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          >
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchDecks}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !error && decks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-lg p-12 text-center border border-slate-100"
          >
            <div className="w-20 h-20 mx-auto bg-cyan-100 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 text-cyan-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#003366] mb-4">
              No decks yet
            </h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Create your first flashcard deck and start learning with AI-powered study tools.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-8 py-4 bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold rounded-full shadow-lg fc-cyan-glow transition-all hover:scale-105"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Your First Deck
            </Link>
          </motion.div>
        )}

        {/* Decks Grid */}
        {!isLoading && !error && decks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {decks.map((deck, index) => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  onDelete={handleDeleteDeck}
                  colorIndex={index}
                />
              ))}
            </div>

            {/* Create New Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center"
            >
              <Link
                to="/create"
                className="inline-flex items-center px-6 py-3 bg-[#003366] hover:bg-[#004080] text-white font-medium rounded-full transition-all hover:scale-105"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create New Deck
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyDecks;
