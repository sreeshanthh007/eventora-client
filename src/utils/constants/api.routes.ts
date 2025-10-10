
import { BASE_URL } from "./route"



export const CLIENT_ROUTES = {
    REFRESH_TOKEN: `${BASE_URL.CLIENT}/refresh-token`,
    REFRESH_SESSION: `${BASE_URL.CLIENT}/refresh-session`,
    CLIENT_DETAILS:`${BASE_URL.CLIENT}/details`,
    UPDATE_PROFILE_IMAGE:`${BASE_URL.CLIENT}/update-profileImage`,
    UPDATE_PERSONAL_INFORMATION:`${BASE_URL.CLIENT}/update-profile`,
    CHANGE_PASSWORD:`${BASE_URL.CLIENT}/change-password`,
    GET_ALL_CATEGORIES:`${BASE_URL.CLIENT}/all-categories`,
    GET_ALL_EVENTS:`${BASE_URL.CLIENT}/all-events`,
    GET_ALL_EVENTS_FOR_CLIENT:`${BASE_URL.CLIENT}/eventPage`,
    GET_ALL_SERVICES_FOR_CLIENT : `${BASE_URL.CLIENT}/servicePage`,
    GET_EVENT_DETAILS:(eventId:string)=>`${BASE_URL.CLIENT}/event-details/${eventId}`,
    CREATE_BOOKING:`${BASE_URL.CLIENT}/create-booking`,
    GET_SERVICE_DETAILS:(serviceId:string)=>`${BASE_URL.CLIENT}/service-details/${serviceId}`,
    GET_BOOKED_EVENTS:`${BASE_URL.CLIENT}/booked-events`
}



export const  ADMIN_ROUTES = {
    REFRESH_TOKEN:`${BASE_URL.ADMIN}/refresh-token`,
    GET_ALL_CLIENTS:`${BASE_URL.ADMIN}/users`,
    GET_ALL_VENDORS:`${BASE_URL.ADMIN}/vendors`,
    GET_ALL_CATEGORIES:`${BASE_URL.ADMIN}/categories`,
    EDIT_CATEGORY:(categoryId:string)=>`${BASE_URL.ADMIN}/edit-category/${categoryId}`,
    GET_REQUESTED_VENDORS:`${BASE_URL.ADMIN}/requested-vendors`,
    UPDATE_USER_STATUS:`${BASE_URL.ADMIN}/user-status`,
    UPDATE_VENDOR_STATUS:`${BASE_URL.ADMIN}/vendor-status`,
    UPDATE_CATEGORY_STATUS:`${BASE_URL.ADMIN}/category-status`,
    ADD_CATEGORY:`${BASE_URL.ADMIN}/add-category`,
    APPROVE_VENDOR:(vendorId:string)=> `${BASE_URL.ADMIN}/${vendorId}/approve-vendors`,
    REJECT_VENDOR:(vendorId:string)=>`${BASE_URL.ADMIN}/${vendorId}/reject_vendors`,
}




export const VENDOR_ROUTES = {
    REFRESH_TOKEN:`${BASE_URL.VENDOR}/refresh-token`,
    REFRESH_SESSION:`${BASE_URL.VENDOR}/refresh-session`,
    VENDOR_DETAILS:(vendorId:string)=>`${BASE_URL.CLIENT}/details/${vendorId}`,
    RESEND_VERIFICATION:(vendorId:string)=>`${BASE_URL.VENDOR}/${vendorId}/resend-verification`,
    UPDATE_PROFILE_IMAGE:`${BASE_URL.VENDOR}/update-profileImage`,
    UPDATE_VENDOR_PERSONAL_INFORMATION:`${BASE_URL.VENDOR}/update-profile`,
    CHANGE_PASSWORD:`${BASE_URL.VENDOR}/change-password`,
    ADD_EVENT:`${BASE_URL.VENDOR}/add-event`,
    GET_EVENTS_FOR_VENDOR:`${BASE_URL.VENDOR}/get-all-events`,
    EDIT_EVENTS:(eventId:string)=>`${BASE_URL.VENDOR}/edit-events/${eventId}`,
    GET_EVENTS_BY_ID:(eventId:string)=>`${BASE_URL.VENDOR}/get-events-by-id/${eventId}`,
    ADD_SERVICE:`${BASE_URL.VENDOR}/add-service`,
    GET_CATEGORY_FOR_SERVICE:`${BASE_URL.VENDOR}/get-category-service`,
    GET_SERVICE_FOR_VENDOR:`${BASE_URL.VENDOR}/get-services`,
    GET_SERVICES_BY_ID:(serviceId:string)=>`${BASE_URL.VENDOR}/service-by-id/${serviceId}`,
    EDIT_SERVICE:(serviceId:string)=>`${BASE_URL.VENDOR}/edit-service/${serviceId}`,
    TOGGLE_SERVICE:(serviceId:string)=>`${BASE_URL.VENDOR}/toggle-service/${serviceId}`,
    TOGGLE_EVENT:(eventId:string)=>`${BASE_URL.VENDOR}/toggle-status/${eventId}`,
    UPDATE_EVENT_STATUS:(eventId:string)=>`${BASE_URL.VENDOR}/update-event-status/${eventId}`,
     ADD_WORK_SAMPLE:`${BASE_URL.VENDOR}/add-work-sample`,
     GET_WORKSAMPLE_BY_VENDOR:`${BASE_URL.VENDOR}/get-work-sample-details`
}