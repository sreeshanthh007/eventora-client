
import type { UserRole } from "./UserRoles"


export interface User{
    name:string,
    email:string,
    phone:string,
    password:string,
    role?:UserRole
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
  password: string;
  role: "vendor";
  category?: string;
}




export type UserDTO = IAdmin | IClient | IVendor
