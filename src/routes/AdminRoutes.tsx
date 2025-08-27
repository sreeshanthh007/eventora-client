import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "@/Custom404Page";
import Spinner from "@/components/common/spinners/AdminSpinner";

import AdminLoginPage from "@/components/pages/admin/AdminPage";
import { AdminProtectedRoute } from "@/protected/ProtectedRoute";
import { AdminPublicRoute } from "@/protected/PublicRoute";
import CategoryManagementPage from "@/components/pages/admin/managementPages/CategoryManagementPage";
import { AddCategoryPage } from "@/components/pages/admin/AddCategoryPage";
import RequestedVendorsPage from "@/components/pages/admin/managementPages/VendorRequestManagementPage";


const AdminDashboard = lazy(() => import("@/components/admin/Admindashboard"));
const ClientManagementPage = lazy(() => import("@/components/pages/admin/managementPages/ClientManagement"));
const VendorManagementPage = lazy(() => import("@/components/pages/admin/managementPages/VendorManagement"));

export const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<AdminPublicRoute />}>
          <Route path="/login" element={<AdminLoginPage />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Spinner />}>
                <AdminDashboard />
              </Suspense>
            }
          />

          <Route
            path="/clients"
            element={
              <Suspense fallback={<Spinner />}>
                <ClientManagementPage />
              </Suspense>
            }
          />
          <Route
            path="/vendors"
            element={
              <Suspense fallback={<Spinner />}>
                <VendorManagementPage />
              </Suspense>
            }
          />

          <Route
          path="/addCategory"
          element={
            <Suspense fallback={<Spinner/>}>
              <AddCategoryPage/>
            </Suspense>
          }
          />

           <Route path="/category" element={
      <Suspense fallback={<Spinner/>}>
        <CategoryManagementPage/>
      </Suspense>
    } /> 

    <Route path="/requestedVendors" element={
      <Suspense fallback={<Spinner/>}>
        <RequestedVendorsPage/>
      </Suspense>
    }


    />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
