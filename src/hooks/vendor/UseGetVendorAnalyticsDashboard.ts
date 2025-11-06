import { getVendorAnalyticsDashboard } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"



interface GetVendorAnalyticsDashboard{
    period:string
    startDate?:string
    endDate?:string
}
export const useGetVenodorAnalyticsDashboard = ({period,startDate,endDate}:GetVendorAnalyticsDashboard)=>{

    return useQuery({
        queryKey:["get-vendor-analytics-dashboard",period,startDate,endDate],
        queryFn:()=>getVendorAnalyticsDashboard({period,startDate,endDate}),
        staleTime: 60 * 1000,
    })
}