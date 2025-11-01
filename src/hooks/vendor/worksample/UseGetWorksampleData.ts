import { getWorkSampleDetailsByVendors } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"



export const UseGetWorksampleData = () => {

    return useQuery({
        queryKey:["worksampledata"],
        queryFn:getWorkSampleDetailsByVendors,
    })
}