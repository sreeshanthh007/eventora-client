import { getAllVendors } from "@/services/admin/adminService"
import { useQuery } from "@tanstack/react-query"


  interface UseGetAllCVendorssParams {
    page: number
    limit: number
    search: string
    }


    interface VendorResponse {
  success: boolean;
  message: string;
  vendors: [];
  totalPages: number;
}

    export const useGetAllVendors = ({ page, limit, search }: UseGetAllCVendorssParams) => {
  return useQuery<VendorResponse, Error>({
    queryKey: ["vendors", page, limit, search],
    queryFn: () => getAllVendors({ page, limit, search }),
    
    
  }); 
};