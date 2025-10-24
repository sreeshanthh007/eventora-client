    import { getservices } from "@/services/vendor/VendorServices"
    import { useQuery } from "@tanstack/react-query"


interface UseGetAllServicesParams {
    page:number,
    limit:number,
    search:string
}

    export const UseGeAllService = ({page,limit,search}:UseGetAllServicesParams)=>{
        return useQuery({
            queryKey:["services",page,limit,search],
            queryFn:()=>getservices({page,limit,search}),
        });
    }