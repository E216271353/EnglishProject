import api from './api'; // ייבוא ה-Axios עם ה-Interceptor
import type { GrammarQuestion } from '../types/grammarQuestion';

export const grammarQuestionsService = {
    getQuestionsByLevel: async (level: string): Promise<GrammarQuestion[]> => {
        if (!level || level.trim() === '') {
            throw new Error('Level parameter is required.');
        }

        // שימוש ב-api במקום ב-axios הרגיל
        // ודאי שהורדת את ה-"api/" מהתחלה כי הוא כבר ב-baseURL
        const response = await api.get<GrammarQuestion[]>(`/GrammarQuestions/${level}`);
        
        return response.data;
    }
};