
import { Routes, Route } from "react-router-dom";
import { VendorRegisterPage } from "@/components/pages/vendor/VendorRegisterPage";
import { VendorLoginPage } from "@/components/pages/vendor/VendorLoginPage";
import VendorEntryPage from "@/components/vendor/VendorEntryPage";

import { VendorProtectedRoute } from "@/protected/ProtectedRoute";
import {VendorPublicRoute} from "@/protected/PublicRoute";
import VendorProfilePage from "@/components/vendor/VendorProfilePage";
import ListedEventsPage from "@/components/pages/vendor/ListedEventsPage";
import HostEventPage from "@/components/vendor/HostEventPage";
import AddServicePage from "@/components/pages/vendor/AddServicePage";
import ListedServicePage from "@/components/pages/vendor/ListedServicePage";
import EditServicePage from "@/components/pages/vendor/EditServicePage";
import EditEventPage from "@/components/vendor/EditEventPage";



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
      <Route path="/addService" element={<AddServicePage/>}/>
      <Route path="services" element={<ListedServicePage/>}/>
      <Route path="/edit-service/:serviceId" element={<EditServicePage/>} />
      <Route path="/edit-event/:eventId" element={<EditEventPage/>}/>
      </Route>
    </Routes>
  );
};
