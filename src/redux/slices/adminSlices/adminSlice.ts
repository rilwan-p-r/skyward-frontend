import { createSlice } from "@reduxjs/toolkit"

const storedAdminInfo = localStorage.getItem('adminInfo')

const initialState = {
    adminInfo: storedAdminInfo ? JSON.parse(storedAdminInfo) : null
};

const adminSlice = createSlice({
    name: 'adminInfo',
    initialState,
    reducers: {
        setAdminInfo: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.adminInfo = null;
            localStorage.removeItem('adminInfo')
        }
    }
})

export const { setAdminInfo, logout } = adminSlice.actions;
export default adminSlice.reducer