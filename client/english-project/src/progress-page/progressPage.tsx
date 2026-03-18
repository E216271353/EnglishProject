import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUserLevelsByUserId } from '../services/currentUserLevel.service';
import type { CurrentUserLevel } from '../types/currentUserLevel';
import './progressPage.css';

const ProgressPage = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState<CurrentUserLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      navigate('/');
      return;
    }

    try {
      setLoading(true);
      const data = await getAllUserLevelsByUserId(parseInt(userId));
      setHistoryData(data);
    } catch (error) {
      console.error('Error loading progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLatestLevels = () => {
    if (historyData.length === 0) return null;
    return historyData[historyData.length - 1];
  };

  const getLevelNumber = (level: string): number => {
    const levelMap: { [key: string]: number } = {
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3
    };
    return levelMap[level] || 1;
  };

  const getLevelColor = (level: string): string => {
    const colorMap: { [key: string]: string } = {
      'Beginner': '#f093fb',
      'Intermediate': '#4facfe',
      'Advanced': '#00f2fe'
    };
    return colorMap[level] || '#f093fb';
  };

  // Convert UTC date to local time
  const convertToLocalTime = (utcDate: string | Date): Date => {
    const date = new Date(utcDate);
    // If the date string doesn't include timezone info, treat it as UTC
    if (typeof utcDate === 'string' && !utcDate.includes('Z') && !utcDate.includes('+')) {
      // Parse as UTC and convert to local
      return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    }
    return date;
  };

  const getActiveDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    return historyData
      .map(item => convertToLocalTime(item.dateUpdated))
      .filter(date => date.getFullYear() === year && date.getMonth() === month)
      .map(date => date.getDate());
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const activeDays = getActiveDaysInMonth();

    const days = [];
    const dayNames = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

    // Day headers
    dayNames.forEach(day => {
      days.push(
        <div key={`header-${day}`} className="calendar-day-header">
          {day}
        </div>
      );
    });

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isActive = activeDays.includes(day);
      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isActive ? 'active' : ''}`}
        >
          <span className="day-number">{day}</span>
          {isActive && <span className="activity-dot"></span>}
        </div>
      );
    }

    return days;
  };

  const renderProgressBar = (label: string, level: string, icon: string) => {
    const levelNum = getLevelNumber(level);
    const percentage = (levelNum / 3) * 100;
    const color = getLevelColor(level);

    return (
      <div className="progress-item">
        <div className="progress-header">
          <span className="progress-icon">{icon}</span>
          <span className="progress-label">{label}</span>
          <span className="progress-level-badge">{level}</span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(90deg, ${color}, ${color}dd)`
            }}
          >
            <span className="progress-percentage">{Math.round(percentage)}%</span>
          </div>
        </div>
      </div>
    );
  };

  const renderLevelHistory = () => {
    if (historyData.length === 0) return null;

    // Get last 7 entries
    const recentHistory = historyData.slice(-7).reverse();

    return (
      <div className="history-timeline">
        {recentHistory.map((entry, index) => (
          <div key={index} className="history-entry">
            <div className="history-date">
              {convertToLocalTime(entry.dateUpdated).toLocaleDateString('he-IL', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div className="history-levels">
              <span className="level-pill" style={{ background: getLevelColor(entry.grammarLevel) }}>
                דקדוק: {entry.grammarLevel}
              </span>
              <span className="level-pill" style={{ background: getLevelColor(entry.vocabularyLevel) }}>
                מילים: {entry.vocabularyLevel}
              </span>
              <span className="level-pill" style={{ background: getLevelColor(entry.readingLevel) }}>
                קריאה: {entry.readingLevel}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`progress-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>טוען נתונים... 📊</p>
        </div>
      </div>
    );
  }

  const latestLevels = getLatestLevels();
  const totalDaysActive = new Set(
    historyData.map(item => convertToLocalTime(item.dateUpdated).toDateString())
  ).size;

  return (
    <div className={`progress-container ${isDarkMode ? 'dark' : 'light'}`}>
      <button
        className="theme-toggle"
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle theme"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <button className="back-button" onClick={() => navigate('/menu')}>
        ← חזרה לתפריט
      </button>

      <div className="progress-content">
        <div className="decorative-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <div className="progress-header-section">
          <h1 className="progress-title">ההתקדמות שלי 🎯</h1>
          <p className="progress-subtitle">מעקב אחר הצלחתך בלימוד אנגלית</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-value">{totalDaysActive}</div>
            <div className="stat-label">ימי תרגול</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-value">{historyData.length}</div>
            <div className="stat-label">משחקים שוחקו</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">
              {latestLevels && getLevelNumber(latestLevels.grammarLevel) +
                getLevelNumber(latestLevels.vocabularyLevel) +
                getLevelNumber(latestLevels.readingLevel)}
            </div>
            <div className="stat-label">נקודות רמה</div>
          </div>
        </div>

        {/* Current Levels */}
        {latestLevels && (
          <div className="levels-section">
            <h2 className="section-title">הרמות הנוכחיות שלך</h2>
            <div className="progress-bars">
              {renderProgressBar('דקדוק (Grammar)', latestLevels.grammarLevel, '📚')}
              {renderProgressBar('אוצר מילים (Vocabulary)', latestLevels.vocabularyLevel, '💬')}
              {renderProgressBar('קריאה (Reading)', latestLevels.readingLevel, '📖')}
            </div>
          </div>
        )}

        {/* Calendar and History */}
        <div className="calendar-history-grid">
          <div className="calendar-section">
            <h2 className="section-title">לוח פעילות חודשי</h2>
            <div className="month-selector">
              <button
                onClick={() =>
                  setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
                }
              >
                ←
              </button>
              <span className="month-display">
                {currentMonth.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() =>
                  setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
                }
                disabled={currentMonth.getMonth() === new Date().getMonth()}
              >
                →
              </button>
            </div>
            <div className="calendar-grid">{renderCalendar()}</div>
            <div className="calendar-legend">
              <span className="legend-item">
                <span className="legend-dot active"></span>
                יום פעיל
              </span>
              <span className="legend-item">
                <span className="legend-dot"></span>
                אין פעילות
              </span>
            </div>
          </div>

          <div className="history-section">
            <h2 className="section-title">היסטוריה אחרונה</h2>
            {renderLevelHistory()}
          </div>
        </div>

        {/* Motivation Message */}
        <div className="motivation-card">
          {latestLevels &&
          latestLevels.grammarLevel === 'Advanced' &&
          latestLevels.vocabularyLevel === 'Advanced' &&
          latestLevels.readingLevel === 'Advanced' ? (
            <>
              <span className="motivation-icon">🏆</span>
              <p className="motivation-text">כל הכבוד! הגעת לרמה המקסימלית בכל התחומים!</p>
            </>
          ) : (
            <>
              <span className="motivation-icon">🚀</span>
              <p className="motivation-text">המשך להתאמן כדי להגיע לרמה הבאה!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
