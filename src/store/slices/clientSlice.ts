
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



interface Client {
    id:string,
    name:string,
    email:string,
    role:string
}


interface IClientState {
    client : Client | null
}

const initialState : IClientState = {
    client:JSON.parse(sessionStorage.getItem("clientSession") || "null")
}

const clientSlice = createSlice({
    name:"client",
    initialState,
    reducers:{
        clientLogin:(state,action:PayloadAction<Client>) =>{
            state.client = action.payload
            sessionStorage.setItem("clientSession",JSON.stringify(action.payload))
        },
        clientLogout:(state)=>{
            state.client = null
            sessionStorage.removeItem("clientSession")
        }
    }
});


export const {clientLogin,clientLogout} = clientSlice.actions
export default clientSlice.reducer