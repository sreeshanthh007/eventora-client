// src/pages/admin/AdminWalletDetailsPage.tsx
import { AdminWalletCard } from "@/components/admin/AdminWalletCard";
import { AdminTransactionTable } from "@/components/admin/AdminTransactionTable";
import { AppSidebar } from "@/components/mainComponents/AdminSidebar";
import { SidebarProvider } from "../ui/sidebar";
import { useAdminWalletDetails } from "@/hooks/admin/UseAdminWalletDetails";
import { useState } from "react";
import type { TransactionType } from "@/types/wallet";

export default function AdminWalletDetailsPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<TransactionType>("all");
  const limit = 5;

  const { data: walletResp, isLoading, isError } = useAdminWalletDetails({
    page,
    limit,
    type: filter,
  });

  const wallet = walletResp?.wallet?.walletDetails;
  const total = walletResp?.wallet?.total ?? 0;
  const totalPages = total 

  if (isLoading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col gap-6 p-6 w-full">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading wallet details...</p>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  if (isError || !wallet) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col gap-6 p-6 w-full">
          <div className="flex items-center justify-center h-64">
            <p className="text-destructive">
              Error loading wallet details. Please try again.
            </p>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col gap-6 p-6 w-full">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground">
            Manage your wallet and view transaction history
          </p>
        </div>

        {/* Wallet Card + Account Type */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <AdminWalletCard wallet={wallet} />
          </div>

          <div>
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Account Type</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold capitalize">{wallet.userType}</span>
                <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {wallet.userType} account with full access
              </p>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <AdminTransactionTable
          transactions={wallet.transactions ?? []}
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
    </SidebarProvider>
  );
}