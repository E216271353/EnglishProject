import axios from 'axios';
import type { ReadingQuestion } from '../types/readingQuestions';


export const getQuestionsByTextId = async (readingId: number): Promise<ReadingQuestion[]> => {
    const response = await axios.get(`api/ReadingQuestions/text/${readingId}`);
    return response.data;
};

export const getReadingTextByLevel = async (level: string) => {
    const response = await axios.get(`api/ReadingQuestions/level/${level}`);
    return response.data;
};