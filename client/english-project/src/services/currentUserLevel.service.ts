import type { CurrentUserLevel } from '../types/currentUserLevel';

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
}
