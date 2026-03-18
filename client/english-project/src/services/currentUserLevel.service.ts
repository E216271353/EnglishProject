import api from './api'; // ייבוא ה-Axios המוגדר שלנו
import type { CurrentUserLevel } from '../types/currentUserLevel';

export const addCurrentUserLevel = async (currentUserLevel: CurrentUserLevel): Promise<void> => {
    if (!currentUserLevel) {
        throw new Error("Current user level cannot be null.");
    }

    // שימוש ב-api.post במקום fetch. ה-Token וה-Content-Type מתווספים אוטומטית!
    await api.post('/CurrentUserLevel/addUserLevel', currentUserLevel);
}

export const getUserLevel = async (userId: number): Promise<CurrentUserLevel | null> => {
    try {
        const response = await api.get<CurrentUserLevel>(`/CurrentUserLevel/${userId}`);
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        console.error('Error fetching user level:', error);
        throw error;
    }
}

export const updateByLastAndUpdateLevel = async (
    userId: number,
    category: string,
    newLevel: string
): Promise<CurrentUserLevel> => {
    if (!category || !newLevel) {
        throw new Error("Category and newLevel are required.");
    }

    // שולחים אובייקט פשוט, Axios כבר יהפוך אותו ל-JSON (body)
    const response = await api.post<CurrentUserLevel>('/CurrentUserLevel/updateByLastAndUpdateLevel', { 
        userId, 
        category, 
        newLevel 
    });

    return response.data;
}