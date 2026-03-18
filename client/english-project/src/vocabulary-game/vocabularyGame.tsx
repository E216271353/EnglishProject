import { useState, useEffect, useRef } from 'react';
import { useUserLevel } from '../context/UserLevelContext';
import { vocabularyQuestionsService } from '../services/VocabularyQuestions.service';
import { getCurrentUserLevelByUserId, updateByLastAndUpdateLevel } from '../services/currentUserLevel.service';
import type { VocabularyQuestions } from '../types/vocabularyQuestions';
import './vocabularyGame.css';

// Collection of Hebrew words for wrong answers
const hebrewWordsCollection = [
  'תפוח', 'בננה', 'תפוז', 'אבטיח', 'ענבים', 'תות', 'אגס', 'אפרסק',
  'כלב', 'חתול', 'ציפור', 'דג', 'סוס', 'פיל', 'אריה', 'נמר',
  'בית', 'רכב', 'ספר', 'עט', 'שולחן', 'כיסא', 'דלת', 'חלון',
  'ים', 'הר', 'נהר', 'יער', 'שמש', 'ירח', 'כוכב', 'עץ',
  'אדום', 'כחול', 'ירוק', 'צהוב', 'שחור', 'לבן', 'כתום', 'סגול',
  'גדול', 'קטן', 'מהיר', 'איטי', 'חזק', 'חלש', 'יפה', 'מכוער',
  'לאכול', 'לשתות', 'לישון', 'לקרוא', 'לכתוב', 'ללכת', 'לרוץ', 'לשחק',
  'מים', 'חלב', 'לחם', 'גבינה', 'ביצה', 'עוגה', 'בשר', 'דג',
  'ראש', 'יד', 'רגל', 'עין', 'אוזן', 'אף', 'פה', 'שן',
  'שמח', 'עצוב', 'כועס', 'מפחד', 'נרגש', 'עייף', 'רעב', 'צמא'
];

const VocabularyGame = () => {
  const [questions, setQuestions] = useState<VocabularyQuestions[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const hasLoadedRef = useRef(false);
  const { updateVocabularyLevel } = useUserLevel();

  useEffect(() => {
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadQuestions();
    }
  }, []);

  // Update level when game is completed
  useEffect(() => {
    if (completedQuestions === questions.length && !showResult && questions.length > 0) {
      const percentage = Math.round((score / questions.length) * 100);
      const userId = sessionStorage.getItem('userId');
      const levelOrder = ['Beginner', 'Intermediate', 'Advanced'];
      const currentLevel = questions[questions.length - 1]?.level || 'Beginner';
      const nextLevelIndex = levelOrder.indexOf(currentLevel) + 1;
      const nextLevel = levelOrder[nextLevelIndex] || null;
      
      if (userId) {
        const newLevel = percentage === 100 && nextLevel ? nextLevel : currentLevel;
        updateByLastAndUpdateLevel(parseInt(userId), 'vocabulary', newLevel)
          .then(() => {
            // Update context
            updateVocabularyLevel(newLevel);
          })
          .catch(err => console.error('Failed to update user level:', err));
      }
    }
  }, [completedQuestions, showResult, questions, score, updateVocabularyLevel]);

  const loadQuestions = async () => {
    console.log('loadQuestions called, current questions count:', questions.length);
    try {
      setLoading(true);
      setError('');
      
      // Get user ID from session storage
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        setError('משתמש לא נמצא. אנא התחבר שוב.');
        setLoading(false);
        return;
      }

      // Get user's current level with error handling
      let userLevel = 'Beginner';
      try {
        const userLevelData = await getCurrentUserLevelByUserId(parseInt(userId));
        userLevel = userLevelData?.vocabularyLevel || 'Beginner';
      } catch (levelError) {
        console.warn('Could not fetch user level, defaulting to Beginner:', levelError);
        // Continue with default level
      }

      // Fetch questions for user's current level (backend handles returning all appropriate questions)
      const allQuestions = await vocabularyQuestionsService.getQuestionsByLevel(userLevel);
      console.log(`Fetched ${allQuestions.length} questions for level ${userLevel}`);

      setQuestions(allQuestions);
      console.log(`Questions set to state: ${allQuestions.length}`);
      if (allQuestions.length > 0) {
        console.log('First question:', allQuestions[0]);
        console.log('CorrectMatch:', allQuestions[0].correctMatch);
        generateAnswerOptions(allQuestions, 0);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading questions:', err);
      setError('נכשל בטעינת השאלות. נסה שוב!');
      setLoading(false);
    }
  };

  const generateAnswerOptions = (allQuestions: VocabularyQuestions[], questionIndex: number) => {
    const currentQuestion = allQuestions[questionIndex];
    const correctAnswer = currentQuestion.correctMatch;
    
    console.log('Current question word:', currentQuestion.word);
    console.log('Correct answer:', correctAnswer);
    
    // Get 3 random wrong answers from the Hebrew collection (excluding the correct answer)
    const availableWrongAnswers = hebrewWordsCollection.filter(word => word !== correctAnswer);
    const wrongAnswers = availableWrongAnswers
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    console.log('Wrong answers:', wrongAnswers);
    
    // Combine and shuffle all options
    const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    console.log('All options:', options);
    setAnswerOptions(options);
  };

  const handleSelectAnswer = (answer: string) => {
    if (showResult) return; // Prevent changing answer after submission
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correctMatch;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setCompletedQuestions(completedQuestions + 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setShowResult(false);
      setSelectedAnswer('');
      setCurrentQuestionIndex(nextIndex);
      generateAnswerOptions(questions, nextIndex);
    } else {
      // Last question - just hide result to show completion screen
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setCompletedQuestions(0);
    if (questions.length > 0) {
      generateAnswerOptions(questions, 0);
    }
  };

  if (loading) {
    return (
      <div className="vocabulary-game-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p className="loading-text">טוען את ההרפתקה שלך... 🚀</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vocabulary-game-container">
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
      <div className="vocabulary-game-container">
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
      <div className="vocabulary-game-container">
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
              ? "!את/ה כוכב אוצר מילים ⭐" 
              : percentage >= 60 
              ? "!את/ה עושה נהדר! תמשיך לתרגל 🚀"
              : "!כל נסיון עושה אותך חזק יותר 💪"}
          </p>
          <button className="play-again-button" onClick={handleRestart}>
            !שחק שוב 🎮
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vocabulary-game-container">

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
          <div className="word-display">
            <p className="word-label">:בחר את התרגום הנכון למילה</p>
            <p className="word-text">{currentQuestion.word}</p>
          </div>
        )}

        {!showResult ? (
          <div className="matching-section">
            <div className="options-grid">
              {answerOptions.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
                  onClick={() => handleSelectAnswer(option)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>
            
            <button 
              className="submit-button-vocab"
              onClick={handleSubmit}
              disabled={!selectedAnswer}
            >
              ✓ בדוק תשובה
            </button>
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
              <div className="word-result-display">
                <p className="word-shown">{currentQuestion.word}</p>
                <span className="arrow">↓</span>
                <p className="correct-match">{currentQuestion.correctMatch}</p>
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

export default VocabularyGame;
