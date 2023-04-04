import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import userReducer from './slices/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import productsSlice from './slices/fetchProductsSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    product: productReducer,
    user: userReducer,
    productsData : productsSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
    reducer: persistedReducer,

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch