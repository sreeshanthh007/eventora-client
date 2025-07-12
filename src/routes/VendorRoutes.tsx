import {BrowserRouter as Router, Routes, Route} from "react-router-dom"



import { VendorRegisterPage } from "@/components/pages/vendor/VendorRegisterPage"
import { VendorLoginPage } from "@/components/pages/vendor/VendorLoginPage"

export const VendorRoutes = () => {
  return (
    <Routes>
        <Route path="register" element={<VendorRegisterPage/>}/>
        <Route path="login" element={<VendorLoginPage/>}/>
    </Routes>
  )
}
