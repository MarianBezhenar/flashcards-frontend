import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#003366] text-white py-4 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2">
          <span className="text-sm text-slate-300">powered by</span>
          <span className="text-sm font-semibold text-cyan-400">Marian</span>
          <span className="text-sm text-slate-400">2026</span>
          <span className="text-slate-500">©</span>
          <span className="text-sm font-medium text-white">FlashCards AI</span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
