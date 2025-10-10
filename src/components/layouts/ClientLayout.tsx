import type React from "react"
import { ClientHeader } from "../client/ClientHeader"
import { Footer } from "../mainComponents/Footer"
import { useEffect } from "react"
import { useAppDispatch } from "@/store/store"
import { refreshClientSessionThunk } from "@/store/slices/clientSlice"

interface ClientLayoutProps {
  children: React.ReactNode
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch()

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
