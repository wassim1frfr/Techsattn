import React, { useEffect, useState } from 'react'
import { Monitor, Smartphone, Zap, Shield } from 'lucide-react'
import ProductCard from './ProductCard'
import { Product, fetchFeaturedProducts, fetchAppSetting } from '../lib/supabase'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [featuredMessage, setFeaturedMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [products, message] = await Promise.all([
          fetchFeaturedProducts(),
          fetchAppSetting('featured_message')
        ])
        setFeaturedProducts(products)
        setFeaturedMessage(message)
      } catch (error) {
        console.error('Error loading homepage data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const features = [
    {
      icon: <Monitor className="h-8 w-8 text-blue-600" />,
      title: 'Premium IPTV',
      description: 'Access thousands of channels in HD quality with our reliable IPTV services'
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-600" />,
      title: 'Android TV Boxes',
      description: 'Latest Android TV boxes with 4K support and powerful performance'
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: 'Fast Setup',
      description: 'Quick and easy installation with complete setup support'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Reliable Service',
      description: '24/7 customer support and guaranteed uptime for all services'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to TechsatWassim TN
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {featuredMessage || 'Your trusted electronics store in Gafsa, Tunisia'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://api.whatsapp.com/send/?phone=21655338664&text=Hello%21+I%27m+interested+in+your+IPTV+services.+Can+you+help+me%3F&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
            >
              Contact on WhatsApp
            </a>
            <a
              href="tel:+21655338664"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Call Now: +216 55 338 664
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose TechsatWassim TN?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showBuyButton />
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-gray-900 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Contact us today for the best IPTV services and Android TV boxes in Gafsa, Tunisia
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.facebook.com/profile.php?id=61579941277703"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Follow us on Facebook
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=21655338664&text=Hello%21+I%27m+interested+in+your+services.+Can+you+help+me%3F&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            Get Quote on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}