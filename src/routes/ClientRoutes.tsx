import { Routes, Route } from "react-router-dom";
import { ClientLogin } from "@/components/pages/client/ClientLogin";
import { ClientRegister } from "@/components/pages/client/ClientRegister";
import { ClientLandingPage } from "@/components/pages/client/ClientLandingPage";
import { NotFound } from "@/Custom404Page";

import { ClientProtectedRoute } from "@/protected/ProtectedRoute";
import { ClientPublicRoute } from "@/protected/PublicRoute";


const ClientRoutes = () => {
  return (
    <Routes>
  
      <Route element={<ClientPublicRoute />}>
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/register" element={<ClientRegister />} />

      </Route>

    
         <Route path="/" element={<ClientLandingPage />} />
      <Route element={<ClientProtectedRoute />}>
       
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ClientRoutes;
