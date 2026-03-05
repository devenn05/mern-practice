import {createSlice} from '@reduxjs/toolkit'

interface uiState{
    isDarkMode: boolean
}

const initialState: uiState = {
    isDarkMode: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers:{
        toggleTheme: (state)=>{
            state.isDarkMode = !state.isDarkMode
        }
    }
})

export const {toggleTheme} = uiSlice.actions;
export default uiSlice.reducer;

