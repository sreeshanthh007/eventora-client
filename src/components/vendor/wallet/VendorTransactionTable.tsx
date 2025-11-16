// src/components/vendor/wallet/VendorTransactionTable.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/pages/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/pages/ui/table";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/pages/ui/button";
import { Pagination } from "@/components/common/paginations/Pagination";

interface Transaction {
  id?: string;
  date: string;
  description?: string;
  amount: number;
  currency: string;
  paymentType: string;
  paymentFor: string;
  paymentStatus: "credit" | "debit";   
}

interface VendorTransactionTableProps {
  transactions: Transaction[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onFilterChange: (type: "all" | "credit" | "debit") => void;
  selectedFilter: "all" | "credit" | "debit";
}


const getAmountColor = (amount: number) =>
  amount >= 0 ? "text-green-600" : "text-red-600";

const getAmountIcon = (amount: number) =>
  amount >= 0 ? (
    <ArrowDownLeft className="h-4 w-4 text-green-600" />
  ) : (
    <ArrowUpRight className="h-4 w-4 text-red-600" />
  );

export function VendorTransactionTable({
  transactions,
  totalPages,
  currentPage,
  onPageChange,
  onFilterChange,
  selectedFilter,
}: VendorTransactionTableProps) {
  // ---------- 1. FILTER ----------
  const filtered = transactions.filter((tx) => {
    if (selectedFilter === "all") return true;
    return tx.paymentStatus === selectedFilter;
  });


  if (filtered.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground">
          {selectedFilter === "all"
            ? "No transactions yet. Your transaction history will appear here once payments are processed."
            : `No ${selectedFilter} transactions yet.`}
        </CardContent>
      </Card>
    );
  }

 
  return (
    <Card>
   
      <div className="flex items-center justify-between p-4 border-b border-primary-foreground/20 bg-primary/5">
        <h2 className="text-xl font-semibold text-foreground">
          Transaction History
        </h2>

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

 
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="text-foreground font-semibold">
                  Date
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Description
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Amount
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Currency
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Payment Type
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Payment For
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((tx) => (
                <TableRow
                  key={tx.id ?? tx.date}
                  className="border-b hover:bg-muted/50"
                >
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="text-sm font-medium text-foreground">
                    {tx.description ||
                      `${tx.paymentFor} - ${tx.paymentType}`}
                  </TableCell>

                  <TableCell
                    className={`text-sm font-semibold ${getAmountColor(
                      tx.amount
                    )}`}
                  >
                    <div className="flex items-center gap-2">
                      {getAmountIcon(tx.amount)}
                      {Math.abs(tx.amount).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {tx.currency}
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {tx.paymentType}
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {tx.paymentFor}
                  </TableCell>

                  <TableCell className="capitalize">
                    {tx.paymentStatus}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* ----- Pagination ----- */}
      {totalPages > 1 && (
        <div className="flex justify-center p-4 border-t border-primary-foreground/20 bg-primary/5">
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