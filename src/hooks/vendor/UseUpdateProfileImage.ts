import { updateProfileImage } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"
import { useAppDispatch } from "@/store/store"
import { refreshVendorSessionThunk } from "@/store/slices/vendorSlice"



export const useUpdateVendorProfileImageMutation = ()=>{
        const {showToast} = useToast()
        const dispatch = useAppDispatch()
    return useMutation<IAxiosResponse,Error,string>({
        mutationFn:updateProfileImage,
        onSuccess:(data)=>{
            showToast(data.message,"success");
            dispatch(refreshVendorSessionThunk())
        },
        onError:(err:any)=>{
            showToast(err.response?.data?.message,'error')
        }
    })
}