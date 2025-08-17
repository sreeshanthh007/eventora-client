import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "@/store/store";

export const VendorPublicRoute = () => {
  const vendor = useSelector((state: RootState) => state.vendor.vendor);
  const client = useSelector((state:RootState)=>state.client.client)

  if(client) {
    return <Navigate to='/' replace/>
  }

  return vendor ? <Navigate to="/vendor" /> : <Outlet />;
};

export const ClientPublicRoute = () => {
  const client = useSelector((state: RootState) => state.client.client);
  const vendor = useSelector((state:RootState)=>state.vendor.vendor)

if(vendor){
  return <Navigate to='/' replace/>
}
  return client ? <Navigate to="/" /> : <Outlet />;
};

export const AdminPublicRoute = () => {
  const admin = useSelector((state: RootState) => state.admin.admin);
  const vendor = useSelector((state: RootState) => state.vendor.vendor);
  const client = useSelector((state: RootState) => state.client.client);

  
  if (vendor || client) {
    return <Navigate to="/" replace />;
  }

  return admin ? <Navigate to="/admin/dashboard" replace /> : <Outlet />;
}