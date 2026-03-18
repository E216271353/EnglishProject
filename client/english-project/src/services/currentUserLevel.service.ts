import type { CurrentUserLevel } from '../types/currentUserLevel';
import axios from 'axios';





export const addUserLevel = async (currentUserLevel: CurrentUserLevel): Promise<void> => {
    await axios.post(`api/CurrentUserLevel/addUserLevel`, currentUserLevel);
};

export const getCurrentUserLevelByUserId = async (userId: number): Promise<CurrentUserLevel> => {
    const response = await axios.get(`api/CurrentUserLevel/currentuserlevel/${userId}`);
    return response.data;
};

export const updateByLastAndUpdateLevel = async (
    userId: number,
    category: string,
    newLevel: string
): Promise<any> => {
    if (!category || !newLevel) {
        throw new Error("Category and newLevel are required.");
    }

    const params = new URLSearchParams({
        userId: userId.toString(),
        category,
        newLevel
    });
    const response = await fetch(`api/CurrentUserLevel/updateByLastAndUpdateLevel?${params.toString()}`, {
        method: 'POST'
    });
    if (!response.ok) {
        throw new Error('Failed to update user level');
    }
    
    // Check if response has content and proper content-type
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    } else {
        // Backend returns plain text, just return the text
        return await response.text();
    }
};

export const getUserProgress = async (userId: number): Promise<any> => {
    const response = await axios.get(`api/CurrentUserLevel/userprogress/${userId}`);
    return response.data;
};