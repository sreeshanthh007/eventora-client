import type { IAuthResponse , ILoginData } from "@/services/auth/authServices";
import { logIn } from "@/services/auth/authServices";   

import { useMutation } from "@tanstack/react-query";


export const useLoginMutation = ()=>{
    return useMutation<IAuthResponse,Error,ILoginData>({
        mutationFn:logIn
    })
}