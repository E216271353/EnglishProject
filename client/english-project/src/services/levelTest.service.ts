import api from './api'; // ייבוא ה-Axios המרכזי עם ה-Interceptor
import type { LevelTestQuestion, LevelTestResult } from '../types/levelTest';

export const getLevelTestQuestions = async (): Promise<LevelTestQuestion[]> => {
    // הוספת ה-Token מתבצעת אוטומטית עכשיו!
    const response = await api.get<LevelTestQuestion[]>(`/LevelTest/testQuestions`);
    return response.data;
};

export const submitLevelTest = async (result: LevelTestResult): Promise<LevelTestResult> => {
    // Axios יהפוך את ה-result ל-JSON לבד
    const response = await api.post<LevelTestResult>(`/LevelTest/addResult`, result);
    return response.data;
};