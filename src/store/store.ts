import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./slices/clientSlice"
import vendorReducer from "./slices/vendorSlice"
import AdminReduer from "./slices/adminSlice"
export const store = configureStore({
    reducer:{
        client:clientReducer,
        vendor:vendorReducer,
        admin:AdminReduer
    }
});

export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch