

export const getTicketTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "vip":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "General":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "standard":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}