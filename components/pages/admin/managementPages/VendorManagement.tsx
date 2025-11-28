import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/mainComponents/AdminSidebar"
import { useToast } from "@/hooks/ui/UseToaster"
import { SidebarProvider } from "../../ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table"
import { Button } from "../../ui/button"
import { Card } from "../../ui/card"
import { getAllVendors, updateVendorStatus } from "@/services/admin/adminService"
import { Pagination } from "@/components/common/paginations/Pagination"
import { ConfirmDialog } from "@/components/common/popups/ConfirmationPopup"

interface IVendor {
  _id: string
  vendorId: string
  name: string
  email: string
  role: string
  phone: string
  status: string
  createdAt: string
  updatedAt: string
}

const VendorManagementPage = () => {
  const [vendors, setVendors] = useState<IVendor[]>([])
  const [loading, setLoading] = useState(false)
  const [updatingUsers, setUpdatingUsers] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("") // Add search state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("") // Add debounced search
  const limit = 10

  const { showToast } = useToast()
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    vendor: IVendor | null
    action: 'block' | 'unblock'
  }>({
    isOpen: false,
    vendor: null,
    action: 'block'
  })

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Reset to page 1 when search term changes
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) return // Only reset when debounced term changes
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  const fetchVendors = async () => {
    setLoading(true)
    try { 
      const response = await getAllVendors({
        page: currentPage,
        limit: limit,
        search: debouncedSearchTerm // Use debounced search term
      })
      
      console.log('API Response:', response)
      console.log('Vendors received:', response.vendors)
      console.log('Total pages:', response.totalPages)
      
      setVendors(response.vendors || []) 
      setTotalPages(response.totalPages || 1)
    } catch (error) {
      console.error("Error fetching vendors:", error)
      showToast("Error fetching vendors", "error")
      setVendors([])
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  // Refetch when currentPage or debouncedSearchTerm changes
  useEffect(() => {
    fetchVendors()
  }, [currentPage, debouncedSearchTerm])

  const handlePageChange = (page: number) => {
    console.log('Page changing from', currentPage, 'to', page)
    setCurrentPage(page)
    // Force refetch after state update
    setTimeout(() => {
      fetchVendors()
    }, 0)
  }

  const handleSearch = () => {
    // Force immediate search without waiting for debounce
    setDebouncedSearchTerm(searchTerm)
    setCurrentPage(1)
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle Enter key press in search input
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleBlockUserClick = (vendor: IVendor) => {
    if (updatingUsers.has(vendor._id)) {
      return
    }

    const action = vendor.status === "active" ? "block" : "unblock"
    setConfirmDialog({
      isOpen: true,
      vendor,
      action
    })
  }

  const handleConfirmAction = async () => {
    const { vendor, action } = confirmDialog
    
    if (!vendor) return

    setUpdatingUsers(prev => new Set(prev).add(vendor._id))
    
    try {
      const newStatus = action === "block" ? "blocked" : "active"
      
      const response = await updateVendorStatus({
        userId: vendor._id,
        status: newStatus
      })

      if (response.success) {
        setVendors((prev) =>  
          prev.map((v) =>
            v._id === vendor._id ? { ...v, status: newStatus } : v
          )
        )
        confirmDialog.action === "block" 
          ? showToast(`Vendor ${vendor.name} blocked successfully`, "success") 
          : showToast(`Vendor ${vendor.name} unblocked successfully`, "success")
        
      } else {
        throw new Error(response.message || 'Failed to update vendor status')
      }
    } catch (error) {
      console.error("Error updating vendor status:", error)
      showToast("Error updating vendor status", "error")
    } finally {
      setUpdatingUsers(prev => {
        const newSet = new Set(prev)
        newSet.delete(vendor._id)
        return newSet
      })
      setConfirmDialog({
        isOpen: false,
        vendor: null,
        action: 'block'
      })
    }
  }

  const handleCancelAction = () => {
    setConfirmDialog({
      isOpen: false,
      vendor: null,
      action: 'block'
    })
  }

  const renderVendorTable = () => (
    <Table> 
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendors.map((vendor) => (
          <TableRow key={vendor._id}>
            <TableCell>
              {vendor.name}
            </TableCell>
            <TableCell>{vendor.email}</TableCell>
            <TableCell>{vendor.phone}</TableCell>
            <TableCell className="text-center">
              <span className={`px-2 py-1 rounded-full text-xs ${
                vendor.status === "active" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {vendor.status}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleBlockUserClick(vendor)}
                disabled={updatingUsers.has(vendor._id)}
              >
                {updatingUsers.has(vendor._id) 
                  ? "Updating..." 
                  : vendor.status === "active" 
                    ? "Block" 
                    : "Unblock"
                }
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AppSidebar />
        <div className="flex flex-col flex-1 p-6">
          <Card className="w-full">
            <div className="p-6 space-y-6">
              <h1 className="text-3xl font-bold">Vendor Management</h1>
              
              {/* Search Bar */}
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search by name or email"
                  className="px-4 py-2 border rounded w-full max-w-sm"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleSearchKeyPress}
                />
                <Button onClick={handleSearch}>
                  Search
                </Button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">Loading vendors...</div>
              ) : vendors.length === 0 ? (
                <div className="text-center py-8">
                  {debouncedSearchTerm ? "No vendors found matching your search" : "No vendors found"}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  {renderVendorTable()}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
      
      <ConfirmDialog
        open={confirmDialog.isOpen}
        onCancel={handleCancelAction}
        onConfirm={handleConfirmAction}
        title={confirmDialog.action === "block" ? "Block Vendor" : "Unblock Vendor"}
        description={`Are you sure you want to ${confirmDialog.action} vendor "${confirmDialog.vendor?.name}"? ${
          confirmDialog.action === "block"
            ? "This will prevent them from accessing their account."
            : "This will restore their access to the account."
        }`}
        confirmLabel={confirmDialog.action === "block" ? "Block Vendor" : "Unblock Vendor"}
        confirmColor={confirmDialog.action === "block" ? "red" : "green"}
      />
    </SidebarProvider>
  )
}

export default VendorManagementPage