export interface ServerToClientEvents {
 vendorApproved: (payload: { _id: string; status: string }) => void;
 vendorRejected:(payload:{_id:string,status:string}) =>void;
}

export interface ClientToServerEvents {
  joinVendorRoom: (vendorId: string) => void;
}