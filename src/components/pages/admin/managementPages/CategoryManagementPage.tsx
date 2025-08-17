  "use client"

  import type React from "react"

  import { useEffect, useState } from "react"
  import { AppSidebar } from "@/components/mainComponents/AdminSidebar"
  import { useToast } from "@/hooks/ui/UseToaster"
  import { useDebounce } from "@/hooks/services/UseDebounce"
  import { CategoryTable , type CategoryColumnDefinition } from "@/components/admin/CategoryTable"
  import { SidebarProvider } from "../../ui/sidebar"
  import { useNavigate } from "react-router-dom"
  import { useGetAllCategory } from "@/hooks/admin/UseAllCategory"
  import { useUpdateCategoryMutation } from "@/hooks/admin/UseUpdateCategoryStatus"
  import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"

  interface ICategory {
    _id: string
    categoryId: string
    title: string
    image: string
    status: string
    createdAt: string
    updatedAt: string
  }

  const CategoryManagementPage = () => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm, 300)
    const navigate = useNavigate()
    const limit = 10
    const { showToast } = useToast()

    const [confirmDialog, setConfirmDialog] = useState<{
      isOpen: boolean
      item: ICategory | null
      action: "block" | "unblock"
    }>({
      isOpen: false,
      item: null,
      action: "block",
    })

    const { data, isLoading, isError, error } = useGetAllCategory({
      page: currentPage,
      limit,
      search: debouncedSearchTerm,
    })

    const { mutateAsync: updateCategoryStatus } = useUpdateCategoryMutation()

    useEffect(() => {
      if (data?.category) {
        setCategories(data.category)
        console.log(data)
      }
    }, [data])

    const totalPages = data?.totalPages || 1;

    useEffect(() => {
      if (isError) {
        showToast(error?.message || "Failed to fetch categories", "error")
      }
    }, [isError, error, showToast])

    useEffect(() => {
      setCurrentPage(1)
    }, [debouncedSearchTerm])

    const handleBlockUnblockClick = (category: ICategory) => {
      if (updatingItems.has(category._id)) {
        return
      }
      const action = category.status === "active" ? "block" : "unblock"
      setConfirmDialog({
        isOpen: true,
        item: category,
        action,
      })
    }

    const handleEditClick = (category: ICategory) => {
      navigate(`/admin/editCategory/${category._id}`)
    }

    const handleConfirmAction = async () => {
      const { item, action } = confirmDialog
      if (!item) return
      setUpdatingItems((prev) => new Set(prev).add(item._id))

      try {
        const newStatus = action === "block" ? "blocked" : "active"
        const res = await updateCategoryStatus({
          categoryId: item._id,
          status: newStatus,
        })
        if (res?.success) {
          setCategories((categories) => categories.map((c) => (c._id === item._id ? { ...c, status: newStatus } : c)))
        }
      } catch (err) {
        showToast("Error updating category status", "error")
      } finally {
        setUpdatingItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(item._id)
          return newSet
        })
        setConfirmDialog({
          isOpen: false,
          item: null,
          action: "block",
        })
      }
    }

    const handleCancelAction = () => {
      setConfirmDialog({
        isOpen: false,
        item: null,
        action: "block",
      })
    }

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

    const handleAddCategoryClick = () => {
      navigate("/admin/addCategory")
    }

    const handleRequestedCategoryClick = () => {
      showToast("Requested Categories button clicked!", "info")
    }

    const categoryColumns: CategoryColumnDefinition<ICategory>[] = [
      { key: "categoryId", header: "Category ID" },
      {
        key: "image",
        header: "Image",
        className: "w-16",
        render: (item: ICategory) => (
          <img
            src={item.image ? getCloudinaryImageUrl(item.image) : "/placeholder.svg"}
            alt={item.title}
            className="w-10 h-10 object-cover rounded-md"
          />
        ),
      },
      { key: "title", header: "Title" },
      { key: "status", header: "Status", className: "text-center" },
    ]

    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-muted/40">
          <AppSidebar />
          <div className="flex flex-col flex-1 p-6">
            <CategoryTable<ICategory>
              data={categories}
              loading={isLoading}
              updatingItems={updatingItems}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              searchTerm={searchTerm}
              onSearchTermChange={handleSearchInputChange}
              onSearchKeyPress={handleSearchKeyPress}
              onSearchClick={handleSearchClick}
              onBlockUnblockClick={handleBlockUnblockClick}
              onEditClick={handleEditClick}
              confirmDialog={confirmDialog}
              onConfirmAction={handleConfirmAction}
              onCancelAction={handleCancelAction}
              columns={categoryColumns}
              showActionsColumn={true}
              onAddCategoryClick={handleAddCategoryClick}
              onRequestCategoryClick={handleRequestedCategoryClick}
            />
          </div>
        </div>
      </SidebarProvider>
    )
  }

  export default CategoryManagementPage
