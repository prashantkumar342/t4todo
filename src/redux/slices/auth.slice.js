import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDashboard = createAsyncThunk("fetchDashboard", async () => {
  const response = await fetch(import.meta.env.VITE_DASHBOARD_URI, { method: 'GET', credentials: 'include' });
  if (response.status == 200) {
    return { jsonData: await response.json(), statusCode: await response.status }
  }
  else {
    return await response.status;
  }
})

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    isLoading: false,
    isAuthenticated: false,
    data: [],
    isError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.jsonData;
        if (action.payload.statusCode == 200) {
          state.isAuthenticated = true;
        }

      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message
        state.isAuthenticated = false;
      });
  }
})

export default authSlice.reducer;