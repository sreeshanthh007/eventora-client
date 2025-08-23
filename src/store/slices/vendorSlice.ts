import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {type  IVendor } from "@/types/User";
import { vendorAxiosInstance } from "@/api/provider.axios";

interface IVendorState {
  vendor: IVendor | null;
  loading: boolean;
  error: string | null;
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
    const {data} = await vendorAxiosInstance.get<IVendor>("/refresh_session");
    return data.user;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to refresh session");
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
