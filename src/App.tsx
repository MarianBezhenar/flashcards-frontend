import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './pages/Auth';
import Home from './pages/Home';
import MyDecks from './pages/MyDecks';
import CreateDeck from './pages/CreateDeck';
import StudyMode from './pages/StudyMode';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes - both render same Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        
        {/* Auth */}
        <Route path="/auth" element={<Auth />} />
        
        {/* Protected */}
        <Route path="/my-decks" element={<ProtectedRoute><MyDecks /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateDeck /></ProtectedRoute>} />
        <Route path="/study/:id" element={<ProtectedRoute><StudyMode /></ProtectedRoute>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;