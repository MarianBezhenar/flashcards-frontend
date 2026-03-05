import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { api } from '@/services/api';

const CreateDeck = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
    quantity: 10,
    difficulty: 'Normal',
    sourceText: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject.trim() || !formData.topic.trim()) {
      setError('Subject and Topic are required');
      return;
    }

    if (formData.quantity < 1 || formData.quantity > 50) {
      setError('Quantity must be between 1 and 50');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      await api.generateDeck({
        subject: formData.subject.trim(),
        topic: formData.topic.trim(),
        quantity: formData.quantity,
        difficulty: formData.difficulty,
        sourceText: formData.sourceText.trim() || undefined,
      });
      
      navigate('/decks');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate deck');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
            Create your own flashcards with AI
          </h1>
          <p className="text-slate-600 text-lg">
            the AI will generate Q/A for you
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-[#003366] mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="e.g. IT"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Topic */}
            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-[#003366] mb-2"
              >
                Topic
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="e.g. SQL"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-[#003366] mb-2"
              >
                Quantity Of Questions
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min={1}
                max={50}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl text-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-[#003366] mb-2"
              >
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl text-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed appearance-none cursor-pointer"
              >
                <option value="Easy">Easy</option>
                <option value="Normal">Normal</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Source Text */}
            <div>
              <label
                htmlFor="sourceText"
                className="block text-sm font-medium text-[#003366] mb-2"
              >
                Paste here your font text (Optional)
              </label>
              <textarea
                id="sourceText"
                name="sourceText"
                value={formData.sourceText}
                onChange={handleInputChange}
                rows={4}
                placeholder="Paste your study material here..."
                disabled={isLoading}
                className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all resize-none disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 disabled:from-slate-300 disabled:to-slate-400 text-slate-900 disabled:text-slate-500 font-bold text-lg rounded-full shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>GENERATE</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-slate-500">
            Tip: Providing source text helps the AI generate more relevant questions
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateDeck;
