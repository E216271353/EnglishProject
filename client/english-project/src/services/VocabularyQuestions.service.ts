import api from './api'; // ייבוא ה-Axios עם ה-Interceptor
import type { VocabularyQuestions } from '../types/vocabularyQuestions';

export const vocabularyQuestionsService = {
    getQuestionsByLevel: async (level: string): Promise<VocabularyQuestions[]> => {
        if (!level || level.trim() === '') {
            throw new Error('Level parameter is required.');
        }

        // שימוש ב-api המרכזי שמוסיף את ה-Token אוטומטית
        // שימי לב שהסרנו את ה-"api/" מההתחלה
        const response = await api.get<VocabularyQuestions[]>(`/VocabularyQuestions/${level}`);
        
        return response.data;
    }
};