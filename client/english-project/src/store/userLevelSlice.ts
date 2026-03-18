import { createSlice } from '@reduxjs/toolkit';
import type {  PayloadAction } from '@reduxjs/toolkit';

interface UserLevelState {
  grammarLevel: string;
  vocabularyLevel: string;
  readingLevel: string;
  lastUpdated: number;
}

const initialState: UserLevelState = {
  grammarLevel: 'Beginner',
  vocabularyLevel: 'Beginner',
  readingLevel: 'Beginner',
  lastUpdated: Date.now()
};

const userLevelSlice = createSlice({
  name: 'userLevel',
  initialState,
  reducers: {
    setUserLevels: (state, action: PayloadAction<Partial<UserLevelState>>) => {
      return {
        ...state,
        ...action.payload,
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
