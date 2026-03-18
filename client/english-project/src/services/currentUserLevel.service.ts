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

        const response = await fetch('/api/CurrentUserLevel/updateByLastAndUpdateLevel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, category, newLevel }),
        });

        if (!response.ok) {
            throw new Error('Failed to update user level');
        }

        return await response.json();
    }

  