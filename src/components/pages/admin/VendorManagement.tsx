
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
import { getAllVendors, updateVendorStatus } from "@/services/admin/adminService"

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

  const fetchVendors = async () => {
    setLoading(true)
    try {
      const response = await getAllVendors({
        page: 1,
        limit: 100,
        search: ""
      })
      console.log(response)
      setVendors(response.vendors) 
    } catch (error) {
      console.error("Error fetching vendors:", error)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVendors()
  }, [])

  const handleBlockUser = async (vendor: IVendor) => {

    if (updatingUsers.has(vendor._id)) {
      return
    }

    setUpdatingUsers(prev => new Set(prev).add(vendor._id))
    
    try {
      const newStatus = vendor.status === "active" ? "blocked" : "active"
      
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
        
       
        console.log(`Vendor ${vendor.name} status updated to ${newStatus}`)
      } else {
        throw new Error(response.message || 'Failed to update vendor status')
      }
    } catch (error) {
      console.error("Error updating vendor status:", error)
      
    
      alert(`Failed to update vendor status: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUpdatingUsers(prev => {
        const newSet = new Set(prev)
        newSet.delete(vendor._id)
        return newSet
      })
    }
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
                onClick={() => handleBlockUser(vendor)}
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
              
              {loading ? (
                <div className="text-center py-8">Loading vendors...</div>
              ) : vendors.length === 0 ? (
                <div className="text-center py-8">No vendors found</div>
              ) : (
                <div className="overflow-x-auto">
                  {renderVendorTable()}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default VendorManagementPage