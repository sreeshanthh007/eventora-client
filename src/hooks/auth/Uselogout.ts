import { useMutation, type MutationFunction } from "@tanstack/react-query"

export const UseLogout = <T>(mutationfunc:MutationFunction<T>)=>{
    return useMutation<T,unknown,T>({
        mutationFn:mutationfunc
    })
}