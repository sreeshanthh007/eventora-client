export  const getAllowedStatuses = (currentStatus: string) => {
    switch (currentStatus) {
      case "upcoming":
        return ["upcoming", "cancelled", "ongoing", "completed"];
      case "cancelled":
        return ["cancelled"];
      case "ongoing":
        return ["ongoing", "completed"]; 
      case "completed":
        return ["completed"];
      default:
        return ["upcoming", "cancelled", "ongoing", "completed"];
    }
  };