import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import { BookOpen, LogOut, User, Layers } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-slate-100">Flashcards</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/my-decks" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                  <Layers className="w-4 h-4" />
                  My Decks
                </Link>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full border border-slate-600/50">
                  <User className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-200 font-medium">Welcome, {user}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-red-200 rounded-lg border border-red-500/30 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="text-slate-300 hover:text-white transition-colors">Login</Link>
                <Link to="/auth" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-md">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;