import { createSlice } from "@reduxjs/toolkit"

const storedStudentInfo = localStorage.getItem('studentInfo')

const initialState = {
    studentInfo: storedStudentInfo ? JSON.parse(storedStudentInfo) : null
};

const studentSlice = createSlice({
    name: 'studentInfo',
    initialState,
    reducers: {
        setStudentInfo: (state, action) => {
            state.studentInfo = action.payload;
            localStorage.setItem('studentInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.studentInfo = null;
            localStorage.removeItem('studentInfo')
        }
    }
})

export const { setStudentInfo, logout } = studentSlice.actions;
export default studentSlice.reducer