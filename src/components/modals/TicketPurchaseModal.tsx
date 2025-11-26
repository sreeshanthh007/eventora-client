// components/modals/TicketPurchaseModal.tsx
import React from "react"
import { Button } from "@/components/pages/ui/button"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Plus, Minus, X } from "lucide-react"

interface TicketItem {
  id: string
  ticketType?: string
  pricePerTicket: number
  quantity: number
  maxPerUser: number
  available: number
}

interface TicketPurchaseData {
  title: string
  email: string
  name: string
  tickets: TicketItem[]
  totalAmount: number
  currency: string
}

interface TicketPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  purchaseData: TicketPurchaseData
  setPurchaseData: React.Dispatch<React.SetStateAction<TicketPurchaseData>>
  onProceedToPayment: () => void
  maxTicketsPerUser: number
}

export const TicketPurchaseModal: React.FC<TicketPurchaseModalProps> = ({
  isOpen,
  onClose,
  purchaseData,
  setPurchaseData,
  onProceedToPayment,
  maxTicketsPerUser,
}) => {
  const totalQuantity = purchaseData.tickets.reduce((sum, t) => sum + t.quantity, 0)

  const handleQuantityChange = (index: number, increment: boolean) => {
    setPurchaseData((prev) => {
      const newTickets = [...prev.tickets]
      const currentItem = newTickets[index]
      const currentTotalQuantity = prev.tickets.reduce((sum, t) => sum + t.quantity, 0)

      if (increment) {
        const newQty = currentItem.quantity + 1
        if (newQty > currentItem.maxPerUser || newQty > currentItem.available) return prev
        if (currentTotalQuantity + 1 > maxTicketsPerUser) return prev
      }

      const newQuantity = increment ? currentItem.quantity + 1 : Math.max(0, currentItem.quantity - 1)
      newTickets[index] = { ...currentItem, quantity: newQuantity }

      const newTotalAmount = newTickets.reduce((sum, t) => sum + t.pricePerTicket * t.quantity, 0)

      return { ...prev, tickets: newTickets, totalAmount: newTotalAmount }
    })
  }

  const isValid = purchaseData.email && purchaseData.name && totalQuantity > 0 && purchaseData.totalAmount > 0

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-40" onClick={onClose} />

      <div className="bg-gradient-to-br from-white via-white to-slate-50 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative z-50 shadow-2xl border border-white/80">
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Get Tickets</h2>
            <p className="text-sm text-muted-foreground mt-1">Secure your spot today</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-slate-100">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email-modal" className="text-sm font-semibold">Email Address</Label>
            <Input
              id="email-modal"
              type="email"
              placeholder="you@example.com"
              className="bg-slate-50 border-slate-200 rounded-lg focus:ring-2 focus:ring-accent/50"
              value={purchaseData.email}
              onChange={(e) => setPurchaseData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name-modal" className="text-sm font-semibold">Full Name</Label>
            <Input
              id="name-modal"
              type="text"
              placeholder="John Doe"
              className="bg-slate-50 border-slate-200 rounded-lg focus:ring-2 focus:ring-accent/50"
              value={purchaseData.name}
              onChange={(e) => setPurchaseData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          {/* Ticket Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Select Tickets</Label>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {purchaseData.tickets.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex justify-between items-center p-4 border border-slate-200/60 rounded-lg bg-white/60 hover:bg-white/80 transition-colors"
                >
                  <div>
                    <span className="font-semibold text-foreground block text-sm">
                      {item.ticketType || "General"}
                    </span>
                    <span className="text-xl font-bold text-black mt-1">₹{item.pricePerTicket}</span>
                    <span className="text-xs text-muted-foreground block mt-1">
                      {item.available} left • max {item.maxPerUser} per user
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(index, false)}
                      disabled={item.quantity <= 0}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-bold min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(index, true)}
                      disabled={
                        item.quantity >= item.maxPerUser ||
                        item.quantity >= item.available ||
                        totalQuantity >= maxTicketsPerUser
                      }
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total & Proceed */}
          <div className="border-t border-slate-200/50 pt-4 bg-gradient-to-r from-slate-50/50 to-transparent rounded-lg p-4 -mx-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total ({totalQuantity} tickets):</span>
              <span className="text-2xl font-bold text-accent">₹{purchaseData.totalAmount}</span>
            </div>

            <Button
              className="w-full bg-gradient-to-r font-bold text-black  hover:from-accent/90 hover:to-accent  rounded-lg h-11 shadow-md hover:shadow-lg"
              onClick={onProceedToPayment}
              disabled={!isValid}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}