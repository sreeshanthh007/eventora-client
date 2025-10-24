import { saveFcmToken } from "@/services/auth/authServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"


export const UseSaveFcmTokenMutation = ()=>{
    return useMutation<IAxiosResponse,Error,{userId:string,fcmToken:string,role:string}>({
        mutationFn:saveFcmToken
    })
} 