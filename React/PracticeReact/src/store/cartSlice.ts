import {createSlice } from '@reduxjs/toolkit'
import type {PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '../types'

interface CartState {
    item: CartItem[],
    totalAmount: number
}

const initialState: CartState ={
    item: [],
    totalAmount: 0
}

interface AddToCartPayload {
    product: Product;
    quantity: number;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<AddToCartPayload>)=>{
            const {product, quantity} = action.payload
            const existingItem = state.item.find(item => item.id === product.id)
            if (existingItem){
                existingItem.quantity += quantity
            }else{
                state.item.push({...product, quantity})
            }
            state.totalAmount += (product.price * quantity)
        },
        removeFromCart: (state, action: PayloadAction<string>)=>{
            const productId = action.payload
            const existingItemIndex = state.item.findIndex(item => item.id === productId)
             if (existingItemIndex !== -1) {
                const item = state.item[existingItemIndex];
                state.totalAmount -= (item.price * item.quantity)
                state.item.splice(existingItemIndex, 1);
             }
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;