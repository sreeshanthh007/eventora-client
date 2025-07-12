import { Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { type  RootState } from "@/store/store";
import type { JSX } from "react";

interface allowedProps {
    element : JSX.Element
    allowedRoutes : string[]
}
export const AuthRoute = ({element,allowedRoutes}:allowedProps)=>{
    
    const userRole = useSelector((state:RootState)=>state.client.client?.role)

    console.log(userRole)

    if(!userRole){
        return <Navigate to="/login" replace/>
    }

   return allowedRoutes.includes("client")  ? (
         element
    ) : (
        <Navigate to="/unauthorized"/>
    )
}