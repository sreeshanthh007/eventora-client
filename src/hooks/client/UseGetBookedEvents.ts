import { getBookedEvents } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"


export const useGetBookedEventsQuery = ({page, limit, search}: {page: number, limit: number, search: string}) => {
    return useQuery({
        queryKey: ["booked-events", page, limit, search],
        queryFn: () => getBookedEvents({ page, limit, search }),
        staleTime:1*60*6000

    })
}