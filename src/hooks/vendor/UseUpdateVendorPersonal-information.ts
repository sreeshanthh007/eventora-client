import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import {type IUpdateVendorPersonalInformation, updateVendorPersonalInformation } from "@/services/vendor/VendorServices"
import { useToast } from "../ui/UseToaster"
import { useAppDispatch } from "@/store/store"
import { refreshVendorSessionThunk } from "@/store/slices/vendorSlice"

export const useUpdateVendorPersonalInformationMutation = ()=>{
    const {showToast} = useToast()
    const dispatch = useAppDispatch()
    return useMutation<IAxiosResponse,Error,Partial<Pick<IUpdateVendorPersonalInformation,"about" | "name" | "phone" | "place">>>({
        mutationFn:updateVendorPersonalInformation,
        onSuccess:(data)=>{
            showToast(data.message,"success");
            dispatch(refreshVendorSessionThunk())
        },

        onError:(err)=>{
            showToast(err.response?.data?.message,"error")
        }
    });
}