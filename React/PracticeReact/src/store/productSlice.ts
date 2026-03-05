import {createSlice} from '@reduxjs/toolkit'
import type { Product } from '../types'

interface ProductState {
    products: Product[]
}

const initialState: ProductState = {
    products: [
        { id: 'p1', name: 'Laptop Pro', price: 1200 },
        { id: 'p2', name: 'Mechanical Keyboard', price: 150 },
        { id: 'p3', name: 'Wireless Mouse', price: 45 },
        { id: 'p4', name: 'Curved Monitor', price: 300 },
        { id: 'p5', name: 'Noise Cancelling Headphones', price: 250 },
        { id: 'p6', name: 'Desk Mat', price: 20 },
    ],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {}
})

export default productSlice.reducer;