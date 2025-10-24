import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Badge } from "@/components/pages/ui/badge"
import { AdminTransactionTable } from "@/components/admin/AdminTransactionTable"
import { AdminWalletCard } from "@/components/admin/AdminWalletCard"
import { AppSidebar } from "@/components/mainComponents/AdminSidebar"
import { SidebarProvider } from "../ui/sidebar"
import { useAdminWalletDetails } from "@/hooks/admin/UseAdminWalletDetails"

export default function AdminWalletDetailsPage() {
  const { data: wallet, isLoading, isError } = useAdminWalletDetails()
    const walletData = wallet?.wallet
    console.log(walletData);
    
  if (isLoading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col gap-6 p-6 w-full">
          <div className="flex items-center justify-center h-64">
            <p>Loading wallet details...</p>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  if (isError) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col gap-6 p-6 w-full">
          <div className="flex items-center justify-center h-64">
            <p>Error loading wallet details. Please try again.</p>
          </div>
        </div>
      </SidebarProvider>
    )
  }


  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col gap-6 p-6 w-full">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground">Manage your wallet and view transaction history</p>
        </div>

        {/* Wallet Card and Account Type */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <AdminWalletCard wallet={walletData} />
          </div>

          {/* Account Type Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Account Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{walletData.userType}</span>
                <Badge variant="secondary">Active</Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {
                   `${walletData?.userType} account with full transaction access`
                }
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <AdminTransactionTable transactions={walletData?.transactions || []} />
        </div>
      </div>
    </SidebarProvider>
  )
}