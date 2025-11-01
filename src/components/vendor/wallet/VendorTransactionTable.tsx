import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/pages/ui/table"
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
  status: "completed" | "pending" | "partialRefund"
}

interface VendorTransactionTableProps {
  transactions: Transaction[]
}

export function VendorTransactionTable({ transactions }: VendorTransactionTableProps) {
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      case "partialRefund":
       return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">refunded</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getAmountColor = (amount: number) => {
    return amount >= 0 ? "text-green-600" : "text-red-600"
  }

  const getAmountIcon = (amount: number) => {
    return amount >= 0 ? (
      <ArrowDownLeft className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowUpRight className="h-4 w-4 text-red-600" />
    )
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground">
          No transactions yet. Your transaction history will appear here once payments are processed.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="text-foreground font-semibold">Date</TableHead>
                <TableHead className="text-foreground font-semibold">Description</TableHead>
                <TableHead className="text-foreground font-semibold">Amount</TableHead>
                <TableHead className="text-foreground font-semibold">Currency</TableHead>
                <TableHead className="text-foreground font-semibold">Payment Type</TableHead>
                <TableHead className="text-foreground font-semibold">Payment For</TableHead>
                <TableHead className="text-foreground font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-b hover:bg-muted/50">
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {transaction.description || `${transaction.paymentFor} - ${transaction.paymentType}`}
                  </TableCell>
                  <TableCell className={`text-sm font-semibold ${getAmountColor(transaction.amount)}`}>
                    <div className="flex items-center gap-2">
                      {getAmountIcon(transaction.amount)}
                      {Math.abs(transaction.amount).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{transaction.currency}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{transaction.paymentType}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{transaction.paymentFor}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}