
// import { clientAxiosInstance } from "@/api/client.axios";
import { axiosInstance } from "@/api/interceptor";
import type { IClient } from "@/types/User";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";



// interface Client {
//     id:string,
//     name:string,
//     email:string,
//     role:string
// }


interface IClientState {
    client : IClient | null
    loading:boolean
    error : string | null
}

const initialState : IClientState = {
    client:JSON.parse(localStorage.getItem("clientSession") || "null"),
      loading: false,
        error: null
}


export const refreshClientSessionThunk = createAsyncThunk<
IClient,
void,
{rejectValue:string}
>("client/refreshSession",async(_,{rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.get("/api_v1/_cl/refresh-session")
        return data.user
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "failed to refresh session")
    }
})

const clientSlice = createSlice({
    name:"client",
    initialState,
    reducers:{
        clientLogin:(state,action:PayloadAction<IClient>) =>{
            state.client = action.payload
            localStorage.setItem("clientSession",JSON.stringify(action.payload))
        },
        clientLogout:(state)=>{
            state.client = null
            localStorage.removeItem("clientSession")
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(refreshClientSessionThunk.pending,(state)=>{
            state.loading = true;
            state.error = null
        })
        .addCase(refreshClientSessionThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.client = action.payload
        localStorage.setItem("clientSession", JSON.stringify(action.payload));
        })
        .addCase(refreshClientSessionThunk.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload || "failed to refresh session"
            state.client = null
        })
    }
});


export const {clientLogin,clientLogout} = clientSlice.actions
export default clientSlice.reducer