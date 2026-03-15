import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GrammarGame from '../grammar-game/grammarGame';
import VocabularyGame from '../vocabulary-game/vocabularyGame';
import './menu.css';

const Menu = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [userLevel, setUserLevel] = useState('');
  const [showGrammarGame, setShowGrammarGame] = useState(false);
  const [showVocabularyGame, setShowVocabularyGame] = useState(false);

  useEffect(() => {
    // Get user data from session storage
    const storedUsername = sessionStorage.getItem('username');
    
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    // You can fetch the user level from the API using the userId
    // For now, setting a default
    setUserLevel('Beginner');
  }, []);

  const menuItems = [
    {
      id: 'grammar',
      title: 'Grammar',
      hebrewTitle: 'דקדוק',
      icon: '📚',
      description: 'שפר את הדקדוק שלך',
      color: '#667eea',
      path: '/grammar'
    },
    {
      id: 'reading',
      title: 'Reading',
      hebrewTitle: 'קריאה',
      icon: '📖',
      description: 'תרגל קריאה והבנת הנקרא',
      color: '#f093fb',
      path: '/reading'
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary',
      hebrewTitle: 'אוצר מילים',
      icon: '💬',
      description: 'הרחב את אוצר המילים שלך',
      color: '#4facfe',
      path: '/vocabulary'
    },
    {
      id: 'progress',
      title: 'My Progress',
      hebrewTitle: 'ההתקדמות שלי',
      icon: '📊',
      description: 'עקוב אחר ההתקדמות שלך',
      color: '#00f2fe',
      path: '/progress'
    }
  ];

  const handleMenuClick = (path: string) => {
    if (path === '/grammar') {
      setShowGrammarGame(true);
      setShowVocabularyGame(false);
    } else if (path === '/vocabulary') {
      setShowVocabularyGame(true);
      setShowGrammarGame(false);
    } else {
      navigate(path);
    }
  };

  return (
    <div className={`menu-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Theme Toggle Button */}
      <button
        className="theme-toggle"
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle theme"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* Top Bar with User Info */}
      <div className="top-bar">
        <div className="user-info">
          <div className="greeting">
            <span className="hello-text">!שלום</span>
            <span className="username">{username || 'Student'}</span>
          </div>
          <div className="user-level">
            <span className="level-label">:הרמה שלך</span>
            <span className="level-badge">{userLevel}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Center Welcome Section */}
        <div className={`welcome-section ${(showGrammarGame || showVocabularyGame) ? 'fullwidth' : ''}`}>
          <div className="decorative-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>

          <div className="welcome-card">
            {!showGrammarGame && !showVocabularyGame ? (
              <>
                <div className="logo-container">
                  <div className="logo-circle">
                    <span className="logo-icon">🎓</span>
                  </div>
                </div>
                <h1 className="welcome-title">!ברוכים הבאים ללמידת אנגלית</h1>
                <p className="welcome-subtitle">✨ בחר פעילות ותתחיל את המסע שלך! ✨</p>
                
                <div className="motivational-message">
                  <p className="message-emoji">🌟</p>
                  <p className="message-text">כל יום של לימוד מקרב אותך למטרה!</p>
                </div>
              </>
            ) : showGrammarGame ? (
              <>
                <div className="game-header-wrapper">
                  <button 
                    className="back-to-menu-button" 
                    onClick={() => setShowGrammarGame(false)}
                  >
                    ← חזור לתפריט
                  </button>
                  <h2 className="game-title">משחק דקדוק 📚</h2>
                </div>
                <GrammarGame />
              </>
            ) : (
              <>
                <div className="game-header-wrapper">
                  <button 
                    className="back-to-menu-button" 
                    onClick={() => setShowVocabularyGame(false)}
                  >
                    ← חזור לתפריט
                  </button>
                  <h2 className="game-title">משחק אוצר מילים 💬</h2>
                </div>
                <VocabularyGame />
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar with Menu Options - Hide when game is active */}
        {!showGrammarGame && !showVocabularyGame && (
          <div className="sidebar-right">
          <div className="sidebar-header">
            <h2 className="sidebar-title">תפריט</h2>
            <div className="sidebar-decoration">⭐</div>
          </div>

          <div className="menu-items">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="menu-item"
                onClick={() => handleMenuClick(item.path)}
                style={{ '--item-color': item.color } as React.CSSProperties}
              >
                <div className="menu-item-icon">{item.icon}</div>
                <div className="menu-item-content">
                  <h3 className="menu-item-title-en">{item.title}</h3>
                  <h4 className="menu-item-title-he">{item.hebrewTitle}</h4>
                  <p className="menu-item-description">{item.description}</p>
                </div>
                <div className="menu-item-arrow">→</div>
              </button>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
