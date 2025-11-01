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


export const getAdminWalletDetails = async()=>{
  const response = await axiosInstance.get(ADMIN_ROUTES.GET_ADMIN_WALLET_DETAILS);
  return response.data
}


export const getAdminNotification = async()=>{
  const response = await axiosInstance.get(
    ADMIN_ROUTES.GET_ADMIN_NOTIFICATION
  );

  return response.data
}
