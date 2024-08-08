import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const editUser = createAsyncThunk('editUser', async (userData) => {
  const response = await fetch(import.meta.env.VITE_EDIT_USER, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify(userData)
  })
  return await response.status;
})

const editUserSlice = createSlice({
  name: "editUserSlice",
  initialState: {
    isLoading: false,
    resStatus: null
  },
  extraReducers: (builder) => {

    builder
      .addCase(editUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.resStatus = action.payload
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false,
          state.resStatus = action.payload
      })
  }
})

export default editUserSlice.reducer