import React from 'react'
import { ShoppingBag, Phone, Facebook, Menu, X } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
  currentPage: string
  onNavigate: (page: string) => void
  onAdminLogin: () => void
}

export default function Layout({ children, currentPage, onNavigate, onAdminLogin }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navigation = [
    { name: 'Home', href: 'home' },
    { name: 'IPTV', href: 'iptv' },
    { name: 'Android Boxes', href: 'android-boxes' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
              <ShoppingBag className="h-8 w-8 text-blue-600 mr-2" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">TechsatWassim TN</h1>
                <p className="text-sm text-gray-600">Gafsa, Tunisia</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.href)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.href
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Admin Login Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onAdminLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Admin Panel
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2 pt-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      onNavigate(item.href)
                      setMobileMenuOpen(false)
                    }}
                    className={`text-left px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      currentPage === item.href
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Store Info */}
            <div>
              <div className="flex items-center mb-4">
                <ShoppingBag className="h-8 w-8 text-blue-400 mr-2" />
                <div>
                  <h3 className="text-lg font-semibold">TechsatWassim TN</h3>
                  <p className="text-gray-400">Electronics Store</p>
                </div>
              </div>
              <p className="text-gray-400 mb-2">Gafsa, Tunisia</p>
              <p className="text-gray-400">Your trusted partner for IPTV services and Android TV boxes</p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2">
                <a
                  href="tel:+21655338664"
                  className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  +216 55 338 664
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61579941277703"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook Page
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={() => onNavigate('iptv')}
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  IPTV Services
                </button>
                <button
                  onClick={() => onNavigate('android-boxes')}
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Android TV Boxes
                </button>
                <a
                  href="https://api.whatsapp.com/send/?phone=21655338664&text=Hello%21+I%27m+interested+in+your+IPTV+services.+Can+you+help+me%3F&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  WhatsApp Contact
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 TechsatWassim TN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}