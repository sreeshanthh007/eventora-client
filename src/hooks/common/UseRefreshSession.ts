


import { refreshVendorSessionThunk } from "@/store/slices/vendorSlice"
import { useEffect } from "react"
import { useAppDispatch } from "@"

type userRole = "admin" | "vendor" | "client"

const useRefreshSession = (role:userRole | null) =>{

    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(role=="vendor") dispatch(refreshVendorSessionThunk())

    },[dispatch,role])
}

export default useRefreshSession