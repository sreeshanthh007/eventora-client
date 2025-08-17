import { createAsyncThunk, createSlice ,  } from "@reduxjs/toolkit";
import {type  PayloadAction } from "@reduxjs/toolkit";
// import { IVendor } from "@/types/User";
// import { refreshVendorSession } from "@/services/vendor/VendorServices";

interface Vendor {
    id:string,
    name:string,
    email:string,
    phone?:string
    role?:string,
    vendorStatus?:boolean
}


interface IVendorState {
    vendor:Vendor | null
}





const initialState : IVendorState =  {
    vendor:JSON.parse(localStorage.getItem("vendorSession") || 'null')
}


// export const refreshVendorSessionThunk = createAsyncThunk<
//     {vendor:IVendor},
//     void,
//     {rejectValue:string}
// >("vendor/refreshSession",async (_,{rejectWithValue})=>{
//     try {
//         const user = await refreshVendorSession()
//         const mappedVendor : IVendor ={
//             name:user.name,
//             email:user.email,
//             phone:user.phone,
//             vendorStatus:user.vendorStatus,
//             profileImage:user.profileImage,
//         };
//         return {vendor:mappedVendor}

//     } catch (error) {
//         return rejectWithValue("Failed to refresh session");
//     }
// });

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
        },
        // extraReducers : (builder)=>{
        //     builder
        //     .addCase(refreshVendorSessionThunk.fulfilled,(state,action)=>{
        //         state.vendor = action.payload.vendor
        //     })

        //     .addCase()
        // }
    }
});


export const {vendorLogin,vendorLogout} = vendorSlice.actions
export default vendorSlice.reducer

