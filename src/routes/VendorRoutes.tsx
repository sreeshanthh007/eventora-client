// ✅ src/routes/VendorRoutes.tsx

import { Routes, Route } from "react-router-dom";
import { VendorRegisterPage } from "@/components/pages/vendor/VendorRegisterPage";
import { VendorLoginPage } from "@/components/pages/vendor/VendorLoginPage";
// import { VendorLandingPage } from "@/components/vendor/VendorLandingPage";
import VendorEntryPage from "@/components/vendor/VendorEntryPage";

import { VendorProtectedRoute } from "@/protected/ProtectedRoute";
import {VendorPublicRoute} from "@/protected/PublicRoute";
// import EditProfilePage from "@/components/pages/vendor/EditProfilePage";
// import { HostEventPage } from "@/components/pages/HostEventPage";/

export const VendorRoutes = () => {
  return (
    <Routes>
     
        <Route element={<VendorPublicRoute />}>
        <Route path="register" element={<VendorRegisterPage />} />
        <Route path="login" element={<VendorLoginPage />} />
      </Route>

       
     
      <Route element={<VendorProtectedRoute />}>
       <Route path="" element={<VendorEntryPage />} />
       {/* <Route path="editProfile" element={<EditProfilePage/>}/> */}
        {/* <Route path="host-event" element={<HostEventPage/>}/> */}
      </Route>
    </Routes>
  );
};
