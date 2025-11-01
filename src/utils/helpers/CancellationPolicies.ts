  export const cancellationPolicyOptions = [
    {
      value: "24-hour-full-refund",
      label: "24 Hour Notice - Full Refund",
      description: "Full refund if cancelled 24 hours before service. No refund for cancellations within 24 hours.",
    },
    {
      value: "48-hour-full-refund",
      label: "48 Hour Notice - Full Refund",
      description:
        "Full refund if cancelled 48 hours before service. 50% refund if cancelled within 24-48 hours. No refund within 24 hours.",
    },
    {
      value: "72-hour-tiered",
      label: "72 Hour Tiered Policy",
      description:
        "Full refund if cancelled 72+ hours before. 75% refund 48-72 hours before. 50% refund 24-48 hours before. No refund within 24 hours.",
    },
    {
      value: "week-notice",
      label: "1 Week Notice Required",
      description:
        "Full refund if cancelled 7+ days before service. 50% refund if cancelled 3-7 days before. No refund within 3 days.",
    },
    {
      value: "non-refundable-deposit",
      label: "Non-Refundable Deposit",
      description:
        "50% deposit is non-refundable upon booking. Remaining balance refundable up to 48 hours before service.",
    },
    {
      value: "flexible-policy",
      label: "Flexible Cancellation",
      description:
        "Full refund available up to 12 hours before service start time. Emergency cancellations considered case-by-case.",
    },
  ];