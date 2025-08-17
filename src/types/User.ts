
import type { UserRole } from "./UserRoles"


export interface User{
    name:string,
    email:string,
    phone:string,
    password:string,
    role?:UserRole,
    idProof:string
}


export interface IAdmin{
    email:string;
    password:string;
    role:"admin";
}


export interface IClient extends User{
    role:"client"
}


export interface IVendor {
  name:string,
  email: string;
  phone: string;
  password?: string;
  role?: "vendor";
  profileImage?:string
  idProof?:File | null | string,
  vendorStatus:"approved" | "pending" | "rejected",
  status?:string
}

export interface ICategory {
    categoryId:string
    title:string,
    image:File
}




export type UserDTO = IAdmin | IClient | IVendor
