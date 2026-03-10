import { useState, useEffect } from 'react';
import './levelTest.css';
import { getLevelTestQuestions, submitLevelTest } from '../services/levelTest.service';
import type { LevelTestQuestion, UserAnswer, LevelTestResult } from '../types/levelTest';
import { calculateLevel } from '../types/currentUserLevel';
import { CurrentUserLevelService } from '../services/currentUserLevel.service';

const LevelTest = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [questions, setQuestions] = useState<LevelTestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [testResult, setTestResult] = useState<LevelTestResult | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // score tracking by category
  type Category = 'grammar' | 'vocabulary' | 'comprehension';
  interface ScoreTracker { points: number; max: number; }
  const initialScores: Record<Category, ScoreTracker> = {
    grammar: { points: 0, max: 0 },
    vocabulary: { points: 0, max: 0 },
    comprehension: { points: 0, max: 0 }
  };
  const [scores, setScores] = useState(initialScores);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const data = await getLevelTestQuestions();
      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading questions:', error);
      setIsLoading(false);
    }
  };

  

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedAnswer,
      isCorrect: isCorrect
    };

    // update category scores
    const cat = currentQuestion.category as Category;
    const weight = currentQuestion.levelWeight;
    setScores(prev => ({
      ...prev,
      [cat]: {
        points: prev[cat].points + (isCorrect ? weight : 0),
        max: prev[cat].max + weight
      }
    }));

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer('');

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        finishTest(updatedAnswers);
      }
    }, 1500);
  };

  const finishTest = async (answers: UserAnswer[]) => {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const totalQuestions = questions.length;

    // compute weighted totals
    const totalPoints = scores.grammar.points + scores.vocabulary.points + scores.comprehension.points;
    const totalMax = scores.grammar.max + scores.vocabulary.max + scores.comprehension.max;
    const overallPct = totalMax > 0 ? (totalPoints / totalMax) * 100 : 0;

    // Calculate percentage for each category
    const grammarPct = scores.grammar.max > 0 ? (scores.grammar.points / scores.grammar.max) * 100 : 0;
    const vocabularyPct = scores.vocabulary.max > 0 ? (scores.vocabulary.points / scores.vocabulary.max) * 100 : 0;
    const readingPct = scores.comprehension.max > 0 ? (scores.comprehension.points / scores.comprehension.max) * 100 : 0;

    // Determine individual levels for each category
    const grammarLevel = calculateLevel(grammarPct);
    const vocabularyLevel = calculateLevel(vocabularyPct);
    const readingLevel = calculateLevel(readingPct);

    // determine overall level using combined percentage
    const overallLevel = calculateLevel(overallPct);

    const result: LevelTestResult = {
      userId: 1, // Should come from logged‑in user context
      totalQuestions: totalQuestions,
      correctAnswers: correctCount,
      determinedLevel: overallLevel,
      completedAt: new Date(),
      score: totalPoints // weighted score
    };

    try {
      // Submit the test result
      await submitLevelTest(result);
      
      // Create initial CurrentUserLevel record with category-specific levels
      const userLevelService = new CurrentUserLevelService();
      await userLevelService.addCurrentUserLevel({
        id: 0, // Will be set by server
        userId: result.userId,
        grammarLevel: grammarLevel,
        vocabularyLevel: vocabularyLevel,
        readingLevel: readingLevel,
        dateUpdated: new Date()
      });
      
      setTestResult(result);
      setIsCompleted(true);
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  const handleRetakeTest = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer('');
    setIsCompleted(false);
    setTestResult(null);
    setShowFeedback(false);
    setScores(initialScores);
    loadQuestions();
  };

  if (isLoading) {
    return (
      <div className={`level-test-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your adventure... 🚀</p>
        </div>
      </div>
    );
  }

  if (isCompleted && testResult) {
    const totalMaxPoints = scores.grammar.max + scores.vocabulary.max + scores.comprehension.max;
    const totalEarnedPoints = scores.grammar.points + scores.vocabulary.points + scores.comprehension.points;
    const weightedPct = totalMaxPoints > 0 ? Math.round((totalEarnedPoints / totalMaxPoints) * 100) : 0;

    return (
      <div className={`level-test-container ${isDarkMode ? 'dark' : 'light'}`}>
        <button 
          className="theme-toggle" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle theme"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <div className="test-card result-card">
          <div className="decorative-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>

          <div className="result-header">
            <div className="trophy-container">
              <span className="trophy-icon">🏆</span>
            </div>
            <h1 className="result-title">🎉 Amazing Job! 🎉</h1>
            <p className="result-subtitle">You did wonderfully!</p>
          </div>

          <div className="result-stats">
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{testResult.correctAnswers}</div>
              <div className="stat-label">Correct</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-value">{testResult.totalQuestions}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-value">
                {weightedPct}%
              </div>
              <div className="stat-label">Score</div>
            </div>
          </div>
          {/* category breakdown */}
          <div className="category-breakdown">
            <h3>Category Scores</h3>
            <ul>
              <li>Grammar: {scores.grammar.points}/{scores.grammar.max} ({scores.grammar.max > 0 ? Math.round(scores.grammar.points / scores.grammar.max * 100) : 0}%)</li>
              <li>Vocabulary: {scores.vocabulary.points}/{scores.vocabulary.max} ({scores.vocabulary.max > 0 ? Math.round(scores.vocabulary.points / scores.vocabulary.max * 100) : 0}%)</li>
              <li>Comprehension: {scores.comprehension.points}/{scores.comprehension.max} ({scores.comprehension.max > 0 ? Math.round(scores.comprehension.points / scores.comprehension.max * 100) : 0}%)</li>
            </ul>
          </div>

          <div className="level-badge">
            <div className="badge-glow"></div>
            <h2>Your Level:</h2>
            <div className="level-name">{testResult.determinedLevel}</div>
          </div>

          <div className="motivational-message">
            {testResult.determinedLevel === 'Advanced' && (
              <>
                <p className="message-emoji">⭐</p>
                <p className="message-text">You're a superstar! Keep reaching for the stars!</p>
              </>
            )}
            {testResult.determinedLevel === 'Intermediate' && (
              <>
                <p className="message-emoji">🌟</p>
                <p className="message-text">Great work! You're making excellent progress!</p>
              </>
            )}
            {testResult.determinedLevel === 'Elementary' && (
              <>
                <p className="message-emoji">🌱</p>
                <p className="message-text">You're growing! Keep practicing and you'll bloom!</p>
              </>
            )}
            {testResult.determinedLevel === 'Beginner' && (
              <>
                <p className="message-emoji">🌈</p>
                <p className="message-text">Every expert was once a beginner! You're on the right path!</p>
              </>
            )}
          </div>

          <button className="action-btn" onClick={handleRetakeTest}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className={`level-test-container ${isDarkMode ? 'dark' : 'light'}`}>
      <button 
        className="theme-toggle" 
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle theme"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div className="test-card">
        <div className="decorative-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <div className="test-header">
          <div className="logo-container">
            <div className="logo-circle">
              <span className="logo-icon">🎯</span>
            </div>
          </div>
          <h1 className="test-title">Level Discovery</h1>
          <p className="test-subtitle">✨ Let's Find Your Perfect Starting Point! ✨</p>
        </div>

        <div className="progress-section">
          <div className="progress-info">
            <span className="progress-text">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="progress-emoji">
              {currentQuestionIndex < questions.length / 3 ? '🌱' : 
               currentQuestionIndex < (questions.length * 2) / 3 ? '🌿' : '🌳'}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="question-section">
          <div className="question-number">
            <span className="q-mark">Q</span>
            <span className="q-number">{currentQuestionIndex + 1}</span>
          </div>
          <h2 className="question-text">{currentQuestion.questionText}</h2>
        </div>

        <div className="options-section">
          {['A', 'B', 'C', 'D'].map((letter) => {
            const optionText = currentQuestion[`option${letter}` as keyof LevelTestQuestion] as string;
            const isSelected = selectedAnswer === letter;
            const showCorrect = showFeedback && letter === currentQuestion.correctAnswer;
            const showWrong = showFeedback && isSelected && letter !== currentQuestion.correctAnswer;

            return (
              <button
                key={letter}
                className={`option-btn ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''}`}
                onClick={() => !showFeedback && handleAnswerSelect(letter)}
                disabled={showFeedback}
              >
                <div className="option-letter">{letter}</div>
                <div className="option-text">{optionText}</div>
                {showCorrect && <span className="feedback-icon">✅</span>}
                {showWrong && <span className="feedback-icon">❌</span>}
              </button>
            );
          })}
        </div>

        <div className="action-section">
          <button
            className="submit-btn"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer || showFeedback}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Test 🎉'}
          </button>
        </div>

        <div className="encouragement">
          <p className="encouragement-text">
            {currentQuestionIndex < 3 ? '🌟 You\'re doing great! Keep going!' :
             currentQuestionIndex < 6 ? '💪 Awesome progress! You\'re a star!' :
             '🚀 Almost there! You\'re amazing!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LevelTest;
