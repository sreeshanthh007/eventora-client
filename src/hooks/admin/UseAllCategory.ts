import { getAllCategory } from "@/services/admin/adminService"
import { useQuery } from "@tanstack/react-query"



interface UseGetAllCategoryParams {
    page:number,
    limit:number,
    search:string
}


export const useGetAllCategory = ({page,limit,search} : UseGetAllCategoryParams)=>{
    return useQuery({
        queryKey:["categories",page,limit,search],
        queryFn:()=>getAllCategory({page,limit,search}),
        staleTime:1000*60
    })
}