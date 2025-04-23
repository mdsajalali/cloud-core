import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { Product } from "@/types"

interface ProductState {
  products: Product[]
  singleProduct: Product | null
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  singleProduct: null,
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("https://admin.refabry.com/api/all/product/get")
    // The products are nested under data.data
    return response.data.data.data || []
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue("An unknown error occurred")
  }
})

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id: string, { rejectWithValue, getState }) => {
    const state = getState() as { products: ProductState }

    // Check if we already have the product in our state
    const existingProduct = state.products.products.find((product) => product.id.toString() === id)

    if (existingProduct) {
      return existingProduct
    }

    try {
      const response = await axios.get("https://admin.refabry.com/api/all/product/get")
      // The products are nested under data.data
      const products = response.data.data.data || []
      const product = products.find((p: Product) => p.id.toString() === id)

      if (!product) {
        return rejectWithValue("Product not found")
      }

      return product
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue("An unknown error occurred")
    }
  },
)

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.products = action.payload || []
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.products = []
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false
        state.singleProduct = action.payload
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.singleProduct = null
      })
  },
})

export default productSlice.reducer
