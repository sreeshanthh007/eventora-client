import { getAllServiceForServicePage } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"



interface IGetAllServiceParams {

    page:number
    limit:number
    search:string
    sort:string
}
export const UseGetAllServiceForServicePage = ({page,limit,search,sort} : IGetAllServiceParams) =>{

    return useQuery({
        queryKey:["service-for-servicePage",page,limit,search,sort],
        queryFn:()=>getAllServiceForServicePage({page,limit,search,sort})
    });
}