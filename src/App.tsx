import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import ClientRoutes from "./routes/ClientRoutes";
import { VendorRoutes } from "./routes/VendorRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { useEffect } from "react";
import { listenToForegroundMessages } from "./services/firebase/notification";
import { getCurrentUserDetails } from "./utils/helpers/get-current-user";
import { useSelector } from "react-redux";
import { ConnectSocket } from "./lib/socket/ConnectSocket";

function App() {
  const user = useSelector(getCurrentUserDetails)?._id;

  useEffect(() => {
    listenToForegroundMessages();
  }, []);
  return (
    <>
      {user && <ConnectSocket user={user} />}

      <AppLayout />
    </>
  );
}

function AppLayout() {
  return (
    <Router>
      <Toaster theme="dark" position="top-right" />
      <Routes>
        <Route path="/*" element={<ClientRoutes />} />
        <Route path="/vendor/*" element={<VendorRoutes />} />

        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
