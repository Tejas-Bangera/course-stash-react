import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    courses: [],
    cart: [],
    cartQuantity: 0,
    cartTotal: 0,
    isLoggedIn: false,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      state.cartTotal = 0;
      state.cartQuantity = 0;
      state.cart.forEach((course) => {
        state.cartTotal += course.price;
        state.cartQuantity += 1;
      });
    },
    addToCart: (state, action) => {
      const course = action.payload;
      state.cart.push(course);
      state.cartQuantity += 1;
      state.cartTotal += course.price;
    },
    removeFromCart: (state, action) => {
      const course = action.payload;
      const updatedCart = state.cart.filter((item) => item._id !== course._id);
      state.cart = [...updatedCart];
      state.cartQuantity -= 1;
      state.cartTotal -= course.price;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourses: (state, action) => {
      const addCoursesList = action.payload;
      state.courses.push(...addCoursesList);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUsername,
  login,
  logout,
  setCart,
  addToCart,
  removeFromCart,
  setCourses,
  addCourses,
} = userSlice.actions;

export default userSlice.reducer;
