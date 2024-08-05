import { configureStore } from '@reduxjs/toolkit';
import adminSlice from '../slices/adminSlices/adminSlice';
import teacherSlice from '../slices/teacherSlices/TeacherSlices';
import studentSlice from '../slices/studentSlices/StudentSlices';
const store = configureStore({
  reducer: {
    adminInfo: adminSlice,
    teacherInfo:teacherSlice,
    studentInfo:studentSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
