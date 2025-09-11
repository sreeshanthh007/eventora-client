import { getAllEventForEventPage } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"


interface GetAllEventsForDetailsPageParams{
    page:number,
    limit:number,
    search:string,
    location:string,
    sort:string,
    lat?:number,
    lng?:number
}

export const useGetAllEventsForEventsPage = ({page,limit,search,location,sort,lat,lng}:GetAllEventsForDetailsPageParams)=>{
    return useQuery({
        queryKey:["events-for-eventPage",page,limit,search,location,sort,lat,lng],
        queryFn : ()=> getAllEventForEventPage({page,limit,search,location,sort,lat,lng}),
    })
}