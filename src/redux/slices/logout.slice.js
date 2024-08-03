import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDashboard } from "./auth.slice";
export const fetchLogout = createAsyncThunk('fetchLogout', async (_, { dispatch }) => {
  const response = await fetch(import.meta.env.VITE_LOUGOUT_URI, {
    credentials: 'include'
  })
  if (response.status == 200) {
    dispatch(fetchDashboard())
  }
})

const logoutSlice = createSlice({
  name: 'logoutSlice',
  initialState: {
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.isLoading = true
      })
  }
})

export default logoutSlice.reducer