import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface InitialStateProps {
    id: number;
    title: string;
    price: number;
    description: string;
    brand: string;
    thumbnail: string;
    quantity : number;
}


interface CartState {
    items: InitialStateProps[];
    total: number;
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
                state.total += items.price;
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            const id = action.payload
            const deleted = state.items.filter((item) => item.id !== id)
            state.items = deleted;
        }
    },
})

export const { addToCart, remove } = counterSlice.actions;

export default counterSlice.reducer;

