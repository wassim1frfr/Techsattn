import React, { useEffect, useState } from 'react'
import { Download, Play, Monitor, Smartphone } from 'lucide-react'
import ProductCard from './ProductCard'
import { Product, fetchProductsByCategory, fetchAppSetting } from '../lib/supabase'

export default function IPTVPage() {
  const [iptvProducts, setIptvProducts] = useState<Product[]>([])
  const [appDownloadLink, setAppDownloadLink] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [products, downloadLink] = await Promise.all([
          fetchProductsByCategory('IPTV'),
          fetchAppSetting('iptv_app_download_link')
        ])
        setIptvProducts(products)
        setAppDownloadLink(downloadLink)
      } catch (error) {
        console.error('Error loading IPTV data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const features = [
    'Over 1000+ HD channels',
    'Sports, Movies, Series & More',
    'Multi-device support',
    '24/7 customer support',
    'No contracts, flexible plans',
    'EPG (Electronic Program Guide)'
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
      <section className="text-center py-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium IPTV Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            Stream thousands of channels in HD quality with our reliable IPTV platform
          </p>
          {appDownloadLink && (
            <a
              href={appDownloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Download IPTV App</span>
            </a>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          IPTV Service Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <Play className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
              <span className="text-gray-800 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Device Compatibility */}
      <section className="bg-gray-900 text-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Compatible with All Devices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center space-x-4 p-6 bg-gray-800 rounded-lg">
            <Monitor className="h-12 w-12 text-blue-400" />
            <div>
              <h3 className="text-xl font-semibold mb-2">TV & Set-Top Boxes</h3>
              <p className="text-gray-300">Android TV, Smart TV, MAG boxes, and more</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-6 bg-gray-800 rounded-lg">
            <Smartphone className="h-12 w-12 text-blue-400" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Mobile & Tablets</h3>
              <p className="text-gray-300">iOS, Android phones and tablets</p>
            </div>
          </div>
        </div>
      </section>

      {/* IPTV Products */}
      {iptvProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            IPTV Subscription Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {iptvProducts.map((product) => (
              <ProductCard key={product.id} product={product} showBuyButton />
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-blue-600 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Start Streaming Today!
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Contact us to get your IPTV subscription and enjoy thousands of channels
        </p>
        <a
          href="https://api.whatsapp.com/send/?phone=21655338664&text=Hello%21+I%27m+interested+in+your+IPTV+services.+Can+you+help+me%3F&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 inline-block"
        >
          Get IPTV Subscription
        </a>
      </section>
    </div>
  )
}