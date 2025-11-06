
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
    CREATE_SERVICE_BOOKING:`${BASE_URL.CLIENT}/create-service-booking`,
    GET_SERVICE_DETAILS:(serviceId:string)=>`${BASE_URL.CLIENT}/service-details/${serviceId}`,
    GET_CATEGORIES_FOR_FILTER:`${BASE_URL.CLIENT}/get-category-for-filter`,
    GET_BOOKED_EVENTS:`${BASE_URL.CLIENT}/booked-events`,
    GET_CLIENT_WALLET_DETAILS:`${BASE_URL.CLIENT}/wallet-details`,
    GET_CLIENT_BOOKING_DETAILS:`${BASE_URL.CLIENT}/booked-services`,
    CANCEL_TICKET:(ticketId:string,eventId:string) => `${BASE_URL.CLIENT}/cancel-ticket/${ticketId}/${eventId}`,
    CANCEL_SERVICE:(serviceId:string,vendorId:string,bookingId:string) => `${BASE_URL.CLIENT}/cancel-service/${serviceId}/${vendorId}/${bookingId}`,
    ADD_RATING:`${BASE_URL.CLIENT}/add-rating`,
    EDIT_RATING:(ratingId:string)=>`${BASE_URL.CLIENT}/edit-rating/${ratingId}`,
    GET_ALL_RATINGS_WITH_AVERAGE:(serviceId:string)=>`${BASE_URL.CLIENT}/ratings/${serviceId}`,
    REMOVE_REVIEW:(reviewId:string)=>`${BASE_URL.CLIENT}/delete-rating/${reviewId}`,
    GET_VENDOR_WORKFOLIO:(vendorId:string)=>`${BASE_URL.CLIENT}/workfolio/${vendorId}`,
    GET_CLIENT_NOTIFICATION:`${BASE_URL.CLIENT}/client-notification`,
    GET_CHATS_OF_CLIENT:`${BASE_URL.CLIENT}/client/chats`,
    GET_CLIENT_CHAT_BY_ID:`${BASE_URL.CLIENT}/client/chat`
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
    GET_ADMIN_WALLET_DETAILS:`${BASE_URL.ADMIN}/wallet-details`,
    GET_ADMIN_NOTIFICATION:`${BASE_URL.ADMIN}/admin-notification`,
    GET_ADMIN_ANALYTICS_DASHBOARD:`${BASE_URL.ADMIN}/admin-analytics`,
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
    GET_WORKSAMPLE_BY_VENDOR:`${BASE_URL.VENDOR}/get-work-sample-details`,
    GET_VENDOR_WALLET_DETAILS:`${BASE_URL.VENDOR}/wallet-details`,
    GET_BOOKINGS:`${BASE_URL.VENDOR}/get-booked-services`,
    GET_VENDOR_NOTIFICATION:`${BASE_URL.VENDOR}/vendor-notification`,
    EDIT_WORK_SAMPLE:(worksampleId:string)=>`${BASE_URL.VENDOR}/edit-work-sample/${worksampleId}`,
    SCAN_EVENT_QR:`${BASE_URL.VENDOR}/scan-event`,
    SCAN_AND_VERIFY_TICKET:`${BASE_URL.VENDOR}/scan-ticket`,
    GET_TICKET_DETAILS:`${BASE_URL.VENDOR}/get-ticket-details`,
    START_BOOKED_SERVICE:(bookingId:string)=>`${BASE_URL.VENDOR}/start-service/${bookingId}`,
    STOP_BOOKED_SERVICE:(bookingId:string) =>`${BASE_URL.VENDOR}/stop-service/${bookingId}`,
    GET_CHATS_OF_VENDOR:`${BASE_URL.VENDOR}/vendor/chats`,
    GET_VENDOR_CHAT_ID : `${BASE_URL.VENDOR}/vendor/chat`,
    GET_VENDOR_ANALYTICS_DASHBOARD:`${BASE_URL.VENDOR}/vendor-analytics`
}


export const COMMON_ROUTES ={
    MARK_NOTIFICATON_AS_READ:(notificationId:string)=>`${BASE_URL.COMMON}/read-notification/:${notificationId}`
}