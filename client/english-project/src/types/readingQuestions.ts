export type ReadingQuestion= {
    id: number;            // מזהה שאלה
    readingId: number;     // קישור לקטע קריאה
    questionText: string;  // השאלה
    optionA: string;       // אפשרות A
    optionB: string;       // אפשרות B
    optionC: string;       // אפשרות C
    optionD: string;       // אפשרות D
    correctAnswer: 'A' | 'B' | 'C' | 'D'; 
};
export type ReadingText= {
    id: number;          // מזהה קטע
    title: string;       // כותרת הקטע
    textContent: string;  // תוכן הקטע
    level: string;       // רמה (Beginner/Intermediate/Advanced)
}