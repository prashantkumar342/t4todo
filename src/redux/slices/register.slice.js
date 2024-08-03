import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk('registerUser', async (userData) => {
  const response = await fetch(import.meta.env.VITE_REGISTER_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    credentials: "include"
  })
  return response.status
});

const registerSlice = createSlice({
  name: 'registerSlice',
  initialState: {
    resStatus: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true
    })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false,
          state.resStatus = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false,
          state.resStatus = action.payload
      })
  }
})

export default registerSlice.reducer