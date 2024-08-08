import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("fetchUser", async () => {
  const response = await fetch(import.meta.env.VITE_FETCH_USER, {
    method: 'GET', credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return { userData: await response.json(), statusCode: await response.status }

})

const fetchUserSlice = createSlice({
  name: 'userSlice',
  initialState: {
    isLoading: false,
    resStatus: null,
    data: null
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.resStatus = action.payload.statusCode
        state.data = action.payload.todoData
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false
        // state.resStatus = 401
      })
  }
})

export default fetchUserSlice.reducer