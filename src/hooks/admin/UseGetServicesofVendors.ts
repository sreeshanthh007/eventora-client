import { getServicesByVendorForAdmin } from "@/services/admin/adminService";
import { useQuery } from "@tanstack/react-query";


interface UseGetServicesofVendorsProps {
  page: number;
  limit: number;
  search?: string;
    filterBy?: string;
}
export const useGetServicesofVendors = ({ page, limit, search,filterBy}: UseGetServicesofVendorsProps) => {

    return useQuery({
        queryKey: ["services-by-vendors", page, limit, search,filterBy],
        queryFn:()=>getServicesByVendorForAdmin({page,limit,search,filterBy}),
        staleTime:1000*60
    });
}