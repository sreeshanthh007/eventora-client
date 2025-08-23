
import { createContext, useContext, useEffect } from "react";
import {Socket} from "socket.io-client"
import { socket } from "@/lib/socket/socket";


const socketContext = createContext<Socket>(socket)

export const useSocket = ()=> useContext(socketContext)



export const SocketProvider =   ({children} : {children : React.ReactNode})=>{

    useEffect(()=>{
        socket.on("connect",()=>console.log("client side socket connected successfully"))
        socket.on("disconnect",()=>console.log("client side socket disconnected successfully"))

        return ()=>{
            socket.off("connect")
            socket.off("disconnect")
        }
    },[])

    return(
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}
