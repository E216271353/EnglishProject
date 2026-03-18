import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface UserLevelState {
  grammarLevel: string;
  vocabularyLevel: string;
  readingLevel: string;
}

interface UserLevelContextType {
  userLevels: UserLevelState;
  updateGrammarLevel: (level: string) => void;
  updateVocabularyLevel: (level: string) => void;
  updateReadingLevel: (level: string) => void;
  setUserLevels: (levels: Partial<UserLevelState>) => void;
}

const UserLevelContext = createContext<UserLevelContextType | undefined>(undefined);

export const UserLevelProvider = ({ children }: { children: ReactNode }) => {
  const [userLevels, setUserLevelsState] = useState<UserLevelState>({
    grammarLevel: 'Beginner',
    vocabularyLevel: 'Beginner',
    readingLevel: 'Beginner'
  });

  const updateGrammarLevel = (level: string) => {
    setUserLevelsState(prev => ({ ...prev, grammarLevel: level }));
  };

  const updateVocabularyLevel = (level: string) => {
    setUserLevelsState(prev => ({ ...prev, vocabularyLevel: level }));
  };

  const updateReadingLevel = (level: string) => {
    setUserLevelsState(prev => ({ ...prev, readingLevel: level }));
  };

  const setUserLevels = (levels: Partial<UserLevelState>) => {
    setUserLevelsState(prev => ({ ...prev, ...levels }));
  };

  return (
    <UserLevelContext.Provider
      value={{
        userLevels,
        updateGrammarLevel,
        updateVocabularyLevel,
        updateReadingLevel,
        setUserLevels
      }}
    >
      {children}
    </UserLevelContext.Provider>
  );
};

export const useUserLevel = () => {
  const context = useContext(UserLevelContext);
  if (!context) {
    throw new Error('useUserLevel must be used within UserLevelProvider');
  }
  return context;
};
