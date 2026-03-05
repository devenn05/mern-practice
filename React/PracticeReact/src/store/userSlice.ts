import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type { UserProfile } from '../types'

interface UserState{
    currentUser: UserProfile | null,
    isAuthenticated: boolean
    userList: UserProfile[]
}

const initialState: UserState ={
    currentUser: null,
    isAuthenticated: false,
    userList: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginUser: (state, action: PayloadAction<UserProfile>) =>{
            state.currentUser = action.payload;
            state.isAuthenticated = true
        },
        logoutUser: (state) =>{
            state.currentUser = null
            state.isAuthenticated = false
        },
        updateCity: (state, action: PayloadAction<string>)=>{
            if (state.currentUser){
                state.currentUser.address.city = action.payload;
            }
        },
        addUser: (state, action: PayloadAction<UserProfile>)=>{
            state.userList.push(action.payload)
        }
    }
})

export const {loginUser, logoutUser, updateCity, addUser} = userSlice.actions;
export default userSlice.reducer;

