"use client"

import type * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/pages/ui/table"
import { Pagination } from "@/components/common/paginations/Pagination"
import { ConfirmDialog } from "@/components/common/popups/ConfirmationPopup"
import { Button } from "@/components/pages/ui/button"
import { Card } from "@/components/pages/ui/card"
import { Input } from "@/components/pages/ui/input"

interface TableItem {
  _id: string
  name: string
  status: string
  [key: string]: unknown
}

export interface ColumnDefinition<T extends TableItem> {
  key: keyof T | string
  header: string
  render?: (item: T) => React.ReactNode
  className?: string
}

interface UserManagementTableProps<T extends TableItem> {
  data: T[]
  loading: boolean
  updatingItems: Set<string>
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  searchTerm: string
  onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearchKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onSearchClick: () => void
  onBlockUnblockClick?: (item: T) => void
  confirmDialog: {
    isOpen: boolean
    item: T | null
    action: "block" | "unblock"
  }
  onConfirmAction: () => void
  onCancelAction: () => void
  entityType: string
  columns: ColumnDefinition<T>[]
  showActionsColumn?: boolean
  onRequestVendorClick?: () => void
}

export function  ReusableTable<T extends TableItem>({
  data,
  loading,
  updatingItems,
  currentPage,
  totalPages,
  onPageChange,
  searchTerm,
  onSearchTermChange,
  onSearchKeyPress,
  onSearchClick,
  onBlockUnblockClick,
  confirmDialog,
  onConfirmAction,
  onCancelAction,
  entityType,
  columns,
  showActionsColumn = true,
  onRequestVendorClick,
}: UserManagementTableProps<T>) {
  return (
    <Card className="w-full">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h1 className="text-3xl  font-serif">
            {`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} Management`}
          </h1>
          {entityType === "vendor" && onRequestVendorClick && (
            <div className="flex gap-2">
              <Button onClick={onRequestVendorClick} variant="outline" className="bg-black text-white">
                Requested Vendors
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <Input
            type="text"
            placeholder={`Search by ${entityType} name or email`}
            className="w-full max-w-sm"
            value={searchTerm}
            onChange={onSearchTermChange}
            onKeyUp={onSearchKeyPress}
          />
          <Button onClick={onSearchClick}>Search</Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading {entityType}s...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-8">
            {searchTerm ? `No ${entityType}s found matching your search` : `No ${entityType}s found`}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key as string} className={column.className}>
                      {column.header}
                    </TableHead>
                  ))}
                  {showActionsColumn && onBlockUnblockClick && <TableHead className="text-center">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item._id}>
                    {columns.map((column) => (
                      <TableCell key={`${item._id}-${column.key as string}`} className={column.className}>
                        {column.render ? column.render(item) : (item[column.key as keyof T] as React.ReactNode)}
                      </TableCell>
                    ))}
                    {showActionsColumn && onBlockUnblockClick && (
                      <TableCell className="text-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onBlockUnblockClick(item)}
                          disabled={updatingItems.has(item._id)}
                        >
                          {updatingItems.has(item._id) ? "Updating..." : item.status === "active" ? "Block" : "Unblock"}
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmDialog.isOpen}
        onCancel={onCancelAction}
        onConfirm={onConfirmAction}
        title={confirmDialog.action === "block" ? `Block ${entityType}` : `Unblock ${entityType}`}
        description={`Are you sure you want to ${confirmDialog.action} ${entityType} "${confirmDialog.item?.name}"? ${
          confirmDialog.action === "block"
            ? "This will prevent them from accessing their account."
            : "This will restore their access to the account."
        }`}
        confirmLabel={confirmDialog.action === "block" ? `Block ${entityType}` : `Unblock ${entityType}`}
        confirmColor={confirmDialog.action === "block" ? "red" : "green"}
      />
    </Card>
  )
}
