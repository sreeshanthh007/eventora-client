import { Card } from "@/components/pages/ui/card"
import { CreditCard, Copy, Check } from "lucide-react"
import { useState } from "react"

interface WalletDetails {
  balance: number
  userId: string
  // walletId?: string   // optional if backend adds it later
}

interface WalletCardProps {
  walletData: WalletDetails | null
  isLoading?: boolean
  isError?: boolean
}

export function WalletCard({ walletData, isLoading, isError }: WalletCardProps) {
  const [copied, setCopied] = useState(false)

  const walletId = walletData
    ? `${walletData.userId.slice(0, 8).toUpperCase()}...${walletData.userId.slice(-4).toUpperCase()}`
    : ""

  const handleCopyWalletId = () => {
    if (!walletData) return
    navigator.clipboard.writeText(walletData.userId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-0 rounded-2xl shadow-lg p-8 animate-pulse">
          <div className="flex items-start justify-between mb-12">
            <div>
              <div className="h-4 bg-muted rounded w-32 mb-2"></div>
              <div className="h-12 bg-muted rounded w-48"></div>
            </div>
            <div className="w-8 h-8 bg-muted rounded"></div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="h-3 bg-muted rounded w-20 mb-1"></div>
              <div className="h-4 bg-muted rounded w-64"></div>
            </div>
            <div className="w-10 h-10 bg-muted rounded-lg"></div>
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-6 rounded-xl border border-border/50 bg-card h-24 animate-pulse">
            <div className="h-3 bg-muted rounded w-24 mb-2"></div>
            <div className="h-6 bg-muted rounded w-32"></div>
          </Card>
        </div>
      </div>
    )
  }

  if (isError || !walletData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-0 rounded-2xl shadow-lg p-8">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg font-medium">Failed to load wallet</p>
            <p className="text-muted-foreground/60 text-sm mt-2">
              Please refresh the page or try again later
            </p>
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-6 rounded-xl border border-border/50 bg-card">
            <div className="text-center">
              <p className="text-red-500 text-sm">Error loading details</p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Balance Card */}
      <Card className="md:col-span-2 bg-gradient-to-br from-primary to-primary/80 border-0 text-primary-foreground p-8 rounded-2xl shadow-lg">
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium mb-2">
              Total Balance
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight">₹</span>
              <h2 className="text-5xl font-bold tracking-tight">
                {walletData.balance.toLocaleString("en-IN")}
              </h2>
            </div>
          </div>
          <CreditCard className="w-10 h-10 opacity-80" />
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-primary-foreground/70 text-xs uppercase tracking-widest mb-1">
              Wallet ID
            </p>
            <p className="font-mono text-lg break-all tracking-wider">
              {walletId}
            </p>
          </div>
          <button
            onClick={handleCopyWalletId}
            className="p-3 hover:bg-primary-foreground/20 rounded-xl transition-all flex-shrink-0"
            aria-label="Copy wallet ID"
          >
            {copied ? (
              <Check className="w-6 h-6 text-green-300" />
            ) : (
              <Copy className="w-6 h-6" />
            )}
          </button>
        </div>
      </Card>

      {/* Account Type / Info Card */}
      <div className="space-y-4">
        <Card className="p-6 rounded-xl border border-border/50 bg-card hover:shadow-md transition-shadow">
          <p className="text-muted-foreground text-sm font-medium mb-2">Account Type</p>
          <p className="text-2xl font-bold text-foreground capitalize">Client</p>
        </Card>
      </div>
    </div>
  )
}