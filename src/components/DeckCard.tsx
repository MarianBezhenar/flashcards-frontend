import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trash2, GraduationCap } from 'lucide-react';
import type { Deck } from '@/types';

interface DeckCardProps {
  deck: Deck;
  onDelete: (id: string) => void;
  colorIndex?: number;
}

const colorSchemes = [
  { bg: 'bg-blue-600', hover: 'hover:bg-blue-700' },
  { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700' },
  { bg: 'bg-violet-600', hover: 'hover:bg-violet-700' },
  { bg: 'bg-purple-600', hover: 'hover:bg-purple-700' },
  { bg: 'bg-fuchsia-600', hover: 'hover:bg-fuchsia-700' },
  { bg: 'bg-pink-600', hover: 'hover:bg-pink-700' },
];

const DeckCard = ({ deck, onDelete, colorIndex = 0 }: DeckCardProps) => {
  const navigate = useNavigate();
  const colorScheme = colorSchemes[colorIndex % colorSchemes.length];
  
  // FIXED: Use totalCards (your backend field name)
  const cardCount = deck.totalCards?.length ?? deck.cards?.length ?? 0;

  const handleStudy = () => {
    navigate(`/study/${deck.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this deck?')) {
      onDelete(deck.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative ${colorScheme.bg} ${colorScheme.hover} rounded-2xl p-6 text-white shadow-lg cursor-pointer transition-all duration-300 min-h-[200px]`}
      onClick={handleStudy}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <div className="text-xs font-medium opacity-80 mb-1 uppercase tracking-wider">
            flash card
          </div>
          <h3 className="text-xl font-bold leading-tight line-clamp-2">
            {deck.subject}
            {deck.topic && `(${deck.topic})`}
          </h3>
        </div>

        {/* Card Count - FIXED */}
        <div className="flex items-center gap-2 text-sm opacity-90 mb-6">
          <BookOpen className="w-4 h-4" />
          <span>{cardCount} {cardCount === 1 ? 'card' : 'cards'}</span>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStudy();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            Study Mode
          </button>

          <button
            onClick={handleDelete}
            className="p-2 bg-white/10 hover:bg-red-500/50 rounded-lg transition-colors"
            title="Delete deck"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DeckCard;