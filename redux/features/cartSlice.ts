"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  cart: CartItem[]
}

// Load cart from localStorage if available
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        return JSON.parse(savedCart)
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }
  }
  return []
}

const initialState: CartState = {
  cart: loadCartFromStorage(),
}

// Helper function to save cart to localStorage
const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart))
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.cart.push(action.payload)
      }
      saveCartToStorage(state.cart)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload)
      saveCartToStorage(state.cart)
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.cart.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
      saveCartToStorage(state.cart)
    },
    clearCart: (state) => {
      state.cart = []
      saveCartToStorage(state.cart)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
