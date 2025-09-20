import React, { useEffect, useState } from 'react'
import { Cpu, Wifi, HardDrive, Monitor } from 'lucide-react'
import ProductCard from './ProductCard'
import { Product, fetchProductsByCategory } from '../lib/supabase'

export default function AndroidBoxesPage() {
  const [androidProducts, setAndroidProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const products = await fetchProductsByCategory('Android_Box')
        setAndroidProducts(products)
      } catch (error) {
        console.error('Error loading Android boxes:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const specifications = [
    {
      icon: <Cpu className="h-8 w-8 text-blue-600" />,
      title: 'Powerful Processors',
      description: 'Latest ARM processors for smooth 4K streaming and gaming'
    },
    {
      icon: <Monitor className="h-8 w-8 text-blue-600" />,
      title: '4K Ultra HD',
      description: 'Support for 4K resolution with HDR for crystal clear picture'
    },
    {
      icon: <HardDrive className="h-8 w-8 text-blue-600" />,
      title: 'Ample Storage',
      description: 'Built-in storage with expandable options via USB and SD card'
    },
    {
      icon: <Wifi className="h-8 w-8 text-blue-600" />,
      title: 'Dual-Band WiFi',
      description: '5GHz WiFi support for fast and stable internet connection'
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
      <section className="text-center py-12 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Android TV Boxes
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Transform your regular TV into a smart entertainment center
          </p>
          <p className="text-lg text-green-200">
            High-performance Android TV boxes with 4K support and latest features
          </p>
        </div>
      </section>

      {/* Specifications */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Advanced Features & Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                {spec.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {spec.title}
              </h3>
              <p className="text-gray-600">
                {spec.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Benefits */}
      <section className="bg-gray-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our Android TV Boxes?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-gray-700">Latest Android operating system with regular updates</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-gray-700">Access to Google Play Store with thousands of apps</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-gray-700">Voice remote control with Google Assistant</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-gray-700">Multiple connectivity options (HDMI, USB, Ethernet)</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-gray-700">Pre-installed IPTV apps for instant streaming</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-gray-700">Gaming capabilities with controller support</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-gray-700">Easy setup with complete installation support</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-gray-700">1-year warranty with local support in Tunisia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Android TV Box Products */}
      {androidProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Available Android TV Boxes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {androidProducts.map((product) => (
              <ProductCard key={product.id} product={product} showBuyButton />
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-green-600 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Upgrade Your TV Experience!
        </h2>
        <p className="text-xl text-green-100 mb-8">
          Get your Android TV box today and enjoy unlimited entertainment
        </p>
        <a
          href="https://api.whatsapp.com/send/?phone=21655338664&text=Hello%21+I%27m+interested+in+your+Android+TV+boxes.+Can+you+help+me%3F&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block"
        >
          Buy Android TV Box
        </a>
      </section>
    </div>
  )
}