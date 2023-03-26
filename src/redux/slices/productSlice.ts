import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface InitialStateProps {
    id: number;
    title: string;
    price: number;
    description: string;
    brand: string;
    thumbnail: string;
    quantity: number;
}



interface CartState {
    items: InitialStateProps[];
    total: unknown;
}


const initialState: CartState = {
    items: [],
    total: 0,
}

interface RemoveProp {
    id: number;
}


export const counterSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<InitialStateProps>) => {
            const items = action.payload;
            const existingItem = state.items.findIndex(item => item.id === items.id)
            if (existingItem >= 0) {
                state.items[existingItem].quantity += 1
            }
            else {
                const temp = { ...items, quantity: 1 }
                state.items.push(temp)
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            const id = action.payload
            const deleted = state.items.filter((item) => item.id !== id)
            state.items = deleted;
        },
        increament: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const ext = state.items.findIndex((item) => item.id === id)
            state.items[ext].quantity += 1;
        },

        decrement: (state) => {
            state.items.filter((item) => {
                if (item.quantity > 1) {
                    return item.quantity -= 1
                }
            })
        },
    },
})

export const { addToCart, remove, increament, decrement } = counterSlice.actions;

export default counterSlice.reducer;

