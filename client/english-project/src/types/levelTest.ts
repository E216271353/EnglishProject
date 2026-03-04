export type LevelTestQuestion = {
    id: number;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
    levelWeight: number;
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
};
