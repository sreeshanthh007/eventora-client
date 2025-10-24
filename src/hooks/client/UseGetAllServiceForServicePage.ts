import { getAllServiceForServicePage } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"



interface IGetAllServiceParams {

    page:number
    limit:number
    search:string
    sort:string
    categoryId:string
}
export const UseGetAllServiceForServicePage = ({page,limit,search,sort,categoryId} : IGetAllServiceParams) =>{

    return useQuery({
        queryKey:["service-for-servicePage",page,limit,search,sort,categoryId],
        queryFn:()=>getAllServiceForServicePage({page,limit,search,sort,categoryId}),
    });
}