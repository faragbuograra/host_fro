import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { encryptData, encryptWithPassphrase } from "../helpers/helpers";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem("token", action.payload.data.token);
      localStorage.setItem("type",action.payload.data.type);
      localStorage.setItem("lang",'ar');
      // Example usage
    
   
    const salt = process.env.SALT || '6d090796-ecdf-11ea-adc1-0242ac112345';
    const encryptedData = encryptData(
      action.payload.data.role
      , salt);
    localStorage.setItem('role', encryptedData); 

      const accessToken =
        action.payload.data.token || localStorage.getItem("token");
      const user = "farag";
      state.user = user;
      state.token = accessToken;

    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
      window.location.href = "/login";
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.token;
