import { createSelector } from "@reduxjs/toolkit";
import {type  RootState } from "@/store/store";

export const getCurrentUserDetails = createSelector(
  (state: RootState) => state.client.client,
  (state: RootState) => state.vendor.vendor,
  (client, vendor) => {
    if (client) return client;
    if (vendor) return vendor;
    return null;
  }
);