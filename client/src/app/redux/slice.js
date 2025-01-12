import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    userId: '',
    image:"",
    isLoggedIn: false
};



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.username = action.payload.username;
            state.userId = action.payload.userId;
            state.image = action.payload.user_image;
            state.isLoggedIn = true;
        },
        loginUser: (state, action) => {
            state.username = action.payload.username;
            state.userId = action.payload.userId;
            state.isLoggedIn = true;
            state.image = action.payload.user_image;
        },
        logoutUser: (state) => {
            state.username = '';
            state.userId = '';
            state.image = '';
            state.isLoggedIn = false;
        }
    }
});


// Action creators
export const { registerUser, loginUser, logoutUser } = userSlice.actions;


export default userSlice.reducer;