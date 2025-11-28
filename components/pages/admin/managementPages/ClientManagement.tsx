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
import { Card } from "../../ui/card"
import { Button } from "../../ui/button"
import { getAllClients, updateUserStatus } from "@/services/admin/adminService"
import { Pagination } from "@/components/common/paginations/Pagination"
import { ConfirmDialog } from "@/components/common/popups/ConfirmationPopup"

interface IClient {
  _id: string
  clientId: string
  name: string
  email: string
  role: string
  phone: string
  status: string
  createdAt: string
  updatedAt: string
}

const ClientManagementPage = () => {
  const [clients, setClients] = useState<IClient[]>([])
  const [loading, setLoading] = useState(false)
  const [updatingUsers, setUpdatingUsers] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("") // Add search state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("") // Add debounced search
  const limit = 10

  const {showToast} = useToast()
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    client: IClient | null
    action: 'block' | 'unblock'
  }>({
    isOpen: false,
    client: null,
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

  const fetchClients = async () => {
    setLoading(true)
    try {
      const response = await getAllClients({
        page: currentPage,
        limit,
        search: debouncedSearchTerm // Use debounced search term
      })
  
      setClients(response.clients) 
      setTotalPages(response.totalPages)
    } catch (error) {
      console.error("Error fetching clients:", error)
      showToast("Error fetching clients", "error")
    } finally {
      setLoading(false)
    }
  }

  // Refetch when currentPage or debouncedSearchTerm changes
  useEffect(() => {
    fetchClients()
  }, [currentPage, debouncedSearchTerm])

  const handleBlockUserClick = (client: IClient) => {
    if (updatingUsers.has(client._id)) {
      return
    }

    const action = client.status === "active" ? "block" : "unblock"
    setConfirmDialog({
      isOpen: true,
      client,
      action
    })
  }

  const handleConfirmAction = async () => {
    const { client, action } = confirmDialog
    
    if (!client) return

    setUpdatingUsers(prev => new Set(prev).add(client._id))
    
    try {
      const newStatus = action === "block" ? "blocked" : "active"
      
      const response = await updateUserStatus({
        userId: client._id,
        status: newStatus
      })

      if (response.success) {
        setClients((prev) =>
          prev.map((c) =>
            c._id === client._id ? { ...c, status: newStatus } : c
          )
        )
        confirmDialog.action === "block" 
          ? showToast(`User ${client.name} blocked successfully`, "success") 
          : showToast(`User ${client.name} unblocked successfully`, "success")
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      console.error("Error updating user status:", error)
      showToast("Error updating user status", "error")
    } finally {
      setUpdatingUsers(prev => {
        const newSet = new Set(prev)
        newSet.delete(client._id)
        return newSet
      })
      setConfirmDialog({
        isOpen: false,
        client: null,
        action: 'block'
      })
    }
  }

  const handleCancelAction = () => {
    setConfirmDialog({
      isOpen: false,
      client: null,
      action: 'block'
    })
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

  const renderClientTable = () => (
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
        {clients.map((client) => (
          <TableRow key={client._id}>
            <TableCell>
              <p>{client.name}</p>
            </TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell className="text-center">
              <span className={`px-2 py-1 rounded-full text-xs ${
                client.status === "active" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {client.status}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleBlockUserClick(client)}
                disabled={updatingUsers.has(client._id)}
              >
                {updatingUsers.has(client._id) 
                  ? "Updating..." 
                  : client.status === "active" 
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
              <h1 className="text-3xl font-bold">Client Management</h1>
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
                <div className="text-center py-8">Loading clients...</div>
              ) : clients.length === 0 ? (
                <div className="text-center py-8">
                  {debouncedSearchTerm ? "No clients found matching your search" : "No clients found"}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  {renderClientTable()}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
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
        title={confirmDialog.action === "block" ? "Block User" : "Unblock User"}
        description={`Are you sure you want to ${confirmDialog.action} user "${confirmDialog.client?.name}"? ${
          confirmDialog.action === "block"
            ? "This will prevent them from accessing their account."
            : "This will restore their access to the account."
        }`}
        confirmLabel={confirmDialog.action === "block" ? "Block User" : "Unblock User"}
        confirmColor={confirmDialog.action === "block" ? "red" : "green"}
      />
    </SidebarProvider>
  )
}

export default ClientManagementPage