import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLevels } from '../store/userLevelSlice';
import type { RootState, AppDispatch } from '../store/store';
import { getUserLevel } from '../services/currentUserLevel.service';
import GrammarGame from '../grammar-game/grammarGame';
import VocabularyGame from '../vocabulary-game/vocabularyGame';
import ReadingGame from '../reading-game/readingGame';
import './menu.css';

const levelConfig: Record<string, { gradient: string; icon: string; glow: string }> = {
  Beginner:     { gradient: 'linear-gradient(135deg, #11998e, #38ef7d)', icon: '🌱', glow: 'rgba(56,239,125,0.45)' },
  Intermediate: { gradient: 'linear-gradient(135deg, #f7971e, #ffd200)', icon: '⭐', glow: 'rgba(255,210,0,0.45)'  },
  Advanced:     { gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)', icon: '👑', glow: 'rgba(142,45,226,0.45)' },
};

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const grammarLevel    = useSelector((state: RootState) => state.userLevel.grammarLevel);
  const vocabularyLevel = useSelector((state: RootState) => state.userLevel.vocabularyLevel);
  const readingLevel    = useSelector((state: RootState) => state.userLevel.readingLevel);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [showGrammarGame, setShowGrammarGame] = useState(false);
  const [showVocabularyGame, setShowVocabularyGame] = useState(false);
  const [showReadingGame, setShowReadingGame] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    const userId = sessionStorage.getItem('userId');

    if (storedUsername) setUsername(storedUsername);

    if (userId) {
      getUserLevel(parseInt(userId))
        .then(raw => {
          if (!raw) return;
          // Guard against backend property-name mismatches (PascalCase vs camelCase)
          const r = raw as Record<string, unknown>;
          const grammar    = (r['grammarLevel']    ?? r['GrammarLevel'])    as string | undefined;
          const vocabulary = (r['vocabularyLevel'] ?? r['VocabularyLevel']) as string | undefined;
          const reading    = (r['readingLevel']    ?? r['ReadingLevel'])    as string | undefined;
          if (grammar && vocabulary && reading) {
            dispatch(setUserLevels({ grammarLevel: grammar, vocabularyLevel: vocabulary, readingLevel: reading }));
          }
        })
        .catch(err => console.warn('Could not fetch user levels:', err));
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
          {/* Row 1: greeting + keep-learning + logout */}
          <div className="top-bar-row">
            <div className="greeting">
              <span className="hello-text">!שלום</span>
              <span className="username">{username || 'Student'}</span>
            </div>
            <div className="top-bar-center">
              <span className="stat-icon">🎯</span>
              <span className="stat-label">Keep Learning!</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>

          {/* Row 2: level badges */}
          <div className="level-badges">
            {[
              { label: 'דקדוק',       key: 'grammar',    value: grammarLevel    || 'Beginner' },
              { label: 'אוצר מילים',  key: 'vocabulary', value: vocabularyLevel || 'Beginner' },
              { label: 'קריאה',       key: 'reading',    value: readingLevel    || 'Beginner' },
            ].map(({ label, key, value }) => {
              const cfg = levelConfig[value] ?? { gradient: 'linear-gradient(135deg,#718096,#a0aec0)', icon: '📘', glow: 'rgba(113,128,150,0.35)' };
              return (
                <div
                  key={key}
                  className="level-badge"
                  style={{ background: cfg.gradient, boxShadow: `0 4px 18px ${cfg.glow}` }}
                >
                  <span className="level-badge-icon">{cfg.icon}</span>
                  <div className="level-badge-text">
                    <span className="level-badge-subject">{label}</span>
                    <span className="level-badge-value">{value}</span>
                  </div>
                </div>
              );
            })}
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
