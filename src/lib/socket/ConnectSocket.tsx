import type { IVendor } from "@/types/User"
import { useEffect } from "react"
import { socket } from "./socket"
import { refreshVendorSessionThunk } from "@/store/slices/vendorSlice"
import { useAppDispatch } from "@/store/store"


interface ConnectSocketProps {
    user: IVendor
}
export const ConnectSocket = ({ user }: ConnectSocketProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user || !user._id) {
      return;
    }
    socket.connect();
    socket.emit("joinVendorRoom", user._id);

    const handleVendorApproved = (payload: { _id: string, status: string }) => {
      console.log("from server",payload)
    if(payload._id === user._id) {
    dispatch(refreshVendorSessionThunk());
    }
    };

    const handleVendorRejected = (payload:{_id:string,status:string})=>{
      if(payload._id == user._id){
        dispatch(refreshVendorSessionThunk())
      }
    }

    socket.on("vendorApproved", handleVendorApproved);
    socket.on("vendorRejected",handleVendorRejected)
    return () => {
       socket.off("vendorApproved", handleVendorApproved);
       socket.off("vendorRejected",handleVendorRejected)
      socket.disconnect();
    };
  }, [user._id]);
  return null;
};