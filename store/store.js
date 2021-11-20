import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import locationSlice from "./locationSlice";
import sessionSlice from "./sessionSlice";

export default store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        location : locationSlice.reducer,
        session : sessionSlice.reducer,
    }
})
