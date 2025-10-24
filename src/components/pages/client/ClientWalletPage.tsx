import { WalletCard } from "@/components/client/wallet/ClientWalletCard"
import { TransactionTable } from "@/components/client/wallet/ClientTransactionsTable"
import { ProfileSidebar } from "@/components/mainComponents/ProfileSidebar"
import { useGetClientWalletDetails } from "@/hooks/client/UseGetClientWalletDetails"

export default function ClientWalletPage() {
  const { data:wallet, isLoading, isError } = useGetClientWalletDetails()
 const walletData = wallet?.wallet
 console.log(walletData)
  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <ProfileSidebar />
        <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto flex items-center justify-center h-full">
            <p className="text-muted-foreground">Loading wallet details...</p>
          </div>
        </main>
      </div>
    )
  }

  if (isError || !wallet?.success) {
    return (
      <div className="flex min-h-screen">
        <ProfileSidebar />
        <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto flex items-center justify-center h-full">
            <p className="text-red-500">Error loading wallet details. Please try again.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <ProfileSidebar />
      <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-8 w-full">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">My Wallet</h1>
            <p className="text-muted-foreground">Manage your balance and track transactions</p>
          </div>

          <WalletCard walletData={walletData} />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Transaction History</h2>
            <TransactionTable transactions={walletData.transactions} />
          </div>
        </div>
      </main>
    </div>
  )
}