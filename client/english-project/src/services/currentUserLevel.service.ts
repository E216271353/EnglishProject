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
        const response = await api.get<CurrentUserLevel>(`/CurrentUserLevel/currentuserlevel/${userId}`);
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

        console.log('Calling updateByLastAndUpdateLevel with:', { userId, category, newLevel });

        try {
            const response = await api.post<CurrentUserLevel>(
                `/CurrentUserLevel/updateByLastAndUpdateLevel?userId=${userId}&category=${category}&newLevel=${newLevel}`
            );

            console.log('Update response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Update level error:', error.response?.data || error.message);
            throw error;
        }
    }

export const getAllUserLevelsByUserId = async (userId: number): Promise<CurrentUserLevel[]> => {
    try {
        const response = await api.get<CurrentUserLevel[]>(`/CurrentUserLevel/userprogress/${userId}`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching user level history:', error);
        return [];
    }
}