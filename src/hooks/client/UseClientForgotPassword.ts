import { useMutation } from "@tanstack/react-query";
import { clientForgotUpdatePassword } from "@/services/client/ClientServices";
import { type  IAxiosResponse } from "@/types/Response";

export const useClientForgotPasswordMutation = () => {
  return useMutation<IAxiosResponse, Error, { email: string; password: string }>({
    mutationFn: clientForgotUpdatePassword,
  })
}