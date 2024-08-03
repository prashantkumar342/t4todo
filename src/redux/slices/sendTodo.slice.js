import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const saveTodo = createAsyncThunk('saveTodo', async (todoData) => {
  const response = await fetch(import.meta.env.VITE_NEWTODO, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify(todoData)
  })
  return await response.status;
})

const sendTodoSlice = createSlice({
  name: "sendTodoSlice",
  initialState: {
    isLoading: false,
    resStatus: null
  },
  extraReducers: (builder) => {

    builder
      .addCase(saveTodo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(saveTodo.fulfilled, (state, action) => {
        console.log('data sent')
        state.isLoading = false
        state.resStatus = action.payload
      })
      .addCase(saveTodo.rejected, (state, action) => {
        state.isLoading = false,
          state.resStatus = action.payload
      })
  }
})

export default sendTodoSlice.reducer