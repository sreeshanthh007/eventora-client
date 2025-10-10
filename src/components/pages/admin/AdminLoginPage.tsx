import { AdminLoginForm } from "@/components/admin/AdminLoginForm"
import { useLoginMutation } from "@/hooks/auth/userLogin"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { adminLogin } from "@/store/slices/adminSlice"
import type { ILoginData } from "@/services/auth/authServices"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  
  const { mutate: loginAdmin, isPending } = useLoginMutation()

  const handleAdminLogin = (data: Omit<ILoginData, "role">) => {
   
    setError("")
    
    loginAdmin(
      { ...data, role: "admin" },
      {
        onSuccess: (response) => {
          toast.success(response.message)
          dispatch(adminLogin(response.user));
          
          navigate("/admin/dashboard")
          
        },
        onError: (err: any) => {
          const errorMessage = err.response?.data?.message || "Login failed. Please try again."
          setError(errorMessage)
          toast.error(errorMessage)
        }
      }
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        <AdminLoginForm 
          onLogin={handleAdminLogin}
          isLoading={isPending}
          error={error}
        />
      </div>
    </div>
  )
}