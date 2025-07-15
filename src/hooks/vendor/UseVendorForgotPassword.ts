
import { VendorForgotPassword } from "@/services/vendor/VendorServices";
import type { IAxiosResponse } from "@/types/Response";

import { useMutation } from "@tanstack/react-query";

export const UseVendorForgotPasswordMutation = ()=>{
    return useMutation<IAxiosResponse,Error,{email:string,password:string}>({
        mutationFn:VendorForgotPassword
    });
}