import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface OrderData {
  product_ids: string
  s_product_qty: string
  c_name: string
  c_phone: string
  address: string
  courier: string
  cod_amount: string
  delivery_charge: string
  advance: string | null
  discount_amount: string | null
}

interface OrderState {
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: OrderState = {
  loading: false,
  error: null,
  success: false,
}

export const placeOrder = createAsyncThunk("order/placeOrder", async (orderData: OrderData, { rejectWithValue }) => {
  try {
    const response = await axios.post("https://admin.refabry.com/api/public/order/create", orderData)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
    return rejectWithValue("An unknown error occurred")
  }
})

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.loading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { resetOrderState } = orderSlice.actions
export default orderSlice.reducer
