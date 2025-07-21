    import { getAllClients } from "@/services/admin/adminService";
    import { useQuery } from "@tanstack/react-query";



    interface UseGetAllClientsParams {
    page: number
    limit: number
    search: string
    }

    export const useGetAllClients = ({ page, limit, search }: UseGetAllClientsParams) => {
    return useQuery({
        queryKey: ["clients", page, limit, search],
        queryFn: () => getAllClients({ page, limit, search }),
        staleTime: 1000 * 60, 
    })
    }