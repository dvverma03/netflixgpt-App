import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null }, // Initialize with an object
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    }
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
