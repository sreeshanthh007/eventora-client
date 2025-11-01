import { getAdminNotification } from "@/services/admin/adminService"
import { useQuery } from "@tanstack/react-query"


export const useAdminNotification = ()=>{

    return useQuery({
        queryKey:["get-admin-notification"],
        queryFn:getAdminNotification,
        staleTime:8*6000
    })
}