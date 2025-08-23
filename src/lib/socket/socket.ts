
import { io , Socket } from "socket.io-client";
import type { ServerToClientEvents , ClientToServerEvents } from "@/types/SocketEvents";
const URL = import.meta.env.VITE_SOCKET_URL

export const socket : Socket<ServerToClientEvents,ClientToServerEvents> = io(
    URL,
    {
        withCredentials:true,
        transports:["websocket"]
    }
)