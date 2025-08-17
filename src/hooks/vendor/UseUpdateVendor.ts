// import type { VendorUpdateDTO } from "@/components/pages/vendor/EditProfilePage";
import { updateVendorProfile, type IVendorProfileUpdateData } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useUpdateVendor = () => {
  const queryClient = useQueryClient();

  return useMutation<IAxiosResponse, Error, IVendorProfileUpdateData>({
    mutationFn: updateVendorProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorProfile"] });
    },
  });
};