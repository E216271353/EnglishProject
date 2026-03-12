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
    category: 'grammar' | 'vocabulary' | 'reading';
};

export type UserAnswer = {
    questionId: number;
    selectedAnswer: string;
    isCorrect: boolean;
};

export type LevelTestResult = {
    userId: number;
    score: number;
    calculatedLevel: string;
    dateTaken: Date;
};
