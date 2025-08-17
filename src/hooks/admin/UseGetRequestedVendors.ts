import { getRequestedVendors } from "@/services/admin/adminService"
import { useQuery } from "@tanstack/react-query"


interface GetAllVendorsParams{
    page:number,
    limit:number,
    search:string
}
export const UseGetAllRequestedVendors = ({page,limit,search}:GetAllVendorsParams)=>{
    return useQuery({
        queryKey:["requested-vendors",page,limit,search],
        queryFn:()=>getRequestedVendors({page,limit,search})
    })
}