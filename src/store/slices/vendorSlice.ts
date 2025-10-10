import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {type  IVendor } from "@/types/User";
import { axiosInstance } from "@/api/interceptor";


interface IVendorState {
  vendor: IVendor | null;
  loading: boolean;
  error: string | null;
}

interface IVendorResponse {
  success: boolean;
  user: IVendor;
}

const initialState: IVendorState = {
  vendor: JSON.parse(localStorage.getItem("vendorSession") || "null"),
  loading: false,
  error: null,
};


export const refreshVendorSessionThunk = createAsyncThunk<
  IVendor,
  void,
  { rejectValue: string }
>("vendor/refreshSession", async (_, { rejectWithValue }) => {
  try {
    const {data} = await axiosInstance.get<IVendorResponse>("/api_v1/_ve/refresh_session");
    console.log("data from slice",data)
    return data.user;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message || "Failed to refresh session");
  }
});

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    vendorLogin: (state, action: PayloadAction<IVendor>) => {
      state.vendor = action.payload;
      localStorage.setItem("vendorSession", JSON.stringify(action.payload));
    },
    vendorLogout: (state) => {
      state.vendor = null;
      localStorage.removeItem("vendorSession");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshVendorSessionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshVendorSessionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload;
      
      })
      .addCase(refreshVendorSessionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to refresh session";
        state.vendor = null;
      });
  },
});

export const { vendorLogin, vendorLogout} = vendorSlice.actions;
export default vendorSlice.reducer;
