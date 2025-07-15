
import { Input } from '../pages/ui/input'
import { Button } from '../pages/ui/button'

export const VendorFooter = () => {
  return (
     <footer className="bg-black text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Exclusive */}
            <div>
              <h3 className="font-bold text-lg mb-4">EXCLUSIVE</h3>
              <p className="text-sm mb-4">SUBSCRIBE</p>
              <p className="text-sm mb-4">Get 10% off your first order</p>
              <div className="flex">
                <Input
                  placeholder="Enter your email"
                  className="bg-transparent border-white text-white placeholder:text-gray-400"
                />
                <Button variant="ghost" size="icon" className="text-white">
                  →
                </Button>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-4">SUPPORT</h3>
              <div className="space-y-2 text-sm">
                <p>111 Bijoy sarani, Dhaka,</p>
                <p>DH 1515, Bangladesh.</p>
                <p>exclusive@gmail.com</p>
                <p>+88015-88888-9999</p>
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="font-bold text-lg mb-4">ACCOUNT</h3>
              <div className="space-y-2 text-sm">
                <p>My Account</p>
                <p>Login / Register</p>
                <p>Cart</p>
                <p>Wishlist</p>
                <p>Shop</p>
              </div>
            </div>

            {/* Quick Link */}
            <div>
              <h3 className="font-bold text-lg mb-4">QUICK LINK</h3>
              <div className="space-y-2 text-sm">
                <p>Privacy Policy</p>
                <p>Terms Of Use</p>
                <p>FAQ</p>
                <p>Contact</p>
              </div>
            </div>

            {/* Download App */}
            <div>
              <h3 className="font-bold text-lg mb-4">DOWNLOAD APP</h3>
              <p className="text-sm mb-4">Save $3 with App New User Only</p>
              <div className="flex gap-2 mb-4">
                <div className="w-20 h-20 bg-white rounded"></div>
                <div className="space-y-2">
                  <div className="w-24 h-8 bg-white rounded"></div>
                  <div className="w-24 h-8 bg-white rounded"></div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-white rounded"></div>
                <div className="w-6 h-6 bg-white rounded"></div>
                <div className="w-6 h-6 bg-white rounded"></div>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-400">
            © Copyright Rimel 2022. All right reserved
          </div>
        </div>
      </footer>
  )
}
