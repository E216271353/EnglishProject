import axios from 'axios';
import type { LevelTestQuestion, LevelTestResult } from '../types/levelTest';

export const getLevelTestQuestions = async (): Promise<LevelTestQuestion[]> => {
    const response = await axios.get<LevelTestQuestion[]>(`/api/LevelTest/testQuestions`);
    return response.data;
};

export const submitLevelTest = async (result: LevelTestResult): Promise<LevelTestResult> => {
    const response = await axios.post<LevelTestResult>(`/api/LevelTest/addResult`, result);
    return response.data;
};
