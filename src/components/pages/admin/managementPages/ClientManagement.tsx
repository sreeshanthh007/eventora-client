
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/mainComponents/AdminSidebar"
import { useToast } from "@/hooks/ui/UseToaster"
import { SidebarProvider } from "../../ui/sidebar"
import { useDebounce } from "@/hooks/services/UseDebounce"
import { ReusableTable } from "@/components/common/tables/ReusableTable"
import { type ColumnDefinition } from "@/components/common/tables/ReusableTable"
import { useGetAllClients } from "@/hooks/admin/UseAllClients"
import { useUpdateUserMutation } from "@/hooks/admin/UseUpdateUserStatus"

interface IClient {
  _id: string
  name: string
  email: string
  status: string
}

const ClientManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [currentPage, setCurrentPage] = useState(1)
  const [clients, setClients] = useState<IClient[]>([])

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    item: IClient | null
    action: "block" | "unblock" // Fixed: changed "blocked" to "block"
  }>({
    isOpen: false,
    item: null,
    action: "block" // Fixed: changed "blocked" to "block"
  })

  const limit = 10
  const { showToast } = useToast()

  const { mutateAsync: updateUserStatus } = useUpdateUserMutation()

  const { data, isLoading, isError, error } = useGetAllClients({
    page: currentPage,
    limit,
    search: debouncedSearchTerm,
  })

  const totalPages = data?.totalPages || 1

  useEffect(() => {
    if (data?.clients) {
      setClients(data.clients)
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      showToast(error?.message || "Failed to fetch clients", "error")
    }
  }, [isError, error, showToast])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  const handleBlockUserClick = (client: IClient) => {
 
    const action = client.status === "active" ? "block" : "unblock"

    
    setConfirmDialog({
      isOpen: true,
      item: client,
      action
    })
  }

  const handleConfirmAction = async () => {
    const { item, action } = confirmDialog
    if (!item) return

    try {
      const newStatus = action === "block" ? "blocked" : "active"
      
      const response = await updateUserStatus({
        userId: item._id,
        status: newStatus
      });

      if (response.success) {
        setClients(prevClients =>
          prevClients.map(c =>
            c._id === item._id ? { ...c, status: newStatus } : c
          )
        )
        
        setConfirmDialog({
          isOpen: false,
          item: null,
          action: "block"
        })
      }
    } catch (error) {
      showToast("Failed to update client status", "error")
    }
  }

  const handleCancelAction = () => {
    setConfirmDialog({
      isOpen: false,
      item: null,
      action: "block"
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

  const clientColumns: ColumnDefinition<IClient>[] = [
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
          <ReusableTable<IClient>
            data={clients}
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
            entityType="client"
            columns={clientColumns}
          />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default ClientManagementPage