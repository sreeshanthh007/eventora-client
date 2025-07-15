import { getAllVendors } from "@/services/admin/adminService"
import { useQuery } from "@tanstack/react-query"


  interface UseGetAllCVendorssParams {
    page: number
    limit: number
    search: string
    }

    export const useGetAllVendors = ({ page, limit, search }: UseGetAllCVendorssParams) => {
    return useQuery({
        queryKey: ["clients", page, limit, search],
        queryFn: () => getAllVendors({ page, limit, search }),
        keepPreviousData: true, 
        staleTime: 1000 * 60, 
    })
    }