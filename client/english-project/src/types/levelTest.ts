export type LevelTestQuestion = {
    id: number;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
    levelWeight: number;
    // new field added on server: grammar, vocabulary or comprehension
    category: 'grammar' | 'vocabulary' | 'comprehension';
};

export type UserAnswer = {
    questionId: number;
    selectedAnswer: string;
    isCorrect: boolean;
};

export type LevelTestResult = {
    userId: number;
    totalQuestions: number;
    correctAnswers: number;
    determinedLevel: string;
    completedAt: Date;
    // total weighted score, stored by server entity
    score?: number;
    // NOTE: we don't persist category breakdown because server schema isn't changed
};
