import { Card } from "@/components/pages/ui/card"
import { Star } from "lucide-react"

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      author: "Sarah Mitchell",
      rating: 5,
      date: "2 weeks ago",
      text: "Exceptional work! John delivered a stunning website that exceeded all our expectations. Highly professional and responsive throughout the project.",
      avatar: "SM",
    },
    {
      id: 2,
      author: "Michael Chen",
      rating: 5,
      date: "1 month ago",
      text: "Outstanding designer. The attention to detail and creative solutions were impressive. Would definitely work with him again.",
      avatar: "MC",
    },
    {
      id: 3,
      author: "Emma Rodriguez",
      rating: 4,
      date: "2 months ago",
      text: "Great communication and quality work. The design perfectly captured our brand vision. Minor revisions were handled quickly.",
      avatar: "ER",
    },
  ]

  return (
    <Card className="p-8 bg-card border border-border">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Client Reviews</h2>
          <p className="text-muted-foreground">Trusted by 128+ satisfied clients</p>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{review.author}</h4>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
