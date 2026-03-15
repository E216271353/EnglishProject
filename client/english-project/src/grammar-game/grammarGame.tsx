import { useState, useEffect } from 'react';
import { grammarQuestionsService } from '../services/grammarQuestions.service';
import { getUserLevel } from '../services/currentUserLevel.service';
import type { GrammarQuestion } from '../types/grammarQuestion';
import './grammarGame.css';

const GrammarGame = () => {
  const [questions, setQuestions] = useState<GrammarQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState(0);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get user ID from session storage
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        setError('משתמש לא נמצא. אנא התחבר שוב.');
        return;
      }

      // Get user's current level
      const userLevelData = await getUserLevel(parseInt(userId));
      const userLevel = userLevelData?.grammarLevel || 'Beginner';

      // Define level order from low to high
      const levelOrder = ['Beginner', 'Intermediate', 'Advanced'];
      const currentLevelIndex = levelOrder.indexOf(userLevel);
      
      // Fetch questions for current level and all lower levels
      const allQuestions: GrammarQuestion[] = [];
      for (let i = 0; i <= currentLevelIndex; i++) {
        const levelQuestions = await grammarQuestionsService.getQuestionsByLevel(levelOrder[i]);
        allQuestions.push(...levelQuestions);
      }

      // Sort questions by level (Beginner first, then Intermediate, then Advanced)
      const sortedQuestions = allQuestions.sort((a, b) => {
        const levelA = levelOrder.indexOf(a.level);
        const levelB = levelOrder.indexOf(b.level);
        return levelA - levelB;
      });

      setQuestions(sortedQuestions);
      setLoading(false);
    } catch (err) {
      console.error('Error loading questions:', err);
      setError('נכשל בטעינת השאלות. נסה שוב!');
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correct = userAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setCompletedQuestions(completedQuestions + 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setShowResult(false);
      setShowHint(false);
      setUserAnswer('');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question - just hide result to show completion screen
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setShowHint(false);
    setShowResult(false);
    setScore(0);
    setCompletedQuestions(0);
  };

  if (loading) {
    return (
      <div className="grammar-game-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p className="loading-text">טוען את ההרפתקה שלך... 🚀</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grammar-game-container">
        <div className="error-message">
          <span className="error-icon">😞</span>
          <p>{error}</p>
          <button className="retry-button" onClick={loadQuestions}>
            נסה שוב! 🔄
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="grammar-game-container">
        <div className="no-questions">
          <span className="no-questions-icon">📚</span>
          <p>אין שאלות זמינות עדיין!</p>
          <p className="sub-text">תחזור בקרוב לעוד כיף!</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Game completed
  if (completedQuestions === questions.length && !showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="grammar-game-container">
        <div className="completion-screen">
          <div className="celebration-icon">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '🌟' : '💪'}
          </div>
          <h2 className="completion-title">
            {percentage >= 80 ? '!מדהים' : percentage >= 60 ? '!עבודה מצוינת' : '!תמשיך כך'}
          </h2>
          <div className="final-score">
            <span className="score-number">{score}</span>
            <span className="score-total">/ {questions.length}</span>
          </div>
          <div className="percentage-badge">!{percentage}% נכון</div>
          <p className="encouragement">
            {percentage >= 80 
              ? "!את/ה כוכב דקדוק ⭐" 
              : percentage >= 60 
              ? "!את/ה עושה נהדר! תמשיך לתרגל 🚀"
              : "!כל ניסיון עושה אותך חזק יותר 💪"}
          </p>
          <button className="play-again-button" onClick={handleRestart}>
            !שחק שוב 🎮
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grammar-game-container">

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
        <div className="progress-text">
          שאלה {currentQuestionIndex + 1} מתוך {questions.length}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="question-card">
        <div className="question-number">שאלה {currentQuestionIndex + 1}</div>
        
        {!showResult && (
          <div className="sentence-display">
            <p className="sentence-text">{currentQuestion.sentenceText}</p>
          </div>
        )}

        {!showResult ? (
          <div className="answer-section">
            <input
              type="text"
              className="answer-input"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="הקלד את התשובה שלך כאן..."
              autoFocus
            />
            
            <div className="button-group">
              <button 
                className="submit-button"
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
              >
                ✓ בדוק תשובה
              </button>
              
              <button 
                className="hint-button"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? '👁️ הסתר רמז' : '💡 צריך רמז?'}
              </button>
            </div>

            {showHint && (
              <div className="hint-box">
                <span className="hint-icon">💡</span>
                <p className="hint-text">{currentQuestion.hint}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="result-section">
            <div className={`result-card ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="result-icon">
                {isCorrect ? '🎉' : '🤔'}
              </div>
              <h3 className="result-title">
                {isCorrect ? '!מעולה' : '!לא בדיוק'}
              </h3>
              <div className="answer-display">
                <p className="label">:תשובה נכונה</p>
                <p className="correct-answer">{currentQuestion.correctAnswer}</p>
              </div>
              <div className="explanation-box">
                <p className="explanation-label">:💭 הסבר</p>
                <p className="explanation-text">{currentQuestion.explanation}</p>
              </div>
            </div>
            
            <button className="next-button" onClick={handleNext}>
              {isLastQuestion ? '🎊 ראה תוצאות!' : 'שאלה הבאה ←'}
            </button>
          </div>
        )}
      </div>

      {/* Encouraging Footer */}
      <div className="game-footer">
        <p className="encouragement-text">
          {!showResult 
            ? "!אתה יכול 💪" 
            : isCorrect 
            ? "!המשך בעבודה המעולה 🌟" 
            : "!למד מטעויות 📚"}
        </p>
      </div>
    </div>
  );
};

export default GrammarGame;
