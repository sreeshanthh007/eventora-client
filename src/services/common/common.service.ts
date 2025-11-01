import { axiosInstance } from "@/api/interceptor"
import { COMMON_ROUTES } from "@/utils/constants/api.routes"


export const markNotificationAsRead = async(notificationId:string)=>{

    const response = await axiosInstance.patch(COMMON_ROUTES.MARK_NOTIFICATON_AS_READ(notificationId));
    
    return response.data
}