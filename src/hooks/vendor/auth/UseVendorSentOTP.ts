
import { VendorSentOTPForforgotPassword } from "@/services/vendor/VendorServices";
import { useMutation } from "@tanstack/react-query";

import { type IAxiosResponse } from "@/types/Response";

export const UseVendorSentOTP = ()=>{
    return useMutation<IAxiosResponse,Error,string>({
        mutationFn:VendorSentOTPForforgotPassword
    })
}