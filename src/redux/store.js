import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/auth.slice'
import loginReducer from './slices/Login.slice'
import registerReducer from './slices/register.slice'
import logoutReducer from "./slices/logout.slice";
import sendTodoReducer from "./slices/sendTodo.slice"
import fetchTodoReducer from "./slices/todo.slice";
import editUserReducer from "./slices/edituser.slice";
import fetchUserReducer from "./slices/fetchuser.slice";

export const reduxStore = configureStore({
  reducer: {
    authSlice: authReducer,
    loginSlice: loginReducer,
    registerSlice: registerReducer,
    logoutSlice: logoutReducer,
    sendTodoSlice: sendTodoReducer,
    fetchTodoSlice: fetchTodoReducer,
    editUserSlice: editUserReducer,
    fetchUserSlice: fetchUserReducer
  },
});