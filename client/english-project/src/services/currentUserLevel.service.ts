import type { CurrentUserLevel, LevelType } from '../types/currentUserLevel';
import { calculateLevel } from '../types/currentUserLevel';

export class CurrentUserLevelService {


    async addCurrentUserLevel(currentUserLevel: CurrentUserLevel): Promise<void> {
        if (!currentUserLevel) {
            throw new Error("Current user level cannot be null.");
        }

        const response = await fetch('/api/currentuserlevel', {
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

    async getUserLevel(userId: number): Promise<CurrentUserLevel | null> {
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

 
    async updateUserLevel(
        userId: number, 
        category: 'grammar' | 'vocabulary' | 'reading',
        percentage: number
    ): Promise<void> {
        const newLevel = calculateLevel(percentage);
        
        // Get existing level
        const currentLevel = await this.getUserLevel(userId);
        
        if (!currentLevel) {
            throw new Error('User level not found. User must complete the level test first.');
        }

        // Update the specific category
        const updatedLevel: CurrentUserLevel = {
            ...currentLevel,
            [`${category}Level`]: newLevel,
            dateUpdated: new Date()
        };

        const response = await fetch(`/api/currentuserlevel/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedLevel),
        });

        if (!response.ok) {
            throw new Error(`Failed to update ${category} level`);
        }
    }

    calculateLevel(percentage: number): LevelType {
        return calculateLevel(percentage);
    }
}