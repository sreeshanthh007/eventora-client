  import { AppSidebar } from "@/components/mainComponents/AdminSidebar";

  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/pages/ui/breadcrumb";
  import { SidebarProvider } from "@/components/pages/ui/sidebar";
  import { AddCategoryForm } from "@/components/admin/AddCategoryPages";
  import { UseAddCategoryMutation } from "@/hooks/admin/UseAddCagegory";
  import type { ICategory } from "@/types/User";
  import { uploadImageToCloudinarySigned } from "@/services/cloudinary/cloudinary";
  import { useToast } from "@/hooks/ui/UseToaster";

  export const AddCategoryPage = () => {
    const { showToast } = useToast();
    const { mutate: categoryAdd } = UseAddCategoryMutation();

    const addCategory = async (data: ICategory) => {
      console.log("data is",data)
      let uploadImageUrl: string | null = null;

      if (data.image instanceof File) {
        uploadImageUrl = await uploadImageToCloudinarySigned(
          data.image as File,
          "category-images"
        );

        if (!uploadImageUrl) {
          showToast("failed to upload", "error");
          return;
        }
      }

      categoryAdd(
        { ...data, image: uploadImageUrl || "" },
      );
    };

    
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-muted/40">
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink to="/admin/dashboard">Admin</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink to="/admin/category">Category</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Add Category</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 items-center justify-center">
              <AddCategoryForm onSubmit={addCategory} />
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  };
