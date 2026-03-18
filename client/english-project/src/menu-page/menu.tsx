import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserLevel } from '../context/UserLevelContext';
import { getUserLevel } from '../services/currentUserLevel.service';
import GrammarGame from '../grammar-game/grammarGame';
import VocabularyGame from '../vocabulary-game/vocabularyGame';
import ReadingGame from '../reading-game/readingGame';
import './menu.css';

const Menu = () => {
  const navigate = useNavigate();
  const { userLevels, setUserLevels } = useUserLevel();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [showGrammarGame, setShowGrammarGame] = useState(false);
  const [showVocabularyGame, setShowVocabularyGame] = useState(false);
  const [showReadingGame, setShowReadingGame] = useState(false);

  // Calculate global level from individual levels
  const calculateGlobalLevel = () => {
    const levelMap: { [key: string]: number } = {
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3
    };

    const grammarScore = levelMap[userLevels.grammarLevel] || 1;
    const vocabScore = levelMap[userLevels.vocabularyLevel] || 1;
    const readingScore = levelMap[userLevels.readingLevel] || 1;

    const averageScore = (grammarScore + vocabScore + readingScore) / 3;
    
    if (averageScore >= 2.5) return 'Advanced';
    if (averageScore >= 1.5) return 'Intermediate';
    return 'Beginner';
  };

  const getLevelPercentage = () => {
    const level = calculateGlobalLevel();
    if (level === 'Advanced') return 100;
    if (level === 'Intermediate') return 66;
    return 33;
  };

  useEffect(() => {
    // Get user data from session storage
    const storedUsername = sessionStorage.getItem('username');
    const userId = sessionStorage.getItem('userId');
    
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    // Fetch user levels from API only if not already loaded
    if (userId && !userLevels.grammarLevel) {
      getUserLevel(parseInt(userId))
        .then(levels => {
          if (levels) {
            setUserLevels({
              grammarLevel: levels.grammarLevel,
              vocabularyLevel: levels.vocabularyLevel,
              readingLevel: levels.readingLevel
            });
          }
        })
        .catch(err => {
          console.warn('Could not fetch user levels:', err);
        });
    }
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
const handleLogout = () => {
  // מוחק את הטוקן ואת כל מה שמרנו
  sessionStorage.clear(); 
  // מחזיר לדף ההתחברות
  navigate('/login');
};
  const handleMenuClick = (path: string) => {
    if (path === '/grammar') {
      setShowGrammarGame(true);
      setShowVocabularyGame(false);
      setShowReadingGame(false);
    } else if (path === '/vocabulary') {
      setShowVocabularyGame(true);
      setShowGrammarGame(false);
      setShowReadingGame(false);
    } else if (path === '/reading') {
      setShowReadingGame(true);
      setShowGrammarGame(false);
      setShowVocabularyGame(false);
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
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="user-level">
            <span className="level-label">:רמה</span>
            <div className="level-badge global-level">
              <div className="level-fill" style={{ width: `${getLevelPercentage()}%` }}></div>
              <span className="level-text">{calculateGlobalLevel()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Center Welcome Section */}
        <div className={`welcome-section ${(showGrammarGame || showVocabularyGame || showReadingGame) ? 'fullwidth' : ''}`}>
          <div className="decorative-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>

          <div className="welcome-card">
            {!showGrammarGame && !showVocabularyGame && !showReadingGame ? (
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
            ) : showVocabularyGame ? (
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
            ) : (
              <>
                <div className="game-header-wrapper">
                  <button 
                    className="back-to-menu-button" 
                    onClick={() => setShowReadingGame(false)}
                  >
                    ← חזור לתפריט
                  </button>
                  <h2 className="game-title">משחק קריאה 📖</h2>
                </div>
                <ReadingGame />
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar with Menu Options - Hide when game is active */}
        {!showGrammarGame && !showVocabularyGame && !showReadingGame && (
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
