import { Card } from "@/components/pages/ui/card"

interface ServiceDescriptionProps {
  description: string
}

export default function ServiceDescription({ description }: ServiceDescriptionProps) {
  return (
    <Card className="p-8 bg-card border border-border">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-3">About This Service</h2>
          <p className="text-foreground/80 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Card>
  )
}