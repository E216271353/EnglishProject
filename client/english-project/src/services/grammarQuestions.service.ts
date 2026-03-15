import axios from 'axios';
import type { GrammarQuestion } from '../types/grammarQuestion';



export const grammarQuestionsService = {
    getQuestionsByLevel: async (level: string): Promise<GrammarQuestion[]> => {
        if (!level || level.trim() === '') {
            throw new Error('Level parameter is required.');
        }

        const response = await axios.get<GrammarQuestion[]>(`api/GrammarQuestions/${level}`);
        return response.data;
    }
};