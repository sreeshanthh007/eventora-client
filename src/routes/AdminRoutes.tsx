import { Routes, Route } from "react-router-dom";
import { NotFound } from "@/Custom404Page";

import AdminLoginPage from "@/components/pages/admin/AdminPage";
import AdminDashboard from "@/components/admin/Admindashboard";
import ClientManagementPage from "@/components/pages/admin/ClientManagement";
import { AdminProtectedRoute } from "@/protected/ProtectedRoute";
import { AdminPublicRoute } from "@/protected/PublicRoute";
import VendorManagementPage from "@/components/pages/admin/VendorManagement";

export const AdminRoutes = () => {
  return (
    <>
    
    <Routes>

      <Route element={<AdminPublicRoute />}>
      <Route path="/login" element={<AdminLoginPage />} />
    </Route>

     <Route element={<AdminProtectedRoute />}>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/clients" element={<ClientManagementPage />} />
        <Route path="/vendors" element={<VendorManagementPage/>}/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    
    </>
  )
}
