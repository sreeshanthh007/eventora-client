
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {type  RootState } from "@/store/store";
import type { JSX } from "react";


interface NoAuthProps {
    element:JSX.Element
}

export const NoAuthRoute = ({element}: NoAuthProps)=>{
    const user = useSelector((state:RootState)=>state.client.client)
    
    if(user){
        return <Navigate to='/' replace/>
    }
    

    return element  
}


