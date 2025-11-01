import { useState } from "react"
import { Card } from "@/components/pages/ui/card"
import { ChevronDown } from "lucide-react"

interface TermsAndConditionsProps {
  terms: string[]
}

export default function TermsAndConditions({ terms }: TermsAndConditionsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // Simple mapping; adjust if terms have structured data
  const termItems = terms.map((term, index) => ({
    title: `Term ${index + 1}`,
    content: term
  }))

  return (
    <Card className="p-8 bg-card border border-border">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Terms & Conditions</h2>
          <p className="text-muted-foreground">Please review our service terms before booking</p>
        </div>

        <div className="space-y-3">
          {termItems.map((term, index) => (
            <div key={index} className="border border-border/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors bg-muted/20"
              >
                <h3 className="font-semibold text-foreground text-left">{term.title}</h3>
                <ChevronDown
                  size={20}
                  className={`text-muted-foreground transition-transform flex-shrink-0 ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedIndex === index && (
                <div className="px-6 py-4 bg-background border-t border-border/50">
                  <p className="text-sm text-foreground/80 leading-relaxed">{term.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <p className="text-sm text-foreground/80">
            By booking this service, you agree to these terms and conditions. For questions or clarifications, please
            contact the provider directly.
          </p>
        </div>
      </div>
    </Card>
  )
}