
import type { UserRole } from "./UserRoles"


export interface User{
    name:string,
    email:string,
    phone:string,
    password:string,
    role?:UserRole,
    status?:string,
    idProof?:string,
    profileImage?:string
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
_id?:string
 vendorId?:string
  name:string,
  email: string;
  phone: string;
  password?: string;
  role?: "vendor";
  profilePicture?:string
  idProof?:File | null | string,
  rejectionReason?:string
  vendorStatus:"approved" | "pending" | "rejected",
  status?:string,
  place?:string,
  about?:string
}

export interface ICategory {
    categoryId:string
    title:string,
    image:File
}

export interface IEvent{
    title:string
    pricePerTicket:number;
    date:Date;
    eventLocation:string;
    
}

export interface IMappedVendor {
    _id?:string
    vendorId:string
    name:string
    email:string
    role:string
    phone:string
    status:string
    vendorStatus:string
    submissionDate:string
    rejectionReason:string
}





export type UserDTO = IAdmin | IClient | IVendor
