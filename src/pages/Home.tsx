import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, PlusCircle, Sparkles, Lightbulb, Target, Zap } from 'lucide-react';

// Section wrapper with scroll animation
const Section = ({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const Home = () => {
  // Smooth scroll handler
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Section 1 - Hero */}
      <Section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-cyan-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold text-[#003366] mb-6 leading-tight"
              >
                Make study easier
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-slate-600 italic mb-8"
              >
                "spend less time using this technology of "memory of vision" based on AI"
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-8"
              >
                FlashCards AI
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link
                  to="/auth"
                  className="inline-flex items-center px-8 py-4 bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold rounded-full shadow-lg fc-cyan-glow transition-all hover:scale-105"
                >
                  Login/Register
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Study Items Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden md:block"
            >
              <div className="relative w-full h-96">
                {/* Decorative Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-cyan-300 to-cyan-500 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12"
                >
                  <BookOpen className="w-12 h-12 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg flex items-center justify-center"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-20 left-20 w-28 h-28 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center transform -rotate-6"
                >
                  <Lightbulb className="w-14 h-14 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg flex items-center justify-center transform rotate-45"
                >
                  <Target className="w-8 h-8 text-white" />
                </motion.div>

                {/* Center Element */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[#003366] to-[#0066cc] rounded-3xl shadow-2xl flex items-center justify-center"
                >
                  <Zap className="w-16 h-16 text-cyan-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Section 2 - Why FlashCards AI */}
      <Section className="min-h-screen flex items-center bg-gradient-to-b from-cyan-50 to-blue-100 py-20" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-[#003366] mb-8 uppercase tracking-wide"
              >
                WHY FlashCards AI
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8"
              >
                <p className="text-slate-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis 
                  aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                  nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                  officia deserunt mollit anim id est laborum.
                </p>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-[#0066cc] mb-4"
              >
                How it works
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <p className="text-slate-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
              </motion.div>
            </div>

            {/* Right Content - Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative hidden md:block"
            >
              <div className="relative w-full h-96">
                {/* Sticky Notes Illustration */}
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute top-0 left-10 w-32 h-32 bg-yellow-300 rounded-lg shadow-lg transform rotate-12 flex items-center justify-center"
                >
                  <span className="text-yellow-800 font-bold text-lg">Study!</span>
                </motion.div>

                <motion.div
                  animate={{ rotate: [0, -3, 0, 3, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-20 right-10 w-28 h-28 bg-pink-300 rounded-lg shadow-lg transform -rotate-6 flex items-center justify-center"
                >
                  <span className="text-pink-800 font-bold">Learn</span>
                </motion.div>

                <motion.div
                  animate={{ rotate: [0, 8, 0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute bottom-20 left-20 w-36 h-36 bg-cyan-300 rounded-lg shadow-lg transform rotate-3 flex items-center justify-center"
                >
                  <span className="text-cyan-800 font-bold text-xl">AI Power</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-10 right-20 w-24 h-24 bg-green-300 rounded-lg shadow-lg transform -rotate-12 flex items-center justify-center"
                >
                  <span className="text-green-800 font-bold">Success</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Section 3 - Create Your Own Flashcards */}
      <Section className="min-h-screen flex items-center bg-gradient-to-b from-blue-100 to-white py-20" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-[#003366] mb-8"
            >
              create your own <span className="text-cyan-500">flashcards</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/create"
                className="inline-flex items-center px-8 py-4 bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold rounded-full shadow-lg fc-cyan-glow transition-all hover:scale-105"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create flashcards
              </Link>
              <Link
                to="/decks"
                className="inline-flex items-center px-8 py-4 bg-[#003366] hover:bg-[#004080] text-white font-semibold rounded-full shadow-lg transition-all hover:scale-105"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                My decks
              </Link>
            </motion.div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: 'FlashCards AI',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                color: 'from-blue-500 to-blue-700',
                icon: Sparkles,
              },
              {
                title: 'Text here',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
                color: 'from-cyan-400 to-cyan-600',
                icon: Lightbulb,
              },
              {
                title: 'Text here',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                color: 'from-purple-500 to-purple-700',
                icon: Target,
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-xl`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <card.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">{card.title}</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Section 4 - Informational */}
      <Section className="min-h-[50vh] flex items-center bg-gradient-to-b from-white to-cyan-50 py-20" delay={0.1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
            >
              <h3 className="text-2xl font-bold text-[#003366] mb-4">
                Powered by AI Technology
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Our advanced AI algorithms analyze your study materials and generate 
                optimized flashcards tailored to your learning style. The "memory of vision" 
                technology helps you retain information longer and recall it faster.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#003366] to-[#0066cc] rounded-2xl p-8 shadow-lg text-white"
            >
              <h3 className="text-2xl font-bold mb-4">
                Start Learning Today
              </h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Join thousands of students who have improved their grades with FlashCards AI. 
                Create your first deck in minutes and experience the power of AI-assisted learning.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center px-6 py-3 bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold rounded-full transition-all hover:scale-105"
              >
                Get Started
                <Sparkles className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;
