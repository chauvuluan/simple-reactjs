// src/store/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// gọi API lấy sản phẩm
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { getState,rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const res = await fetch("http://localhost:8081/products", {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 chỉnh token nếu cần
        },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default productSlice.reducer;
