import React from 'react'
import { Star, MessageCircle } from 'lucide-react'
import { Product } from '../lib/supabase'

interface ProductCardProps {
  product: Product
  showBuyButton?: boolean
}

export default function ProductCard({ product, showBuyButton = false }: ProductCardProps) {
  const handleBuy = () => {
    const message = `Hello! I'm interested in ${product.name}. Can you help me?`
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=21655338664&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image_url || 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg'
          }}
        />
        {product.featured && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {product.category === 'IPTV' ? 'IPTV Service' : 'Android Box'}
          </span>
          <div className="flex items-center text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            {product.price} TND
          </div>
          
          {showBuyButton && (
            <button
              onClick={handleBuy}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Buy Now</span>
            </button>
          )}
        </div>

        {product.category === 'IPTV' && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">HD Quality</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">24/7 Support</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Multi-Device</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}