
import { AdminHeader } from "@/components/mainComponents/AdminHeader";
import { Loginbackground } from "@/components/admin/Loginbackground";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Loginbackground />
      <AdminHeader />
      <main>{children}</main>
    </div>
  )
}