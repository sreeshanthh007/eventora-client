export function VendorFooter() {
  return (
    <footer className="border-t bg-muted/50 py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary font-serif">EVENTORA</span>
            <span className="text-sm text-muted-foreground">Your premier event management platform</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-foreground transition-colors">
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Eventora. All rights reserved. Built with passion for amazing events.</p>
        </div>
      </div>
    </footer>
  )
}
