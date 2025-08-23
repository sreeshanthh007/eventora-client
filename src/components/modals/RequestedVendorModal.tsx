"use client"

import React, { useState } from "react"
import { Button } from "@/components/pages/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/pages/ui/dialog"
import { Label } from "@/components/pages/ui/label"
import { Textarea } from "@/components/pages/ui/textarea"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"

interface Vendor {
  name: string
  email: string
  idProof: string
  _id:string
}

interface VendorDetailsModalProps {
  vendor: Vendor
  vendorStatus: string
  onApprove: (vendorId: string) => void
  onReject: (vendorId: string, rejectionReason: string) => void
  children: React.ReactNode
}

export function VendorDetailsModal({ vendor, vendorStatus, onApprove, onReject, children }: VendorDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const imageUrl = getCloudinaryImageUrl(vendor.idProof)

  const isApproved = vendorStatus === "approved"

  const handleRejectWithReason = () => {
    if (rejectionReason.trim()) {
      onReject(vendor._id, rejectionReason)
      setIsRejectionModalOpen(false)
      setIsOpen(false)
      setRejectionReason("")
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {React.cloneElement(children as React.ReactElement, {
            onClick: (e: React.MouseEvent) => {
              e.preventDefault()
              e.stopPropagation()
              setIsOpen(true)
            },
          })}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Vendor Details</DialogTitle>
            <DialogDescription>View and manage the vendor's information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <span id="name" className="col-span-3 text-left font-medium">
                {vendor.name}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <span id="email" className="col-span-3 text-left font-medium">
                {vendor.email}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <span
                id="status"
                className={`col-span-3 text-left font-medium capitalize ${
                  vendorStatus === "approved"
                    ? "text-green-600"
                    : vendorStatus === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                }`}
              >
                {vendorStatus}
              </span>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="idProof" className="text-right pt-2">
                ID Proof
              </Label>
              <div className="col-span-3">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt={`ID Proof for ${vendor.name}`}
                  className="rounded-md object-cover border w-[300px] h-[200px]"
                  onError={(e) => {
                    console.log("Image failed to load:", imageUrl)
                    e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                  }}
                  onLoad={() => console.log("Image loaded successfully:", imageUrl)}
                />
              </div>
            </div>
          </div>
          {!isApproved && (
            <DialogFooter>
              <Button variant="destructive" onClick={() => setIsRejectionModalOpen(true)}>
                Reject
              </Button>
              <Button
                onClick={() => {
                  onApprove(vendor.name)
                  setIsOpen(false)
                }}
              >
                Approve
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isRejectionModalOpen} onOpenChange={setIsRejectionModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reject Vendor</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting {vendor.name}'s application.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="rejection-reason">Rejection Reason</Label>
              <Textarea
                id="rejection-reason"
                placeholder="Enter the reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsRejectionModalOpen(false)
                setRejectionReason("")
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectWithReason} disabled={!rejectionReason.trim()}>
              Reject Vendor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
