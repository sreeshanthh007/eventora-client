import { useMutation } from "@tanstack/react-query";
import { sendForgotPasswordOtp } from "@/services/auth/authServices";
import { type IAxiosResponse } from "@/types/Response";


export const useSendForgotOTPMutation = ()=>{
    return useMutation<IAxiosResponse,Error,string>({
        mutationFn:sendForgotPasswordOtp
    })
}