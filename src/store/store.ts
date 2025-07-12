import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./slices/clientSlice"


export const store = configureStore({
    reducer:{
        client:clientReducer
    }
});

export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch