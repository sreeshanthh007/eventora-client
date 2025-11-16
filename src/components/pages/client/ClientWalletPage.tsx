
import { WalletCard } from "@/components/client/wallet/ClientWalletCard";
import { TransactionTable } from "@/components/client/wallet/ClientTransactionsTable";
import { ProfileSidebar } from "@/components/mainComponents/ProfileSidebar";
import { Breadcrumbs } from "@/components/common/breadCrumbs/BreadCrumbs";
import { Footer } from "@/components/mainComponents/Footer";
import { useGetClientWalletDetails } from "@/hooks/client/UseGetClientWalletDetails";
import { useState } from "react";
import type { TransactionType } from "@/types/wallet";

export default function ClientWalletPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<TransactionType>("all");
  const limit = 6;

  const {
    data: walletResp,
    isLoading,
    isError,
  } = useGetClientWalletDetails({ page, limit, type: filter });

  const wallet = walletResp?.wallet?.walletDetails;
  const hasError = isError || !walletResp?.success;


  const totalPages = walletResp?.wallet?.total
    ? Math.ceil(walletResp.wallet.total / limit)
    : 0;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar />
            </div>

            {/* Main */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold text-gray-900">My Wallet</h1>
                  <p className="text-gray-600">
                    Manage your balance and view transaction history
                  </p>
                </div>

                {/* Wallet Card */}
                <WalletCard
                  walletData={wallet ?? null}
                  isLoading={isLoading}
                  isError={hasError}
                />

      
                <TransactionTable
                  transactions={wallet?.transactions ?? []}
                  isLoading={isLoading}
                  isError={hasError}
                  totalPages={totalPages}
                  currentPage={page}
                  onPageChange={setPage}
                  onFilterChange={(type) => {
                    setFilter(type);
                    setPage(1);
                  }}
                  selectedFilter={filter}
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}