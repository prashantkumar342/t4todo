import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk("fetchTodo", async () => {
  const response = await fetch(import.meta.env.VITE_FETCH_TODO, {
    method: 'GET', credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return { todoData: await response.json(), statusCode: await response.status }
})

const fetchTodoSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    isLoading: false,
    resStatus: null,
    data: null
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchTodo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.resStatus = action.payload.statusCode
        state.data = action.payload.todoData
        // console.log(action.payload.todoData)
      })
      .addCase(fetchTodo.rejected, (state) => {
        state.isLoading = false
        // state.resStatus = 401
      })
  }
})

export default fetchTodoSlice.reducer