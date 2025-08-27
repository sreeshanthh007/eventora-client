import { getCategoryForService } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"



export const useGetCategoriesForService  = ()=>{
    return useQuery({
        queryKey:["service-category"],
        queryFn:getCategoryForService
    })
}