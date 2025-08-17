
import type * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/pages/ui/table"
import { Pagination } from "@/components/common/paginations/Pagination"
import { ConfirmDialog } from "@/components/common/popups/ConfirmationPopup"
import { Button } from "@/components/pages/ui/button"
import { Card } from "@/components/pages/ui/card"
import { Input } from "@/components/pages/ui/input"
import { useLocation } from "react-router-dom"

interface CategoryItem {
  _id: string
  categoryId: string
  title: string
  image: string
  status: string
  createdAt: string
  updatedAt: string
  [key: string]: unknown
}

export interface CategoryColumnDefinition<T extends CategoryItem> {
  key: keyof T | string
  header: string
  render?: (item: T) => React.ReactNode
  className?: string
}

interface CategoryTableProps<T extends CategoryItem> {
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
  onEditClick?: (item: T) => void
  confirmDialog: {
    isOpen: boolean
    item: T | null
    action: "block" | "unblock"
  }
  onConfirmAction: () => void
  onCancelAction: () => void
  columns: CategoryColumnDefinition<T>[]
  showActionsColumn?: boolean
  onAddCategoryClick?: () => void
  onRequestCategoryClick?: () => void
}

export function CategoryTable<T extends CategoryItem>({
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
  onEditClick,
  confirmDialog,
  onConfirmAction,
  onCancelAction,
  columns,
  showActionsColumn = true,
  onAddCategoryClick,
  onRequestCategoryClick,
}: CategoryTableProps<T>) {
  const location = useLocation()

  return (
    <Card className="w-full">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h1 className="text-3xl font-bold">Category Management</h1>

          <div className="flex gap-2">
            {onAddCategoryClick && (
              <Button onClick={onAddCategoryClick} variant="outline" className="bg-black text-white">
                Add Category
              </Button>
            )}
            {onRequestCategoryClick && (
              <Button onClick={onRequestCategoryClick} variant="outline" className="bg-black text-white">
                Requested Categories
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <Input
            type="text"
            placeholder="Search by category name or email"
            className="w-full max-w-sm"
            value={searchTerm}
            onChange={onSearchTermChange}
            onKeyUp={onSearchKeyPress}
          />
          <Button onClick={onSearchClick}>Search</Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading categories...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-8">
            {searchTerm ? "No categories found matching your search" : "No categories found"}
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
                  {showActionsColumn && (onBlockUnblockClick || onEditClick) && (
                    <TableHead className="text-center">Actions</TableHead>
                  )}
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
                    {showActionsColumn && (onBlockUnblockClick || onEditClick) && (
                      <TableCell className="text-center">
                        <div className="flex gap-2 justify-center">
                          {onEditClick && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onEditClick(item)}
                              className="bg-black text-white hover:bg-blue-600"
                            >
                              Edit
                            </Button>
                          )}
                          {onBlockUnblockClick && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => onBlockUnblockClick(item)}
                              disabled={updatingItems.has(item._id)}
                            >
                              {updatingItems.has(item._id)
                                ? "Updating..."
                                : item.status === "active"
                                  ? "Block"
                                  : "Unblock"}
                            </Button>
                          )}
                        </div>
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
        title={confirmDialog.action === "block" ? "Block category" : "Unblock category"}
        description={`Are you sure you want to ${confirmDialog.action} category "${confirmDialog.item?.title}"? ${
          confirmDialog.action === "block"
            ? "This will prevent it from being displayed."
            : "This will restore its visibility."
        }`}
        confirmLabel={confirmDialog.action === "block" ? "Block category" : "Unblock category"}
        confirmColor={confirmDialog.action === "block" ? "red" : "green"}
      />
    </Card>
  )
}
