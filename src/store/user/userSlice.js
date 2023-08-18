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
    setCourses: (state, action) => {
      state.courses = action.payload;
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
      state.cart.push(action.payload);
      state.cartQuantity += 1;
      state.cartTotal += action.payload.price;
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((course) => course.id != action.payload);
      state.cartQuantity -= 1;
      state.cartTotal -= action.payload.price;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUsername,
  setCourses,
  login,
  logout,
  setCart,
  addToCart,
  removeFromCart,
} = userSlice.actions;

export default userSlice.reducer;
