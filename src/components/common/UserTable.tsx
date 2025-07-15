import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../pages/ui/table"
import { Button } from "../pages/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../pages/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export type UserBase = {
  id: string
  name: string
  email: string
  role: string
  status: string
}

interface UserTableProps {
  users: UserBase[]
  onEdit: (user: UserBase) => void
  onDelete: (id: string) => void
  onToggleBlock: (user: UserBase) => void
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete, onToggleBlock }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="hidden md:table-cell">Role</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="hidden md:table-cell">{user.role}</TableCell>
            <TableCell className="hidden md:table-cell">
              <span className={`px-2 py-1 rounded-full text-xs ${
                user.status === "Active" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {user.status}
              </span>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEdit(user)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onToggleBlock(user)}>
                    {user.status === "Active" ? "Block" : "Unblock"}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(user.id)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UserTable