import { Card } from "@/components/pages/ui/card"
import { Badge } from "@/components/pages/ui/badge"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface Transaction {
  _id?: string
  currency: string
  paymentStatus: "completed" | "pending" | "failed"
  amount: number
  date: string
  paymentType: "Refund" | "ticketBooking" | "top-up" | "serviceBooking"
  paymentFor: "event" | "service"
  description?: string
  type?: "payment" | "refund" | "deposit"
}

interface TransactionTableProps {
  transactions: Transaction[]
}

function getStatusColor(status: Transaction["paymentStatus"]) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  }
}

function getPaymentTypeLabel(type: Transaction["paymentType"]) {
  switch (type) {
    case "Refund":
      return "Refund"
    case "ticketBooking":
      return "Ticket Booking"
    case "top-up":
      return "top-up"
    case "serviceBooking":
      return "Service Booking"
  }
}

function getPaymentForLabel(type: Transaction["paymentFor"]) {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <Card className="border border-border/50 rounded-xl overflow-hidden bg-card p-12">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">No transactions yet</p>
          <p className="text-muted-foreground/60 text-sm mt-2">
            Your transaction history will appear here
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border border-border/50 rounded-xl overflow-hidden bg-card">
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
            {transactions.map((transaction, index) => (
              <tr 
                key={transaction._id || index} 
                className="border-b border-border/30 hover:bg-muted/20 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  <div className="flex items-center gap-2">
                    {transaction.type === "payment" ? (
                      <ArrowUpRight className="w-4 h-4 text-red-500" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4 text-green-500" />
                    )}
                    {transaction.description || `${getPaymentForLabel(transaction.paymentFor)} Payment`}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">
                  {transaction.type === "payment" ? "-" : "+"}
                  {transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.currency}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {getPaymentTypeLabel(transaction.paymentType)}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {getPaymentForLabel(transaction.paymentFor)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <Badge className={`capitalize ${getStatusColor(transaction.paymentStatus)}`}>
                    {transaction.paymentStatus}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}