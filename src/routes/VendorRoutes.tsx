// ✅ src/routes/VendorRoutes.tsx

import { Routes, Route } from "react-router-dom";
import { VendorRegisterPage } from "@/components/pages/vendor/VendorRegisterPage";
import { VendorLoginPage } from "@/components/pages/vendor/VendorLoginPage";
import { VendorLandingPage } from "@/components/vendor/VendorLandingPage";

import { VendorProtectedRoute } from "@/protected/ProtectedRoute";
import {VendorPublicRoute} from "@/protected/PublicRoute";

export const VendorRoutes = () => {
  return (
    <Routes>
      {/* Public routes - only visible when NOT logged in */}
      <Route element={<VendorPublicRoute />}>
        <Route path="register" element={<VendorRegisterPage />} />
        <Route path="login" element={<VendorLoginPage />} />
      </Route>

      {/* Protected route - only accessible when logged in */}
      <Route element={<VendorProtectedRoute />}>
        <Route path="" element={<VendorLandingPage />} />
        {/* 👆 this matches "/vendor" correctly */}
      </Route>
    </Routes>
  );
};
