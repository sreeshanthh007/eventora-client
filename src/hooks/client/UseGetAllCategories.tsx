    import { getAllCategories } from "@/services/client/ClientServices"
    import { useQuery } from "@tanstack/react-query"



    export const UseGetAllCategories = ()=>{
        return useQuery({
            queryKey:["categories"],
            queryFn:getAllCategories,
            staleTime:5 * 60 * 1000,
        });
    }