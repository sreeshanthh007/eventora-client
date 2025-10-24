import { getCategoryForFilter } from "@/services/client/ClientServices";

import { useQuery } from "@tanstack/react-query"



export const useGetCategoriesForFilter = ()=>{

    return useQuery({
        queryKey:["get-category-for-service"],
        queryFn:getCategoryForFilter,
        staleTime:1*60*1000
    });
}