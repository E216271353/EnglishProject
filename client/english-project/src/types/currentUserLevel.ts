export type LevelType = 'Beginner' | 'Intermediate' | 'Advanced';

export type CurrentUserLevel = {
    userId: number;
    grammarLevel: LevelType;
    vocabularyLevel: LevelType;
    readingLevel: LevelType;
    dateUpdated: Date;
}

export const calculateLevel = (percentage: number): LevelType => {
    if (percentage < 50) return 'Beginner';
    if (percentage < 80) return 'Intermediate';
    return 'Advanced';
};