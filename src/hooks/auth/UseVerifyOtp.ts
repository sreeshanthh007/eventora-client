
import { verifyOtp } from "@/services/auth/authServices";

import { useMutation } from "@tanstack/react-query";

import type { IAxiosResponse } from "@/types/Response";

interface Data{
    otp:string,
    email:string
}
export const useVerifyOtpMutation = ()=>{
    return useMutation<IAxiosResponse,Error,Data>({
        mutationFn:verifyOtp
    })
}