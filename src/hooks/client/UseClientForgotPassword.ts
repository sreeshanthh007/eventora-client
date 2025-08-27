import { useMutation } from "@tanstack/react-query";
import { clientForgotUpdatePassword } from "@/services/auth/authServices";
import { type  IAxiosResponse } from "@/types/Response";

export const useClientForgotPasswordMutation = () => {
  return useMutation<IAxiosResponse, Error, { email: string; password: string , role:string }>({
    mutationFn: clientForgotUpdatePassword,
  })
}