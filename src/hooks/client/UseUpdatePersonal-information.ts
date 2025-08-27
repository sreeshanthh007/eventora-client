import { updatePersonalInformation, type ClientPersonalInformation } from "@/services/client/ClientServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"
import { useAppDispatch } from "@/store/store"
import { refreshClientSessionThunk } from "@/store/slices/clientSlice"



export const useUpdatePersonalInformation = ()=>{
    const {showToast} = useToast()
    const dispatch = useAppDispatch()
    return useMutation<IAxiosResponse,Error,Partial<Pick<ClientPersonalInformation,"name" | "phone">>>({
        mutationFn:updatePersonalInformation,
        onSuccess:(data)=>{
            showToast(data.message,"success");
            dispatch(refreshClientSessionThunk());
        },
        onError:(err)=>{
            showToast(err.response?.data?.message,"error")
        }
    })
}