import { scanAndVerifyAttendies } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"



export const useScanAndVerifyAttendiesMutation = ()=>{

    return useMutation<IAxiosResponse,Error,{vendorId:string,eventId:string}>({
        mutationFn:scanAndVerifyAttendies,
    })
}