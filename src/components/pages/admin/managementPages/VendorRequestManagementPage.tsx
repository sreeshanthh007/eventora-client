
import type React from "react"

import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/mainComponents/AdminSidebar"
import { useToast } from "@/hooks/ui/UseToaster"
import { useDebounce } from "@/hooks/services/UseDebounce"
import { ReusableTable } from "@/components/common/tables/ReusableTable"
import type { ColumnDefinition } from "@/components/common/tables/ReusableTable"
import { SidebarProvider } from "../../ui/sidebar"
import { UseGetAllRequestedVendors } from "@/hooks/admin/UseGetRequestedVendors"
import { Button } from "@/components/pages/ui/button"
import { VendorDetailsModal } from "@/components/modals/RequestedVendorModal" // Adjust the import path as needed
import { useApproveVendorMutation } from "@/hooks/admin/UseApproveVendor"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { useRejectVendorMutation } from "@/hooks/admin/UseRejectVendor"

interface RequestedVendor {
  _id: string
  name: string
  email: string
  vendorStatus: string
  idProof: string
}

const RequestedVendorsPage = () => {
  const [vendors, setVendors] = useState<RequestedVendor[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const limit = 10
  const { showToast } = useToast()
  const dispatch = useDispatch()
  const vendor = useSelector((state:RootState)=>state.vendor.vendor)

  const { mutateAsync: approveVendor } = useApproveVendorMutation()
  const {mutateAsync:rejectVendor} = useRejectVendorMutation()

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    item: RequestedVendor | null
    action: "approved" | "rejected" | "pending"
  }>({
    isOpen: false,
    item: null,
    action: "approved",
  })

  const { data, isLoading, isError, error } = UseGetAllRequestedVendors({
    page: currentPage,
    limit,
    search: debouncedSearchTerm,
  })

  useEffect(() => {
    if (data?.vendors) {
      setVendors(data.vendors)
    }
  }, [data])

  const totalPages = data?.totalPages || Math.ceil((data?.total || 0) / limit) || 1

  useEffect(() => {
    if (isError) {
      showToast(error?.message || "Failed to fetch requested vendors", "error")
    }
  }, [isError, error, showToast])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  const handleSearchClick = () => {
    setCurrentPage(1)
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick()
    }
  }

  const handleApproveVendor = async (vendorId: string) => {
    const res = await approveVendor(
      vendorId,
    )
    if (res.success) {
      setVendors((prev) => prev.map((v) => (v._id === vendorId ? { ...v, vendorStatus: "approved" } : v)))
    }
  }

  const handleRejectVendor = async(vendorId: string,rejectReason:string) => {
    console.log("rejecteed reason",rejectReason)
   const res = await rejectVendor(
   {
    vendorId,
    rejectReason
   },
   )
   if(res.success){
    setVendors((prev)=>prev.map((v)=>(v._id === vendorId ? {...v,vendorStatus:"rejected"} : v)))
   }

  }

  const vendorColumns: ColumnDefinition<RequestedVendor>[] = [
    { key: "_id", header: "Vendor ID" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "vendorStatus", header: "Status", className: "text-center" },
    {
      key: "actions",
      header: "Actions",
      className: "text-center",
      render: (item: RequestedVendor) => {
        return (
          <VendorDetailsModal
            vendor={{
              name: item.name,
              email: item.email,
              idProof: item.idProof,
              _id:item._id
            }}
            vendorStatus={item.vendorStatus}
            onApprove={() => handleApproveVendor(item._id)}
              onReject={handleRejectVendor}
          >
            <Button
              variant="outline"
              
              size="sm"
              onClick={(e) => {
                console.log("Button clicked for vendor:", item.name) // Debug log
                e.stopPropagation()
              }}
            >
              See More Details
            </Button>
          </VendorDetailsModal>
        )
      },
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AppSidebar />
        <div className="flex flex-col flex-1 p-6">
          <ReusableTable<RequestedVendor>
            data={vendors}
            loading={isLoading}
            updatingItems={new Set<string>()} // No updates, empty set
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchInputChange}
            onSearchKeyPress={handleSearchKeyPress}
            onSearchClick={handleSearchClick}
            confirmDialog={confirmDialog}
            onConfirmAction={() => {
              /* No action needed */
            }}
            onCancelAction={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
            entityType="vendor"
            columns={vendorColumns}
            showActionsColumn={false}
          />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default RequestedVendorsPage
