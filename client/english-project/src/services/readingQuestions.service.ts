import api from './api'; // ייבוא ה-Axios המרכזי עם ה-Interceptor
import type { ReadingQuestion } from '../types/readingQuestions';

export const getQuestionsByTextId = async (readingId: number): Promise<ReadingQuestion[]> => {
    // הטוקן מתווסף אוטומטית בזכות ה-Interceptor
    const response = await api.get(`/ReadingQuestions/text/${readingId}`);
    return response.data;
};

export const getReadingTextByLevel = async (level: string) => {
    // הורדנו את ה-/api מההתחלה כי הוא כבר ב-baseURL
    const response = await api.get(`/ReadingQuestions/level/${level}`);
    return response.data;
};