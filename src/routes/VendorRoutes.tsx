
import { Routes, Route } from "react-router-dom";
import { VendorRegisterPage } from "@/components/pages/vendor/VendorRegisterPage";
import { VendorLoginPage } from "@/components/pages/vendor/VendorLoginPage";
import VendorEntryPage from "@/components/vendor/VendorEntryPage";

import { VendorProtectedRoute } from "@/protected/ProtectedRoute";
import {VendorPublicRoute} from "@/protected/PublicRoute";
import VendorProfilePage from "@/components/vendor/VendorProfilePage";
import ListedEventsPage from "@/components/pages/vendor/ListedEventsPage";
import HostEventPage from "@/components/vendor/HostEventPage";


export const VendorRoutes = () => {
  return (
    <Routes>
     
        <Route element={<VendorPublicRoute />}>
        <Route path="register" element={<VendorRegisterPage />} />
        <Route path="login" element={<VendorLoginPage />} />
      </Route>

       
     
      <Route element={<VendorProtectedRoute />}>
       <Route path="" element={<VendorEntryPage />} />
      <Route path="/profile" element={<VendorProfilePage/>}/>
      <Route path="events" element={<ListedEventsPage/>}/>
      <Route path="hostEvent" element={<HostEventPage/>}/>
      </Route>
    </Routes>
  );
};
