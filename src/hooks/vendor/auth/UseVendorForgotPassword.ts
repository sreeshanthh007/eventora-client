

import { clientForgotUpdatePassword } from "@/services/auth/authServices";
import type { IAxiosResponse } from "@/types/Response";

import { useMutation } from "@tanstack/react-query";

export const UseVendorForgotPasswordMutation = ()=>{
    return useMutation<IAxiosResponse,Error,{email:string,password:string,role:string}>({
        mutationFn:clientForgotUpdatePassword
    });
}