export const getServiceStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "upcoming":
      return "bg-blue-100 text-blue-800"
    case "in progress":
      return "bg-yellow-100 text-yellow-800"
    case "pending":
      return "bg-orange-100 text-orange-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}