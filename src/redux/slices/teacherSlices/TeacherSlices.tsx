import { createSlice } from "@reduxjs/toolkit"

const storedTeacherInfo = localStorage.getItem('teacherInfo')

const initialState = {
    teacherInfo: storedTeacherInfo ? JSON.parse(storedTeacherInfo) : null
};

const teacherSlice = createSlice({
    name: 'teacherInfo',
    initialState,
    reducers: {
        setTeacherInfo: (state, action) => {
            state.teacherInfo = action.payload;
            localStorage.setItem('teacherInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.teacherInfo = null;
            localStorage.removeItem('teacherInfo')
        }
    }
})

export const { setTeacherInfo, logout } = teacherSlice.actions;
export default teacherSlice.reducer