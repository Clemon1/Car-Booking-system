/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

const getUser = localStorage.getItem("Carphan");
const initialState = {
  user: getUser ? JSON.parse(getUser) : null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isSuccessful: (state, action) => {
      state.user = action.payload;
      // parsing the payload to localStorage
      localStorage.setItem("Carphan", JSON.stringify(action.payload));
    },
    isLogOut: (state) => {
      state.user = null;
      localStorage.removeItem("Carphan"); // remove the user from localStorage
    },
  },
});

export const { isSuccessful, isLogOut } = authSlice.actions; // exporting action
export const currentUser = (state) => state.auth.user; // current user persist state
export default authSlice.reducer; // export reducer
