import { configureStore } from '@reduxjs/toolkit';
import userLevelReducer from './userLevelSlice';

export const store = configureStore({
  reducer: {
    userLevel: userLevelReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
