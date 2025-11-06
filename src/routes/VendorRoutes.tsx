
import { Routes, Route } from "react-router-dom";
import { VendorRegisterPage } from "@/components/pages/vendor/VendorRegisterPage";
import { VendorLoginPage } from "@/components/pages/vendor/VendorLoginPage";
import VendorEntryPage from "@/components/vendor/VendorEntryPage";

import { ProtectedScanRoute, VendorProtectedRoute } from "@/protected/ProtectedRoute";
import {VendorPublicRoute} from "@/protected/PublicRoute";
import VendorProfilePage from "@/components/vendor/VendorProfilePage";
import ListedEventsPage from "@/components/pages/vendor/ListedEventsPage";
import HostEventPage from "@/components/pages/vendor/HostEventPage";
import AddServicePage from "@/components/pages/vendor/AddServicePage";
import ListedServicePage from "@/components/pages/vendor/ListedServicePage";
import EditServicePage from "@/components/pages/vendor/EditServicePage";
import EditEventPage from "@/components/pages/vendor/EditEventPage";
import { VendorAnalyticsDashboardPage } from "@/components/pages/vendor/VendorDashboardPage";
import VendorChangePasswordPage from "@/components/vendor/VendorChangePasswordPage";
import WorkSamplePage from "@/components/pages/vendor/WorkSamplePage";
import VendorWalletPage from "@/components/pages/vendor/VendorWalletPage";
import VendorBookedServicesPage from "@/components/pages/vendor/VendorBookedServicePage";
import VerifyAttendiesPage from "@/components/pages/vendor/VerifyAttendiesPage";
import ChatPage from "@/components/pages/vendor/ChatPage";



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
      <Route path="/dashboard" element={<VendorAnalyticsDashboardPage/>}/>
      <Route path="/change-password" element={<VendorChangePasswordPage/>}/>
      <Route path="/work-sample" element={<WorkSamplePage/>}/>
      <Route path="/wallet-details" element={<VendorWalletPage/>}/>
      <Route path="/booked-services" element={<VendorBookedServicesPage/>}/>
      <Route path="/chat" element={<ChatPage/>}/>
      </Route>

        <Route element={<ProtectedScanRoute />}>
      <Route path="/verify-attendies" element={<VerifyAttendiesPage />} />
      </Route>
    </Routes>
  );
};
