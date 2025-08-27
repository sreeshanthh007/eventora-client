import type React from "react"
import { ClientHeader } from "../client/ClientHeader"
import { Footer } from "../mainComponents/Footer"
import { useEffect } from "react"
import { useAppDispatch, type RootState } from "@/store/store"
import { refreshClientSessionThunk } from "@/store/slices/clientSlice"
import { useSelector } from "react-redux"

interface ClientLayoutProps {
  children: React.ReactNode
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const vendor = useSelector((state:RootState)=>state.client.client)

    useEffect(()=>{
        dispatch(refreshClientSessionThunk())
    },[dispatch])
  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
