import { createSlice ,  } from "@reduxjs/toolkit";
import {type  PayloadAction } from "@reduxjs/toolkit";


interface Vendor {
    id:string,
    name:string,
    email:string,
    phone:string
    role:string
}


interface IVendorState {
    vendor:Vendor | null
}


const initialState : IVendorState =  {
    vendor:JSON.parse(localStorage.getItem("vendorSession") || 'null')
}

const vendorSlice = createSlice({
    name:"vendor",
    initialState,
    reducers:{
        vendorLogin:(state,action:PayloadAction<Vendor>)=>{
            state.vendor = action.payload
            localStorage.setItem("vendorSession",JSON.stringify(action.payload))
        },

        vendorLogout:(state)=>{
            state.vendor=null
            localStorage.removeItem("vendorSession")
        }
    }
});


export const {vendorLogin,vendorLogout} = vendorSlice.actions
export default vendorSlice.reducer

