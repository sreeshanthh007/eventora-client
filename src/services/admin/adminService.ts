// import { adminAxiosInstance } from "@/api/admin.axios"
import { axiosInstance } from "@/api/interceptor";

export const getAllClients = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const response = await axiosInstance.get("/api_v1/_ad/users", {
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
  const response = await axiosInstance.get("/api_v1/_ad/vendors", {
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
  const response = await axiosInstance.get("/api_v1/_ad/categories",{
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
    `/api_v1/_ad/edit-category/${categoryId}`,
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
  const response = await axiosInstance.get("/api_v1/_ad/requested-vendors",{
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
    "/api_v1/_ad/user-status",
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
    "/api_v1/_ad/vendor-status",
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
    "/api_v1/_ad/category-status",
    {categoryId:data.categoryId,status:data.status}
  )

  return response.data
}



export const addCategory = async(data :{
  title:string,
  image:string
}) =>{
  const resonse = await axiosInstance.post(
    "/api_v1/_ad/add-category",
    {
      title:data.title,
      image:data.image
    }
  )
  return resonse.data
}


// export const editCategory = async(data:{
//   categoryId:string,

// })



export const approveVendor = async(vendorId: string) => {
  const response = await axiosInstance.patch(`/api_v1/_ad/${vendorId}/approve-vendors`);
  return response.data;
};

export const rejectVendor = async ({ vendorId, rejectReason }:{vendorId:string,rejectReason:string}) => {
  const response = await axiosInstance.patch(`/api_v1/_ad/${vendorId}/reject-vendors`, { rejectReason });
  return response.data;
};

