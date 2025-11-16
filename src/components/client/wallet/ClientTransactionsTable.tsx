import { Card } from "@/components/pages/ui/card";
import { Badge } from "@/components/pages/ui/badge";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/pages/ui/button";
import { Pagination } from "@/components/common/paginations/Pagination";

interface Transaction {
  _id?: string;
  currency: string;
  paymentStatus: "credit" | "debit";
  amount: number;
  date: string;
  paymentType: "Refund" | "ticketBooking" | "top-up" | "serviceBooking";
  paymentFor: "event" | "service";
  description?: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  isError: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onFilterChange: (type: "all" | "credit" | "debit") => void;
  selectedFilter: "all" | "credit" | "debit";
}

function getStatusColor(status: Transaction["paymentStatus"]) {
  return status === "credit"
    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
}

function getPaymentTypeLabel(type: Transaction["paymentType"]) {
  const map: Record<Transaction["paymentType"], string> = {
    Refund: "Refund",
    ticketBooking: "Ticket Booking",
    "top-up": "Top-up",
    serviceBooking: "Service Booking",
  };
  return map[type];
}

function getPaymentForLabel(type: Transaction["paymentFor"]) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function TransactionTable({
  transactions,
  isLoading,
  isError,
  totalPages,
  currentPage,
  onPageChange,
  onFilterChange,
  selectedFilter,
}: TransactionTableProps) {
  const filteredTransactions = transactions.filter((tx) => {
    if (selectedFilter === "all") return true;
    return tx.paymentStatus === selectedFilter;
  });


  if (isLoading) {
    return (
      <Card className="border border-border/50 rounded-xl overflow-hidden bg-card p-12">
        <p className="text-center text-muted-foreground">Loading transactions…</p>
      </Card>
    );
  }


  if (isError) {
    return (
      <Card className="border border-border/50 rounded-xl overflow-hidden bg-card p-12">
        <p className="text-center text-muted-foreground">Failed to load transactions.</p>
      </Card>
    );
  }


  if (filteredTransactions.length === 0) {
    return (
      <Card className="border border-border/50 rounded-xl overflow-hidden bg-card p-12">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">
            {selectedFilter === "all"
              ? "No transactions yet"
              : `No ${selectedFilter} transactions`}
          </p>
          <p className="text-muted-foreground/60 text-sm mt-2">
            {selectedFilter === "all"
              ? "Your transaction history will appear here"
              : `Try switching to "All" to see all transactions`}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-border/50 rounded-xl overflow-hidden bg-card">

      <div className="flex items-center justify-between p-4 border-b border-border/30 bg-muted/30">
        <h2 className="text-xl font-semibold text-foreground">Transaction History</h2>

        <div className="flex gap-2">
          {(["all", "credit", "debit"] as const).map((opt) => (
            <Button
              key={opt}
              variant={selectedFilter === opt ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(opt)}
              className="capitalize"
            >
              {opt === "all" ? "All" : opt}
            </Button>
          ))}
        </div>
      </div>

     
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Description</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Currency</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Payment Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">For</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, idx) => (
              <tr
                key={tx._id ?? idx}
                className="border-b border-border/30 hover:bg-muted/20 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(tx.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  <div className="flex items-center gap-2">
                    {tx.paymentStatus === "debit" ? (
                      <ArrowUpRight className="w-4 h-4 text-red-500" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4 text-green-500" />
                    )}
                    {tx.description ?? `${getPaymentForLabel(tx.paymentFor)} Payment`}
                  </div>
                </td>
                <td
                  className={`px-6 py-4 text-sm font-semibold ${
                    tx.paymentStatus === "debit" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {tx.paymentStatus === "debit" ? "-" : "+"}
                  {tx.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{tx.currency}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {getPaymentTypeLabel(tx.paymentType)}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {getPaymentForLabel(tx.paymentFor)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <Badge className={`capitalize ${getStatusColor(tx.paymentStatus)}`}>
                    {tx.paymentStatus}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {totalPages > 1 && (
        <div className="flex justify-center p-4 border-t border-border/30 bg-muted/30">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </Card>
  );
}