import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { RootState } from "@/store/store";


export const VendorProtectedRoute = () => {
  const vendor = useSelector((state: RootState) => state.vendor.vendor);

  return vendor ? <Outlet /> : <Navigate to="/vendor/login" />;
};

export const ClientProtectedRoute = () => {
  const client = useSelector((state: RootState) => state.client.client);
  return client ? <Outlet /> : <Navigate to="/login" />;
};

export const AdminProtectedRoute = () => {
  const admin = useSelector((state: RootState) => state.admin.admin)
  
  return admin ? <Outlet /> : <Navigate to="/admin/login"  replace/>
}


export const ProtectedScanRoute = () => {
  const location = useLocation();
  const eventData = location.state?.eventData;

  if (!eventData) {
    return <Navigate to="/vendor/events" replace />;
  }

  return <Outlet context={{ eventData }} />;
};