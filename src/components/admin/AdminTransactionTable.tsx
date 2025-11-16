
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/pages/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/pages/ui/table";
import { Badge } from "@/components/pages/ui/badge";
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

interface AdminTransactionTableProps {
  transactions: Transaction[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onFilterChange: (type: "all" | "credit" | "debit") => void;
  selectedFilter: "all" | "credit" | "debit";
}

const getStatusBadge = (status: "credit" | "debit") => {
  return status === "credit" ? (
    <Badge className="bg-green-100 text-green-800 border border-green-200">
      Credit
    </Badge>
  ) : (
    <Badge className="bg-red-100 text-red-800 border border-red-200">
      Debit
    </Badge>
  );
};

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Math.abs(amount));

export function AdminTransactionTable({
  transactions,
  totalPages,
  currentPage,
  onPageChange,
  onFilterChange,
  selectedFilter,
}: AdminTransactionTableProps) {
  // Filter by paymentStatus
  const filtered = transactions.filter((tx) => {
    return selectedFilter === "all" || tx.paymentStatus === selectedFilter;
  });

  if (filtered.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {selectedFilter === "all"
              ? "No transactions found."
              : `No ${selectedFilter} transactions found.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-12 text-center text-muted-foreground">
          {selectedFilter === "all"
            ? "Your transaction history will appear here."
            : `No ${selectedFilter} transactions yet.`}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {/* Header + Filter */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <h2 className="text-xl font-semibold">Transaction History</h2>
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
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead>Payment For</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((tx) => (
                <TableRow key={tx.id ?? tx.date}>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {tx.paymentStatus === "credit" ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-600" />
                      )}
                      {tx.description || `${tx.paymentFor} - ${tx.paymentType}`}
                    </div>
                  </TableCell>
                  <TableCell
                    className={`font-semibold ${
                      tx.paymentStatus === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.paymentStatus === "credit" ? "+" : "-"}
                    {formatCurrency(tx.amount, tx.currency)}
                  </TableCell>
                  <TableCell>{tx.currency}</TableCell>
                  <TableCell>{tx.paymentType}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {tx.paymentFor}
                  </TableCell>
                  <TableCell>{getStatusBadge(tx.paymentStatus)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center p-4 border-t bg-muted/30">
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