

export const getPaymentStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
    case "successfull":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-orange-100 text-orange-800"
    case "failed":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}