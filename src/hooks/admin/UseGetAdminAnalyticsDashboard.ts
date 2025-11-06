import { getAdminAnalyticsDashboard } from "@/services/admin/adminService"
import { useQuery } from "@tanstack/react-query"


interface GetAdminAnalyticsDashboard{
    period:string
    startDate?:string
    endDate?:string
}

export const UsegetAdminAnalyticsDashboard = ({period,startDate,endDate}:GetAdminAnalyticsDashboard)=>{

    return useQuery({
        queryKey:["get-admin-analytics-dashboard",period,startDate,endDate],
        queryFn:() => getAdminAnalyticsDashboard({period,startDate,endDate}),
        
    })
}