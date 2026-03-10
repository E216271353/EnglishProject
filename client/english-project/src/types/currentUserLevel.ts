export type LevelType = 'Beginner' | 'Intermediate' | 'Advanced';

export type CurrentUserLevel = {
    id: number;
    userId: number;
    grammarLevel: LevelType;
    vocabularyLevel: LevelType;
    readingLevel: LevelType;
    dateUpdated: Date;
}

/**
 * Calculate level based on percentage score
 * < 50% = Beginner
 * 50-80% = Intermediate  
 * >= 80% = Advanced
 */
export const calculateLevel = (percentage: number): LevelType => {
    if (percentage < 50) return 'Beginner';
    if (percentage < 80) return 'Intermediate';
    return 'Advanced';
};