import { signUp } from "@/services/auth/authServices";
import type { UserDTO } from "@/types/User";
import type { IAxiosResponse } from "@/types/Response";
import {useMutation} from "@tanstack/react-query"

export const useRegisterMutation = ()=>{
    return useMutation<IAxiosResponse,Error,UserDTO>({
        mutationFn:signUp
    })
}