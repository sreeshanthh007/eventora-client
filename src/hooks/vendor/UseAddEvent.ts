import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"
import type { IAxiosResponse } from "@/types/Response"
import { addEvent } from "@/services/vendor/VendorServices";
import {type  IEventFormData } from "@/components/forms/AddEventForm";
import { useNavigate } from "react-router-dom";

export const useAddEventMutation = ()=>{
    const {showToast} = useToast()
    const navigate = useNavigate()

    return useMutation<IAxiosResponse,Error,IEventFormData>({
        mutationFn:addEvent,
        onSuccess:(data)=>{
            showToast(data.message,"success");
            navigate("/vendor/events")
        },
        onError:(err:Error)=>{
            showToast(err.message,"error")
        }
    })
}