import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"
import type { IAxiosResponse } from "@/types/Response"
import { rejectVendor } from "@/services/admin/adminService"

interface RejectVendorPayload {
  vendorId: string;        
  rejectReason: string;     
}


export const useRejectVendorMutation = () => {
  const { showToast } = useToast();

    return useMutation<IAxiosResponse, Error, RejectVendorPayload>({
    mutationFn: rejectVendor,
    onSuccess: (data) => {
      showToast(data.message,"success")
    },
    onError: (error: Error) => {
      showToast(error.response?.data?.message || error.message)
    },
  });
};