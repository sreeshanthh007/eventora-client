import type { IAuthResponse } from "@/services/auth/authServices";
import { googleAuth } from "@/services/auth/googleService";
import { useMutation} from "@tanstack/react-query";



export const UseGoogleAuth = ()=>{
    return useMutation<IAuthResponse,Error,{credential:string;client_id:string;role:string}>({
        mutationFn:googleAuth
    });
}