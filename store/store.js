import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import locationSlice from "./locationSlice";

export default store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        location : locationSlice.reducer
    }
})
