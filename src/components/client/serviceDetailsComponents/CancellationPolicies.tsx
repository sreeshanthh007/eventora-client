import { useState } from "react"
import { Card } from "@/components/pages/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"

interface CancellationPoliciesProps {
  policies: string[]
}

export default function CancellationPolicies({ policies }: CancellationPoliciesProps) {
  const [activeTab, setActiveTab] = useState<"cancellation" | "refund">("cancellation")

  // Parse policies; assuming they are simple strings, map to structured data
  const cancellationPoliciesData = policies.map(policy => {
    if (policy.includes("Full refund")) {
      return {
        timeframe: "Before 7 days",
        status: "Full Refund",
        description: policy,
        icon: CheckCircle,
        color: "text-green-600",
      }
    } else if (policy.includes("50% refund")) {
      return {
        timeframe: "3-7 days before",
        status: "50% Refund",
        description: policy,
        icon: AlertCircle,
        color: "text-orange-600",
      }
    } else {
      return {
        timeframe: "Less than 3 days",
        status: "No Refund",
        description: policy,
        icon: AlertCircle,
        color: "text-red-600",
      }
    }
  })

  const refundProcess = [
    {
      step: 1,
      title: "Submit Cancellation Request",
      description: "Contact the provider or use the cancellation option in your booking to submit a request.",
    },
    {
      step: 2,
      title: "Confirmation",
      description: "You will receive a confirmation email with cancellation details and refund amount.",
    },
    {
      step: 3,
      title: "Processing",
      description: "Refunds are processed within 5-7 business days to your original payment method.",
    },
    {
      step: 4,
      title: "Completion",
      description: "You will receive a confirmation once the refund has been successfully processed.",
    },
  ]

  return (
    <Card className="p-8 bg-card border border-border">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Cancellation & Refund Policy</h2>
          <p className="text-muted-foreground">Understand our cancellation and refund procedures</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("cancellation")}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "cancellation"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Cancellation Policy
          </button>
          <button
            onClick={() => setActiveTab("refund")}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "refund"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Refund Process
          </button>
        </div>

        {/* Cancellation Policy Tab */}
        {activeTab === "cancellation" && (
          <div className="space-y-4">
            {cancellationPoliciesData.map((policy, index) => {
              const IconComponent = policy.icon
              return (
                <div key={index} className="p-4 border border-border/50 rounded-lg bg-muted/20">
                  <div className="flex items-start gap-4">
                    <IconComponent size={24} className={`${policy.color} flex-shrink-0 mt-1`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground">{policy.timeframe}</h3>
                        <span className={`text-sm font-bold ${policy.color}`}>{policy.status}</span>
                      </div>
                      <p className="text-sm text-foreground/80">{policy.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Refund Process Tab */}
        {activeTab === "refund" && (
          <div className="space-y-4">
            {refundProcess.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  {item.step < refundProcess.length && <div className="w-1 h-12 bg-primary/30 mt-2"></div>}
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-foreground/80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm text-foreground/80">
            For any questions about cancellations or refunds, please contact the provider directly. They will be happy
            to assist you.
          </p>
        </div>
      </div>
    </Card>
  )
}