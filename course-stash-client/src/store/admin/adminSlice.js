import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    username: "",
    courses: [],
    isLoggedIn: false,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsername, setCourses, login, logout } = adminSlice.actions;

export default adminSlice.reducer;
