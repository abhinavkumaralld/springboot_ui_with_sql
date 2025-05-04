import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  photoUrl: "",
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    addAuth(state, action) {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.photoUrl = action.payload.photoUrl;
    },
    removeAuth(state) {
      state.username = "";
      state.password = "";
      state.photoUrl = "";
    },
  },
});

// Export actions
export const { addAuth, removeAuth } = AuthSlice.actions;

// Export reducer
export default AuthSlice.reducer;
