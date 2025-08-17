import { adminAxiosInstance } from "@/api/admin.axios";
import { keepPreviousData } from "@tanstack/react-query";



export const getAllClients = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const response = await adminAxiosInstance.get("/users", {
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
  const response = await adminAxiosInstance.get("/vendors", {
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
  const response = await adminAxiosInstance.get("/categories",{
    params:{
      page,
      limit,
      search
    },
  });
  return response.data
}


export const getRequestedVendors = async({
  page=1,
  limit=10,
  search="",
  
}:{
  page:number,
  limit:number,
  search:string
})=>{
  const response = await adminAxiosInstance.get("/requested-vendors",{
    params:{
      page,
      limit,
      search
    }
  });
  return response.data
}


export const updateUserStatus = async (data: {
    userId: any;
    status: string;
}) => {
  const response = await adminAxiosInstance.patch(
    "/user-status",
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
  const response = await adminAxiosInstance.patch(
    "/vendor-status",
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
  const response = await adminAxiosInstance.patch(
    "/category-status",
    {categoryId:data.categoryId,status:data.status}
  )

  return response.data
}



export const addCategory = async(data :{
  title:string,
  image:string
}) =>{
  const resonse = await adminAxiosInstance.post(
    "/add-category",
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



export const approveVendor = async(data:{
  vendorId:string
})=>{
  const response= await adminAxiosInstance.patch("/approve-vendors",data)
  return response.data
}