// ClientManagementPage.tsx - Enhanced version
import React, { useEffect, useState } from "react"
import { AppSidebar } from "@/components/mainComponents/AdminSidebar"
import { SidebarProvider } from "../ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { getAllClients, updateUserStatus } from "@/services/admin/adminService"

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

  const fetchClients = async () => {
    setLoading(true)
    try {
      const response = await getAllClients({
        page: 1,
        limit: 100,
        search: ""
      })
      console.log(response)
      setClients(response.clients) 
    } catch (error) {
      console.error("Error fetching clients:", error)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleBlockUser = async (client: IClient) => {

    if (updatingUsers.has(client._id)) {
      return
    }

    setUpdatingUsers(prev => new Set(prev).add(client._id))
    
    try {
      const newStatus = client.status === "active" ? "blocked" : "active"
      
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
        
       
        console.log(`User ${client.name} status updated to ${newStatus}`)
      } else {
        throw new Error(response.message || 'Failed to update user status')
      }
    } catch (error) {
      console.error("Error updating user status:", error)
      
    
      alert(`Failed to update user status: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUpdatingUsers(prev => {
        const newSet = new Set(prev)
        newSet.delete(client._id)
        return newSet
      })
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
                onClick={() => handleBlockUser(client)}
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
              
              {loading ? (
                <div className="text-center py-8">Loading clients...</div>
              ) : clients.length === 0 ? (
                <div className="text-center py-8">No clients found</div>
              ) : (
                <div className="overflow-x-auto">
                  {renderClientTable()}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default ClientManagementPage