
import { useEffect } from "react"
import { socket } from "./socket"
import { refreshVendorSessionThunk } from "@/store/slices/vendorSlice"
import { useAppDispatch } from "@/store/store"


interface ConnectSocketProps {
    user: string
}
export const ConnectSocket = ({ user }: ConnectSocketProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) {
      return;
    }
    socket.connect();
    socket.emit("joinVendorRoom", user);

    const handleVendorApproved = (payload: { _id: string, status: string }) => {

    if(payload._id === user) {
    dispatch(refreshVendorSessionThunk());
    }
    };

    const handleVendorRejected = (payload:{_id:string,status:string})=>{
      if(payload._id == user){
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
  }, [user]);
  return null;
};