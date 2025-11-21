import { useEffect, useState } from "react"
  import { AppSidebar } from "@/components/mainComponents/AdminSidebar"
  import { useToast } from "@/hooks/ui/UseToaster"
  import { SidebarProvider } from "@/components/pages/ui/sidebar"
  import { useDebounce } from "@/hooks/services/UseDebounce"
  import { ReusableTable } from "@/components/common/tables/ReusableTable"
  import { type ColumnDefinition } from "@/components/common/tables/ReusableTable"
  import { useGetAllVendors } from "@/hooks/admin/UseAllVendors"
  import { useUpdateVendorMutation } from "@/hooks/admin/UseUpdateVendorStatus"
import { useNavigate } from "react-router-dom"

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
    const [searchTerm, setSearchTerm] = useState("")
    const [vendors, setVendors] = useState<IVendor[]>([])
    const debouncedSearchTerm = useDebounce(searchTerm, 300)
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate()
    const [confirmDialog, setConfirmDialog] = useState<{
      isOpen: boolean
      item: IVendor | null
      action: "blocked" | "unblock"
    }>({
      isOpen: false,
      item: null,
      action: "blocked",
    })
    const limit = 10
    const { showToast } = useToast()
  const { mutateAsync: updateVendorStatus } = useUpdateVendorMutation()
    const { data, isLoading, isError, error } = useGetAllVendors({
      page: currentPage,
      limit,
      search: debouncedSearchTerm,
    })
    
  useEffect(() => {
    if (data?.vendors) {
    
      setVendors(data.vendors)
    }
  }, [data])
    const totalPages = data?.totalPages || 1

    useEffect(() => {
      if (isError) {
        showToast(error?.message || "Failed to fetch vendors", "error")
      }
    }, [isError, error, showToast])

    useEffect(() => {
      setCurrentPage(1)
    }, [debouncedSearchTerm])

    const handleBlockUserClick = (vendor: IVendor) => {
      const action = vendor.status === "active" ? "blocked" : "unblock"
      setConfirmDialog({
        isOpen: true,
        item: vendor,
        action,
      })
    }

    const handleConfirmAction = async () => { 
      const { item, action } = confirmDialog
      if (!item) return
        try {
      const res = await updateVendorStatus({
        vendorId: item._id,
        status: action === "blocked" ? "blocked" : "active",
      })
      let status = action === "blocked" ? "blocked" : "active"
      if (res?.success) {
        setVendors(vendors =>
          vendors.map(v =>
            v._id === item._id ? { ...v, status: status } : v
          )
        )
      }
    } catch (err) {
      showToast("Failed to update vendor status", "error")
    }
    }

    const handleCancelAction = () => {
      setConfirmDialog({
        isOpen: false,
        item: null,
        action: "blocked",
      })
    }

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    }

    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setCurrentPage(1)
      }
    }

    const handleRequestedVendorsClick = () => {
      navigate("/admin/requestedVendors")
    }

    const vendorColumns: ColumnDefinition<IVendor>[] = [
      { key: "name", header: "Name" },
      { key: "email", header: "Email" },
      { key: "phone", header: "Phone" },
      { key: "status", header: "Status", className: "text-center" },
    ]

    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-muted/40">
          <AppSidebar />
          <div className="flex flex-col flex-1 p-6">
            <ReusableTable<IVendor>
              data={vendors}
              loading={isLoading}
              updatingItems={new Set<string>()}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              searchTerm={searchTerm}
              onSearchTermChange={handleSearchInputChange}
              onSearchKeyPress={handleSearchKeyPress}
              onSearchClick={() => setCurrentPage(1)}
              onBlockUnblockClick={handleBlockUserClick}
              confirmDialog={confirmDialog}
              onConfirmAction={handleConfirmAction}
              onCancelAction={handleCancelAction}
              entityType="vendor"
              columns={vendorColumns}
              onRequestVendorClick={handleRequestedVendorsClick}
            />
          </div>
        </div>
      </SidebarProvider>
    )
  }

  export default VendorManagementPage