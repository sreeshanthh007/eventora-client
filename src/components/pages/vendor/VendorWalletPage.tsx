import { VendorLayout } from "@/components/layouts/VendorLayout"
import { VendorWalletCard } from "@/components/vendor/wallet/VendorWalletCard"
import { VendorTransactionTable } from "@/components/vendor/wallet/VendorTransactionTable"
import { UseGetVendorWalletDetails } from "@/hooks/vendor/UseGetVendorWalletDetails"

export default function VendorWalletPage() {
    const {data: wallet, isError, isLoading} = UseGetVendorWalletDetails()
    
    const walletData = wallet?.wallet

    
    if (isLoading) {
      return (
        <VendorLayout>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
              <p className="text-muted-foreground mt-1">Manage your account balance and transactions</p>
            </div>
            <div className="text-center py-8">Loading...</div>
          </div>
        </VendorLayout>
      )
    }
    
    if (isError) {
      return (
        <VendorLayout>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
              <p className="text-muted-foreground mt-1">Manage your account balance and transactions</p>
            </div>
            <div className="text-center py-8 text-destructive">Error loading wallet data. Please try again.</div>
          </div>
        </VendorLayout>
      )
    }
    
    return (
      <VendorLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Wallet</h1>
            <p className="text-muted-foreground mt-1">Manage your account balance and transactions</p>
          </div>

          <VendorWalletCard walletData={walletData} />

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Transaction History</h2>
            <VendorTransactionTable transactions={walletData?.transactions || []} />
          </div>
        </div>
      </VendorLayout>
    )
}