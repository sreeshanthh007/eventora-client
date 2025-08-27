import { editCategory, type IEditCategoryData } from "@/services/admin/adminService"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster";



 export const useEditCategoryMutation = () => {
    const {showToast} = useToast()
  return useMutation<IAxiosResponse, Error, { categoryId: string; data: Partial<Pick<IEditCategoryData, "image" | "title">> }>({
    mutationFn: editCategory,
    onSuccess:(data)=>{
        showToast(data.message,"success")
    },
    onError:(err)=>{
        showToast(err.response?.data?.message,"error")
    }
  });
};
