import { adminAxiosInstance } from "@/api/admin.axios";



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
    userId: any;
    status: string;
}) => {
  const response = await adminAxiosInstance.patch(
    "/vendor-status",
    {
      vendorId: data.userId,
      status: data.status,
    }
   
  );
  return response.data;
};