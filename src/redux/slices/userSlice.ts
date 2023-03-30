import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface UserLoginProps {
    id: number;
    username: string;
    accessToken: string;
}

interface UserData {
    pending: boolean;
    user: UserLoginProps;
    error: boolean;
}

const initialState: UserData = {
    pending: false,
    user: {
        id: 0,
        username: '',
        accessToken: ""
    },
    error: false
}


export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        pending: (state) => {
            state.pending = true;
        },
        success: (state, action: PayloadAction<UserLoginProps>) => {
            state.pending = false;
            state.user = action.payload;
        },
        logout: (state) => {
            state.user.accessToken = '';
        }
    },
})

export const { success, pending, logout } = counterSlice.actions;

export default counterSlice.reducer;