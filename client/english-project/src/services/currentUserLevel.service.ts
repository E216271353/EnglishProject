import type { CurrentUserLevel, LevelType } from '../types/currentUserLevel';
import { calculateLevel } from '../types/currentUserLevel';




export const addCurrentUserLevel = async (currentUserLevel: CurrentUserLevel): Promise<void> => {
    if (!currentUserLevel) {
        throw new Error("Current user level cannot be null.");
    }

    const response = await fetch('/api/CurrentUserLevel/addUserLevel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUserLevel),
    });

    if (!response.ok) {
        throw new Error('Failed to add current user level');
    }
}

    export const getUserLevel = async (userId: number): Promise<CurrentUserLevel | null> =>  {
        try {
            const response = await fetch(`/api/currentuserlevel/${userId}`);
            
            if (response.status === 404) {
                return null;
            }
            
            if (!response.ok) {
                throw new Error('Failed to get user level');
            }
            
            return await response.json();
        } catch (error) {
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

  