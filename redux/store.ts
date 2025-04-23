import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./features/productSlice"
import cartReducer from "./features/cartSlice"
import orderReducer from "./features/orderSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
