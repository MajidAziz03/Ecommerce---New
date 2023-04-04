import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../../utils";


export interface InitialStateProps {
    id: number;
    title: string;
    price: number;
    description: string;
    brand: string;
    thumbnail: string;
}

interface ProductsState {
    isLoading: boolean;
    products: InitialStateProps[];
    isError: boolean;
}

const initialState: ProductsState = {
    isLoading: false,
    products: [],
    isError: false
}

export const fetchProducts = createAsyncThunk('fetch/products', async () => {
    try {
        const res = await instance.get('products')
        return res.data.products
    }
    catch (error: any) {
        console.log(error)
    }
})

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        })
    }
})


export default productsSlice.reducer;