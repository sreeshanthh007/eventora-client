import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/pages/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Badge } from "@/components/pages/ui/badge"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface Transaction {
  id: string
  date: string
  description?: string
  amount: number
  currency: string
  paymentType: string
  paymentFor: string
  paymentStatus: "credit" | "debit"
}

interface AdminTransactionTableProps {
  transactions: Transaction[]
}

function getStatusBadge(status: string) {
  switch (status) {
    case "credit":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          credit
        </Badge>
      )
    case "debit":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          debit
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export function AdminTransactionTable({ transactions }: AdminTransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View all your transactions and payment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <p>No transactions found.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View all your transactions and payment details</CardDescription>
      </CardHeader>
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
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.amount > 0 ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-600" />
                      )}
                      {transaction.description || 'Transaction'}
                    </div>
                  </TableCell>
                  <TableCell
                    className={transaction.amount > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </TableCell>
                  <TableCell>{transaction.currency}</TableCell>
                  <TableCell>{transaction.paymentType}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{transaction.paymentFor}</TableCell>
                  <TableCell>{getStatusBadge(transaction.paymentStatus)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}