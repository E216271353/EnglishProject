import { createSlice } from '@reduxjs/toolkit';
import type {  PayloadAction } from '@reduxjs/toolkit';

interface UserLevelState {
  grammarLevel: string;
  vocabularyLevel: string;
  readingLevel: string;
  levelsLoaded: boolean;
  lastUpdated: number;
}

const initialState: UserLevelState = {
  grammarLevel: 'Beginner',
  vocabularyLevel: 'Beginner',
  readingLevel: 'Beginner',
  levelsLoaded: false,
  lastUpdated: Date.now()
};

const userLevelSlice = createSlice({
  name: 'userLevel',
  initialState,
  reducers: {
    setUserLevels: (state, action: PayloadAction<Partial<UserLevelState>>) => {
      const p = action.payload;
      return {
        ...state,
        grammarLevel:    p.grammarLevel    || state.grammarLevel,
        vocabularyLevel: p.vocabularyLevel || state.vocabularyLevel,
        readingLevel:    p.readingLevel    || state.readingLevel,
        levelsLoaded: true,
        lastUpdated: Date.now()
      };
    },
    updateGrammarLevel: (state, action: PayloadAction<string>) => {
      state.grammarLevel = action.payload;
      state.lastUpdated = Date.now();
    },
    updateVocabularyLevel: (state, action: PayloadAction<string>) => {
      state.vocabularyLevel = action.payload;
      state.lastUpdated = Date.now();
    },
    updateReadingLevel: (state, action: PayloadAction<string>) => {
      state.readingLevel = action.payload;
      state.lastUpdated = Date.now();
    }
  }
});

export const { setUserLevels, updateGrammarLevel, updateVocabularyLevel, updateReadingLevel } = userLevelSlice.actions;
export default userLevelSlice.reducer;
