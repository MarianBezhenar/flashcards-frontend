import { motion } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, BookOpen } from 'lucide-react';

interface ResultPanelProps {
  known: number;
  notKnown: number;
  total: number;
  onRestart: () => void;
  onBackToDecks: () => void;
}

const ResultPanel = ({
  known,
  notKnown,
  total,
  onRestart,
  onBackToDecks,
}: ResultPanelProps) => {
  const percentage = Math.round((known / total) * 100);
  const isGoodJob = percentage >= 70;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center"
      >
        {/* Result Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          {isGoodJob ? (
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          ) : (
            <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-orange-500" />
            </div>
          )}
        </motion.div>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-[#003366] mb-2">
            {known}/{total}
          </h2>
          <p
            className={`text-xl font-semibold mb-6 ${
              isGoodJob ? 'text-green-500' : 'text-orange-500'
            }`}
          >
            {isGoodJob ? 'good job!' : 'study more'}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center space-x-8 mb-8"
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-green-500 mb-1">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">{known}</span>
            </div>
            <span className="text-sm text-slate-500">Knew</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-red-500 mb-1">
              <XCircle className="w-5 h-5" />
              <span className="font-semibold">{notKnown}</span>
            </div>
            <span className="text-sm text-slate-500">Not Knew</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <button
            onClick={onRestart}
            className="w-full py-3 px-6 bg-[#0066cc] hover:bg-[#0052a3] text-white rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Study Again</span>
          </button>
          <button
            onClick={onBackToDecks}
            className="w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>Back to Decks</span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResultPanel;
