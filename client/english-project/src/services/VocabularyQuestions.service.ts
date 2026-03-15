import axios from 'axios';
import type { VocabularyQuestions } from '../types/vocabularyQuestions';

export const vocabularyQuestionsService = {
    getQuestionsByLevel: async (level: string): Promise<VocabularyQuestions[]> => {
        if (!level || level.trim() === '') {
            throw new Error('Level parameter is required.');
        }
        const response = await axios.get<VocabularyQuestions[]>(`api/VocabularyQuestions/${level}`);
        return response.data;
    }
};
