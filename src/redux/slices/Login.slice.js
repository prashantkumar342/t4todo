import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboard } from "./auth.slice";

export const sendLoginData = createAsyncThunk("login", async (userCred, { dispatch }) => {
  const response = await fetch(import.meta.env.VITE_LOGIN_URI, {
    method: 'POST', credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCred),
  })
  if (response.status == 200) {
    dispatch(fetchDashboard())
    return response.status
  }
  else {
    return response.status;
  }
})

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    isLoading: false,
    resStatus: null
  },
  extraReducers: (builder) => {

    builder
      .addCase(sendLoginData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendLoginData.fulfilled, (state, action) => {
        state.isLoading = false
        state.resStatus = action.payload
      })
      .addCase(sendLoginData.rejected, (state, action) => {
        state.isLoading = false,
          state.resStatus = action.payload
      })
  }
})

export default loginSlice.reducer