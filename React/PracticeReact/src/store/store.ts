import {configureStore} from '@reduxjs/toolkit'
import uiReducer from './uiSlice'
import userReducer from './userSlice';
import productReducer from './productSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
    reducer:{
        ui: uiReducer,
        user: userReducer,
        product: productReducer,
        cart: cartReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

