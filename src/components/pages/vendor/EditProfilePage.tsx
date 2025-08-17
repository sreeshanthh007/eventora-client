
// import { VendorFooter } from "@/components/mainComponents/VendorFooter"
// import { VendorEditForm } from "@/components/vendor/VendorEditProfile"
// import { VendorHeader } from "@/components/vendor/VendorHeader"
// import { VendorSidebar } from "@/components/vendor/VendorSidebar"
// import type { RootState } from "@/store/store"
// import { useState } from "react"
// import { useSelector } from "react-redux"



// export default function EditProfilePage() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//     const vendor = useSelector((state:RootState)=>state.vendor.vendor)


//   const handleSave = (vendorData: any) => {
//     console.log("Saving vendor data:", vendorData)
//     alert("Vendor data saved successfully!")
//   }

//   const handleCancel = () => {
//     console.log("Edit cancelled")
//     alert("Edit cancelled")
//   }

//   const handleMenuClick = () => {
//     setIsSidebarOpen(!isSidebarOpen)
//   }

//   const handleSidebarLinkClick = () => {
//     setIsSidebarOpen(false)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <VendorHeader onMenuClick={handleMenuClick} />

//       <div className="flex flex-1">
//         <aside
//           className={`fixed lg:static inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out ${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//           } lg:block`}
//         >
//           <div className="h-screen pt-16 lg:pt-4 p-4">
//             <VendorSidebar onLinkClick={handleSidebarLinkClick} />
//           </div>
//         </aside>

//         {isSidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//             onClick={() => setIsSidebarOpen(false)}
//           />
//         )}

//         <main className="flex-1 lg:ml-4 p-4">
//           <div className="max-w-4xl mx-auto">
//             <VendorEditForm vendor={vendor} onSave={handleSave} onCancel={handleCancel} isLoading={false} />
//           </div>
//         </main>
//       </div>

//       <VendorFooter />
//     </div>
//   )
// }
