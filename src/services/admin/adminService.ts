// import { adminAxiosInstance } from "@/api/admin.axios"
import { axiosInstance } from "@/api/interceptor";
import { ADMIN_ROUTES } from "@/utils/constants/api.routes";

export const getAllClients = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const response = await axiosInstance.get(ADMIN_ROUTES.GET_ALL_CLIENTS, {
    params: {
      page,
      limit,
      search,
    },
  });
  return response.data;
};

export const getAllVendors = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const response = await axiosInstance.get(ADMIN_ROUTES.GET_ALL_VENDORS, {
    params: {
      page,
      limit,
      search,
    },
  });
  return response.data; 
};


export const getAllCategory = async ({
  page=1,
  limit=10,
  search='',
}:{
  page:number,
  limit:number,
  search:string
}) =>{
  const response = await axiosInstance.get(ADMIN_ROUTES.GET_ALL_CATEGORIES,{
    params:{
      page,
      limit,
      search
    },
  });
  return response.data
}


export interface IEditCategoryData{
  title:string
  image:string
}

export const editCategory = async (
  variables: { 
    categoryId: string; 
    data: Partial<Pick<IEditCategoryData, "image" | "title">>; 
  }
) => {
  const { categoryId, data } = variables;
  const response = await axiosInstance.patch(
    ADMIN_ROUTES.EDIT_CATEGORY(categoryId),
    data
  );
  return response.data;
};

export const getRequestedVendors = async({
  page=1,
  limit=10,
  search="",
  
}:{
  page:number,
  limit:number,
  search:string
})=>{
  const response = await axiosInstance.get(ADMIN_ROUTES.GET_REQUESTED_VENDORS,{
    params:{
      page,
      limit,
      search
    }
  });
  return response.data
}


export const updateUserStatus = async (data: {
    userId: string;
    status: string;
}) => {
  const response = await axiosInstance.patch(
    ADMIN_ROUTES.UPDATE_USER_STATUS,
    {
      userId: data.userId,
      status: data.status,
    }
   
  );
  return response.data;
};


export const updateVendorStatus = async (data: {
    vendorId: string;
    status: string;
}) => {
  const response = await axiosInstance.patch(
      ADMIN_ROUTES.UPDATE_VENDOR_STATUS,
    {
      vendorId: data.vendorId,
      status: data.status,
    }
   
  );
  return response.data;
};


export const updateCategoryStatus = async(data:{
  categoryId:string,
  status:string
}) =>{
  const response = await axiosInstance.patch(
    ADMIN_ROUTES.UPDATE_CATEGORY_STATUS,
    {categoryId:data.categoryId,status:data.status}
  )

  return response.data
}



export const addCategory = async(data :{
  title:string,
  image:string
}) =>{
  const resonse = await axiosInstance.post(
    ADMIN_ROUTES.ADD_CATEGORY,
    {
      title:data.title,
      image:data.image
    }
  )
  return resonse.data
}






export const approveVendor = async(vendorId: string) => {
  const response = await axiosInstance.patch(ADMIN_ROUTES.APPROVE_VENDOR(vendorId));
  return response.data;
};

export const rejectVendor = async ({ vendorId, rejectReason }:{vendorId:string,rejectReason:string}) => {
  const response = await axiosInstance.patch(ADMIN_ROUTES.REJECT_VENDOR(vendorId), { rejectReason });
  return response.data;
};


export const getAdminWalletDetails = async({
  type="all",
  page=1,
  limit=6
}:{
  type:string,
  page:number,
  limit:number
})=>{
  const response = await axiosInstance.get(
    ADMIN_ROUTES.GET_ADMIN_WALLET_DETAILS,
    {
      params:{
        type,
        page,
        limit
      }
    }
  );
  return response.data
}

export const getAdminAnalyticsDashboard = async({
  period="month",
  startDate,
  endDate
}:{
  period:string,
  startDate?:string,
  endDate?:string
})=>{

  const response = await axiosInstance.get(
    ADMIN_ROUTES.GET_ADMIN_ANALYTICS_DASHBOARD,
    {
      params:{
        period,
        startDate,
        endDate
      }
    }
  );

  return response.data
}


export const getAdminNotification = async()=>{
  const response = await axiosInstance.get(
    ADMIN_ROUTES.GET_ADMIN_NOTIFICATION
  );

  return response.data
}


export const getVendorEvents = async({
  page=1,
  limit=6,
  search,
  filterBy
}:{
  page:number,
  limit:number,
  search:string,
  filterBy:string
})=>{
  const response = await axiosInstance.get(
    ADMIN_ROUTES.GET_VENDORS_EVENTS,
    {
      params:{
        page,
        limit,
        search,
        filterBy
      }
    }
  );
  return response.data
}


export const getBookedServicesofVendors = async({
  page=1,
  limit=6,
  search,
  filterType
}:{
  page:number,
  limit:number,
  search:string,
  filterType:string
})=>{
  const response = await axiosInstance.get(
    ADMIN_ROUTES.GET_BOOKED_SERVICES_VENDORS,
    {
      params:{
        page,
        limit,
        search,
        filterType
      }
    }
  );
  return response.data
}