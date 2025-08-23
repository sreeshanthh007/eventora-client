
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/pages/ui/dialog"
import { Button } from "@/components/pages/ui/button"
import { Badge } from "@/components/pages/ui/badge"
import { CheckCircle, Clock, Users, Shield, RefreshCw } from "lucide-react"

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void,
  rejectReason:string
  onReVerify?: () => void 
  userName?: string
  submissionDate?: string
  status?: string
}

export function CheckVerifiedModal({
  isOpen,
  onClose,
  onReVerify, 
  userName = "User",
  submissionDate,
  rejectReason,
  status,
}: VerificationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>

          <DialogTitle className="text-xl font-semibold">Verification {status}</DialogTitle>

          <DialogDescription className="text-base leading-relaxed">
            {status === "approved" ? (
              <>Congratulations, {userName}! Your account has been successfully verified.</>
            ) : status === "rejected" ? (
              <>
                Don't worry, {userName}! Verification rejections are common and often due to minor issues. You can
                easily resubmit your documents with any necessary corrections.
              </>
            ) : (
              <>
                Thank you for your submission, {userName}. Our team is currently reviewing your information to ensure
                everything meets our standards.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            {status !== "approved" && (
              <>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="font-medium text-sm">Review Timeline</p>
                    <p className="text-sm text-muted-foreground">Typically 1-3 business days</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Our Verification Team</p>
                    <p className="text-sm text-muted-foreground">Expert reviewers ensuring quality</p>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-sm">Next Steps</p>
                <p className="text-sm text-muted-foreground">
                  {status === "approved"
                    ? "You can now access all vendor features."
                    : status === "rejected"
                      ? // Updated rejected next steps with more helpful guidance
                        "Review any feedback provided, update your documents, and resubmit for verification."
                      : "You'll receive an email notification once the review is complete."}
                </p>
              </div>
            </div>
          </div>

          {status === "rejected" && (
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-sm text-blue-900 dark:text-blue-100 mb-2">
                 reason for rejection:
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• {rejectReason}</li>
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-muted-foreground">Submitted on {submissionDate}</span>
            <Badge
              variant="secondary"
              className={
                status === "pending"
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                  : status === "approved"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
              }
            >
              {status}
            </Badge>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
            Close
          </Button>
          {status === "rejected" && onReVerify ? (
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={onReVerify}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Send Re-verification
            </Button>
          ) : (
            <Button className="flex-1" onClick={onClose}>
              Got it
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
