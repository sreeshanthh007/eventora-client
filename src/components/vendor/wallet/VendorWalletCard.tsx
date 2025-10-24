import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { CreditCard, User } from "lucide-react"

interface WalletData {
  walletId: string
  balance: number
  userType: string
  userId: string
  transactions: any[] // Will be refined when transactions have structure
}

interface VendorWalletCardProps {
  walletData?: WalletData | null
}

export function VendorWalletCard({ walletData }: VendorWalletCardProps) {
  const defaultWalletData = {
    balance: 0,
    currency: "INR",
    accountType: "Vendor",
  }

  const displayData = walletData ? {
    ...defaultWalletData,
    balance: walletData.balance,
    accountType: walletData.userType,
    accountHolder: `Vendor (${walletData.userId})`, // Using userId as placeholder; fetch full name if available via separate hook
  } : defaultWalletData

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
      <CardHeader className="pb-2">
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm opacity-80 mb-1">Available Balance</p>
          <p className="text-4xl font-bold">
            {displayData.currency} {displayData.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
          <div>
            <p className="text-xs opacity-80 mb-1">Account Type</p>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <p className="font-semibold">{displayData.accountType}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}