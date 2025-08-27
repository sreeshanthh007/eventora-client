
export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}



export const ADMIN_ROUTES = {
 
  REFRESH_TOKEN: "/_ad/refresh-token",
};

export const CLIENT_ROUTES = {
  REFRESH_TOKEN: "/_cl/refresh-token",

};

export const VENDOR_ROUTES = {
  REFRESH_TOKEN: "/_ve/refresh-token",

};