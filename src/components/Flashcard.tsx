import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Flashcard as FlashcardType } from '@/types';

interface FlashcardProps {
  card: FlashcardType;
  cardNumber: number;
  totalCards: number;
}

const Flashcard = ({ card, cardNumber, totalCards }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Card Counter */}
      <div className="text-center mb-6">
        <span className="text-lg font-semibold text-[#003366]">
          Card {cardNumber} of {totalCards}
        </span>
      </div>

      {/* Flashcard */}
      <div className="flashcard-container h-80 md:h-96" onClick={handleFlip}>
        <motion.div
          className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Front - Question */}
          <div className="flashcard-front">
            <div className="h-full bg-gradient-to-br from-[#0066cc] to-[#003366] rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-white cursor-pointer">
              <div className="text-sm font-medium opacity-70 mb-4 uppercase tracking-wider">
                Question
              </div>
              <p className="text-xl md:text-2xl font-semibold text-center leading-relaxed">
                {card.question}
              </p>
              <div className="absolute bottom-6 text-sm opacity-60">
                Click to flip
              </div>
            </div>
          </div>

          {/* Back - Answer */}
          <div className="flashcard-back">
            <div className="h-full bg-gradient-to-br from-[#00CCCC] to-[#009999] rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-white cursor-pointer">
              <div className="text-sm font-medium opacity-70 mb-4 uppercase tracking-wider">
                Answer
              </div>
              <p className="text-xl md:text-2xl font-semibold text-center leading-relaxed">
                {card.answer}
              </p>
              <div className="absolute bottom-6 text-sm opacity-60">
                Click to flip back
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Flip Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-6 text-slate-500 text-sm"
      >
        flip the card to see an answer
      </motion.p>
    </div>
  );
};

export default Flashcard;
