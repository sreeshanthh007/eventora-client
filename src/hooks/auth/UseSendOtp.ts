
import type { IAxiosResponse } from "@/types/Response";
import { sendOtp } from "@/services/auth/authServices";
import { useMutation } from "@tanstack/react-query";

export const useSendOtpMutation = ()=>{
    return useMutation<IAxiosResponse , Error , string>({
        mutationFn:sendOtp
    })
}