import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  photoUrl: "",
  accessToken: "",
  refreshToken: "",
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    addAuth(state, action) {
      state.username = action.payload.username;
      state.photoUrl = action.payload.photoUrl;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    removeAuth(state) {
      state.username = "";
      state.photoUrl = "";
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

// Export actions
export const { addAuth, removeAuth } = AuthSlice.actions;

// Export reducer
export default AuthSlice.reducer;
