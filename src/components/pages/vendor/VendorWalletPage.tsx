
import { VendorLayout } from "@/components/layouts/VendorLayout";
import { VendorWalletCard } from "@/components/vendor/wallet/VendorWalletCard";
import { VendorTransactionTable } from "@/components/vendor/wallet/VendorTransactionTable";
import { UseGetVendorWalletDetails } from "@/hooks/vendor/UseGetVendorWalletDetails";
import { useState } from "react";

export default function VendorWalletPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");
  const limit = 6; // same as client side

  const { data: walletResp, isError, isLoading } = UseGetVendorWalletDetails({
    page,
    limit,
    type: filter,
  });

  const wallet = walletResp?.wallet?.walletDetails;
  const total = walletResp?.wallet?.total ?? 0;
  const totalPages = total ? Math.ceil(total / limit) : 0;

  if (isLoading) {
    return (
      <VendorLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account balance and transactions
            </p>
          </div>
          <div className="text-center py-8">Loading...</div>
        </div>
      </VendorLayout>
    );
  }

  if (isError) {
    return (
      <VendorLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account balance and transactions
            </p>
          </div>
          <div className="text-center py-8 text-destructive">
            Error loading wallet data. Please try again.
          </div>
        </div>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Wallet</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account balance and transactions
          </p>
        </div>

        <VendorWalletCard walletData={wallet ?? null} />

        <VendorTransactionTable
          transactions={wallet?.transactions ?? []}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
          onFilterChange={(newFilter) => {
            setFilter(newFilter);
            setPage(1); 
          }}
          selectedFilter={filter}
        />
      </div>
    </VendorLayout>
  );
}