import { getAllChatsOfVendor } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"


export const GetChatsOfVendor = ()=>{
    return useQuery({
        queryKey:["get-chats-of-vendor"],
        queryFn:getAllChatsOfVendor
    })
}