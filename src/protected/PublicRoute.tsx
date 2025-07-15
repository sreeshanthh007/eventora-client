import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "@/store/store";

export const VendorPublicRoute = () => {
  const vendor = useSelector((state: RootState) => state.vendor.vendor);

  return vendor ? <Navigate to="/vendor" /> : <Outlet />;
};

export const ClientPublicRoute = () => {
  const client = useSelector((state: RootState) => state.client.client);

  return client ? <Navigate to="/" /> : <Outlet />;
};

export const AdminPublicRoute = () => {
  const admin = useSelector((state: RootState) => state.admin.admin)
  return admin ? <Navigate to="/admin/dashboard" /> : <Outlet />
}