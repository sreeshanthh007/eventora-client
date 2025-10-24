import { Card } from "@/components/pages/ui/card"
import { CreditCard, Copy, Check } from "lucide-react"
import { useState } from "react"

interface WalletData {
  walletId: string
  balance: number
  userType: string
  userId: string
}

interface WalletCardProps {
  walletData: WalletData
}

export function WalletCard({ walletData }: WalletCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyWalletId = () => {
    navigator.clipboard.writeText(walletData.walletId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Balance Card */}
      <Card className="md:col-span-2 bg-gradient-to-br from-primary to-primary/80 border-0 text-primary-foreground p-8 rounded-2xl shadow-lg">
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium mb-2">Total Balance</p>
            <h2 className="text-5xl font-bold tracking-tight">
              {walletData.balance}
            </h2>
          </div>
          <CreditCard className="w-8 h-8 opacity-80" />
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-primary-foreground/70 text-xs uppercase tracking-widest mb-1">Wallet ID</p>
            <p className="font-mono text-sm break-all">{walletData.walletId}</p>
          </div>
          <button
            onClick={handleCopyWalletId}
            className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors flex-shrink-0"
            aria-label="Copy wallet ID"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </Card>

      {/* User Info Cards */}
      <div className="space-y-4">
        <Card className="p-6 rounded-xl border border-border/50 bg-card hover:shadow-md transition-shadow">
          <p className="text-muted-foreground text-sm font-medium mb-2">Account Type</p>
          <p className="text-2xl font-bold text-foreground capitalize">{walletData.userType}</p>
        </Card>
      </div>
    </div>
  )
}