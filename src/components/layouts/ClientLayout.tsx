import { Outlet } from "react-router-dom";
import { ClientHeader } from "../client/ClientHeader";
import { useState, useEffect } from "react";
import { Spinner } from "../pages/ui/spinner";
import { UseClientProfileQuery } from "@/hooks/client/UseClientProfile";
import type { Client } from "@/services/client/ClientServices";
import { Footer } from "../mainComponents/Footer";

export const ClientLayout = () => {

    const {data,isLoading} = UseClientProfileQuery()
    const [clientData,setClientData] = useState<Client | null>(null)

    useEffect(()=>{
        if(data){
            setClientData(data.client)
        }
    },[data])

    if(isLoading){
        return <Spinner />
    }

    if(!clientData){
        return null
    }


  return (
    <>
    
    <ClientHeader/>
    <Outlet/>
    <Footer/>

    </>
  )
}
