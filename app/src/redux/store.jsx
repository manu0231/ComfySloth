import { configureStore } from '@reduxjs/toolkit';
import reviewSlice from './slice/reviewSlice';

export const store = configureStore({
  reducer: {
    review: reviewSlice // Accessing the reducer from your reviewSlice
  }
});
