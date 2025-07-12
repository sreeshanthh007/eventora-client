
import { ClientLogin } from "@/components/pages/client/ClientLogin"
import { ClientRegister } from "@/components/pages/client/ClientRegister"
import { NoAuthRoute } from "@/protected/PublicRoute"
import { AuthRoute } from "@/protected/ProtectedRoute"
import { Routes , Route } from "react-router-dom"

import { ClientLandingPage } from "@/components/pages/client/ClientLandingPage"
import { NotFound } from "@/Custom404Page";



 const ClientRoutes = () => {
   
  return  (
    <>
    <Routes>
        <Route path="/login" element={<NoAuthRoute element={<ClientLogin/>}/>}/>

        <Route path="/register" element={<NoAuthRoute element={<ClientRegister/>}/>}/>
        <Route
        path="/"     
        element={
            <AuthRoute
            allowedRoutes={["client"]}
            element={<ClientLandingPage/>}
            />
        }
        />
        <Route path="*" element={<NotFound/>}/>
    </Routes>
  
  
  </>

  )
}

export default ClientRoutes