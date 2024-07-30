import { configureStore } from '@reduxjs/toolkit';
import adminSlice from '../slices/adminSlices/adminSlice';

const store = configureStore({
  reducer: {
    adminInfo: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
