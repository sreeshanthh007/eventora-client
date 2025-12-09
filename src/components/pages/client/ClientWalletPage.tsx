// src/pages/client/ClientWalletPage.tsx
import { WalletCard } from "@/components/client/wallet/ClientWalletCard"
import { TransactionTable } from "@/components/client/wallet/ClientTransactionsTable"
import { ProfileSidebar } from "@/components/mainComponents/ProfileSidebar"
import { Breadcrumbs } from "@/components/common/breadCrumbs/BreadCrumbs"
import { Footer } from "@/components/mainComponents/Footer"
import { useGetClientWalletDetails } from "@/hooks/client/UseGetClientWalletDetails"
import { useState } from "react"
import type { TransactionType } from "@/types/wallet"

const LIMIT = 6

export default function ClientWalletPage() {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState<TransactionType>("all")

  const { data: walletResp, isLoading, isError } = useGetClientWalletDetails({
    page,
    limit: LIMIT,
    type: filter,
  })

  const wallet = walletResp?.wallet?.walletDetails
  const hasError = isError || !walletResp?.success
  const totalPages = walletResp?.wallet?.total
    ? Math.ceil(walletResp.wallet.total / LIMIT)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs role="client" />
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-6">
              <ProfileSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 order-1 lg:order-2">
            <div className="space-y-8">
              {/* Page Header */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
                <p className="text-gray-600 mt-2">
                  Manage your balance and view transaction history
                </p>
              </div>

              {/* Wallet Balance Card */}
              <WalletCard
                walletData={wallet ?? null}
                isLoading={isLoading}
                isError={hasError}
              />

              {/* Transactions Table */}
              <TransactionTable
                transactions={wallet?.transactions ?? []}
                isLoading={isLoading}
                isError={hasError}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
                onFilterChange={(type) => {
                  setFilter(type)
                  setPage(1)
                }}
                selectedFilter={filter}
              />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}