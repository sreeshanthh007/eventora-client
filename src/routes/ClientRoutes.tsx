import { Routes, Route } from "react-router-dom";
import { ClientLogin } from "@/components/pages/client/ClientLogin";
import { ClientRegister } from "@/components/pages/client/ClientRegister";
import { ClientLandingPage } from "@/components/pages/client/ClientLandingPage";
import { NotFound } from "@/Custom404Page";

import { ClientProtectedRoute } from "@/protected/ProtectedRoute";
import { ClientPublicRoute } from "@/protected/PublicRoute";
import ProfilePage from "@/components/pages/client/ProfileSidebarPage"; 
import EventsPage from "@/components/pages/client/EventPage";
import EventDetailsPage from "@/components/pages/client/EventDetailsPage";
import ServicesPage from "@/components/pages/client/ServicePage";
import ServiceDetailsPage from "@/components/pages/client/ServiceDetailsPage";
import BookedEventsPage from "@/components/pages/client/BookedEventsPage";
import ChangePasswordPage from "@/components/pages/client/ChangePasswordPage";
import ClientWalletPage from "@/components/pages/client/ClientWalletPage";


const ClientRoutes = () => {
  return (
    <Routes>
  
      <Route element={<ClientPublicRoute />}>
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/register" element={<ClientRegister />} />

      </Route>

    
         <Route path="/" element={<ClientLandingPage />} />
      <Route element={<ClientProtectedRoute />}>
       <Route path="/profile" element={<ProfilePage/>}>
       </Route>
       <Route path="/events" element={<EventsPage/>}/>
      <Route path="/event-details/:eventId" element={<EventDetailsPage/>}/>
      <Route path="/services" element={<ServicesPage/>}/>
      <Route path="/service/:id" element={<ServiceDetailsPage/>}/>
      <Route path="/booked-events" element={<BookedEventsPage/>}/>
      <Route path="/change-password" element={<ChangePasswordPage/>}/>
      <Route path="/client/wallet" element={<ClientWalletPage/>}/>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ClientRoutes;
