import { useState, useEffect, useRef } from 'react';
import { useUserLevel } from '../context/UserLevelContext';
import './readingGame.css';
import { getQuestionsByTextId, getReadingTextByLevel } from '../services/readingQuestions.service';
import type { ReadingQuestion,ReadingText } from '../types/readingQuestions';
import { getUserLevel, updateByLastAndUpdateLevel } from '../services/currentUserLevel.service';


const ReadingGame = () => {
    const [texts, setTexts] = useState<ReadingText[]>([]);
    const [questions, setQuestions] = useState<ReadingQuestion[]>([]);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCompletion, setShowCompletion] = useState(false);
    const [answeredCount, setAnsweredCount] = useState(0);
    const hasLoadedRef = useRef(false);
    const { updateReadingLevel } = useUserLevel();

    const levels = ['Beginner', 'Intermediate', 'Advanced'];

    useEffect(() => {
        if (!hasLoadedRef.current) {
            hasLoadedRef.current = true;
            loadContent();
        }
    }, []);

    // Update level when game is completed
    useEffect(() => {
        if (showCompletion && texts.length > 0 && answeredCount > 0) {
            const percentage = Math.round((score / answeredCount) * 100);
            const userId = sessionStorage.getItem('userId');
            const currentLevel = texts[texts.length - 1]?.level || 'Beginner';
            const nextLevelIndex = levels.indexOf(currentLevel) + 1;
            const nextLevel = levels[nextLevelIndex] || null;
            
            if (userId) {
                const newLevel = percentage === 100 && nextLevel ? nextLevel : currentLevel;
                updateByLastAndUpdateLevel(parseInt(userId), 'reading', newLevel)
                    .then(() => {
                        updateReadingLevel(newLevel);
                    })
                    .catch(err => console.error('Failed to update user level:', err));
            }
        }
    }, [showCompletion, texts, score, answeredCount, levels, updateReadingLevel]);

    const loadContent = async () => {
        setLoading(true);
        setError(null);
        try {
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
                const userLevelData = await getUserLevel(parseInt(userId));
                userLevel = userLevelData?.readingLevel || 'Beginner';
            } catch (levelError) {
                console.warn('Could not fetch user level, defaulting to Beginner:', levelError);
                // Continue with default level
            }

            // Fetch texts for user's current level (backend handles returning all appropriate texts)
            const allTexts: ReadingText[] = await getReadingTextByLevel(userLevel);

            // Now fetch questions for all the texts we loaded
            let allQuestions: ReadingQuestion[] = [];
            for (const text of allTexts) {
                const textQuestions = await getQuestionsByTextId(text.id);
                allQuestions = [...allQuestions, ...textQuestions];
            }

            setTexts(allTexts);
            setQuestions(allQuestions);
        } catch (err) {
            setError('שגיאה בטעינת התוכן');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getCurrentText = () => texts[currentTextIndex];
    const getCurrentTextQuestions = () => {
        const currentText = getCurrentText();
        if (!currentText) return [];
        return questions.filter(q => q.readingId === currentText.id);
    };

    const getCurrentQuestion = () => {
        const textQuestions = getCurrentTextQuestions();
        return textQuestions[currentQuestionIndex];
    };

    const handleSelectAnswer = (option: 'A' | 'B' | 'C' | 'D') => {
        if (isCorrect !== null) return;
        setSelectedAnswer(option);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        const currentQuestion = getCurrentQuestion();
        const correct = selectedAnswer === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        if (correct) {
            setScore(score + 1);
        }
        setAnsweredCount(answeredCount + 1);
    };

    const handleNext = () => {
        const textQuestions = getCurrentTextQuestions();

        if (currentQuestionIndex < textQuestions.length - 1) {
            // Move to next question in current text
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
        } else if (currentTextIndex < texts.length - 1) {
            // Move to next text
            setCurrentTextIndex(currentTextIndex + 1);
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setIsCorrect(null);
        } else {
            // All done
            setShowCompletion(true);
        }
    };

    const handleRestart = () => {
        setCurrentTextIndex(0);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setScore(0);
        setShowCompletion(false);
        setAnsweredCount(0);
        loadContent();
    };

    if (loading) {
        return (
            <div className="reading-game-container">
                <p className="loading-text">טוען תוכן קריאה...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="reading-game-container error-message">
                <p>{error}</p>
                <button className="restart-btn" onClick={loadContent}>נסה שוב</button>
            </div>
        );
    }

    if (texts.length === 0 || questions.length === 0) {
        return (
            <div className="reading-game-container no-questions">
                <p>אין תוכן קריאה זמין כרגע</p>
            </div>
        );
    }

    if (showCompletion) {
        const percentage = Math.round((score / answeredCount) * 100);

        return (
            <div className="reading-game-container">
                <div className="completion-screen">
                    <h2 className="completion-title">🎉 כל הכבוד! 🎉</h2>
                    <p className="completion-message">סיימת את כל תרגילי הקריאה!</p>
                    <div className="score-display">
                        <p className="score-text">הציון שלך: {score} מתוך {answeredCount}</p>
                        <p className="percentage-text">{percentage}%</p>
                    </div>
                    <button className="restart-btn" onClick={handleRestart}>
                        שחק שוב 🔄
                    </button>
                </div>
            </div>
        );
    }

    const currentText = getCurrentText();
    const currentQuestion = getCurrentQuestion();
    const textQuestions = getCurrentTextQuestions();
    const totalQuestions = questions.length;

    if (!currentText || !currentQuestion) {
        return (
            <div className="reading-game-container">
                <p className="loading-text">שגיאה בטעינת השאלה</p>
            </div>
        );
    }

    return (
        <div className="reading-game-container">
            {/* Progress Bar */}
            <div className="progress-bar-container">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                ></div>
                <p className="progress-text">
                    שאלה {answeredCount + 1} מתוך {totalQuestions}
                </p>
            </div>

            {/* Reading Text */}
            <div className="reading-text-section">
                <h3 className="text-title">{currentText.title}</h3>
                <div className="text-content">
                    <p className="text-paragraph">{currentText.textContent}</p>
                </div>
            </div>

            {/* Question Section */}
            <div className="question-section">
                <p className="question-text">{currentQuestion.questionText}</p>

                {/* Answer Options Grid */}
                <div className="options-grid">
                    {(['A', 'B', 'C', 'D'] as const).map((option) => {
                        const optionText = currentQuestion[`option${option}`];
                        const isSelected = selectedAnswer === option;
                        const isCorrectAnswer = currentQuestion.correctAnswer === option;
                        const showResult = isCorrect !== null;

                        let buttonClass = 'option-btn';
                        if (showResult) {
                            if (isCorrectAnswer) {
                                buttonClass += ' correct';
                            } else if (isSelected && !isCorrectAnswer) {
                                buttonClass += ' incorrect';
                            }
                        } else if (isSelected) {
                            buttonClass += ' selected';
                        }

                        return (
                            <button
                                key={option}
                                className={buttonClass}
                                onClick={() => handleSelectAnswer(option)}
                                disabled={isCorrect !== null}
                            >
                                <span className="option-label">{option}</span>
                                <span className="option-text">{optionText}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Feedback and Action Buttons */}
                {isCorrect === null ? (
                    <button
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                    >
                        בדוק תשובה ✓
                    </button>
                ) : (
                    <div className="feedback-section">
                        {isCorrect ? (
                            <p className="encouragement-text">🌟 מעולה! תשובה נכונה! 🌟</p>
                        ) : (
                            <p className="encouragement-text">💪 כמעט! נסה שוב בפעם הבאה! 💪</p>
                        )}
                        <button className="next-btn" onClick={handleNext}>
                            {currentQuestionIndex < textQuestions.length - 1
                                ? 'שאלה הבאה →'
                                : currentTextIndex < texts.length - 1
                                ? 'קטע הבא →'
                                : 'סיים →'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReadingGame;
