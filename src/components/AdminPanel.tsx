import React, { useState, useEffect } from 'react'
import { X, Plus, Edit2, Trash2, Save, Eye, EyeOff } from 'lucide-react'
import { 
  Product, 
  fetchProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  fetchAppSetting,
  updateAppSetting,
  authenticateAdmin 
} from '../lib/supabase'

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface ProductForm {
  name: string
  description: string
  price: string
  image_url: string
  category: 'IPTV' | 'Android_Box'
  featured: boolean
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [productForm, setProductForm] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: 'IPTV',
    featured: false
  })
  const [appDownloadLink, setAppDownloadLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      loadData()
    }
  }, [isAuthenticated, isOpen])

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsData, downloadLink] = await Promise.all([
        fetchProducts(),
        fetchAppSetting('iptv_app_download_link')
      ])
      setProducts(productsData)
      setAppDownloadLink(downloadLink)
    } catch (error) {
      setError('Error loading data: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const success = await authenticateAdmin(loginForm.username, loginForm.password)
      if (success) {
        setIsAuthenticated(true)
        setError('')
      } else {
        setError('Invalid credentials')
      }
    } catch (error) {
      setError('Login failed: ' + error)
    }
  }

  const resetForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      image_url: '',
      category: 'IPTV',
      featured: false
    })
    setEditingProduct(null)
    setIsAddingProduct(false)
  }

  const handleAddProduct = () => {
    resetForm()
    setIsAddingProduct(true)
  }

  const handleEditProduct = (product: Product) => {
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      category: product.category,
      featured: product.featured
    })
    setEditingProduct(product)
    setIsAddingProduct(true)
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        image_url: productForm.image_url,
        category: productForm.category,
        featured: productForm.featured
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData)
        setSuccess('Product updated successfully!')
      } else {
        await addProduct(productData)
        setSuccess('Product added successfully!')
      }

      resetForm()
      await loadData()
    } catch (error) {
      setError('Error saving product: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      setLoading(true)
      await deleteProduct(id)
      setSuccess('Product deleted successfully!')
      await loadData()
    } catch (error) {
      setError('Error deleting product: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateAppLink = async () => {
    try {
      setLoading(true)
      await updateAppSetting('iptv_app_download_link', appDownloadLink)
      setSuccess('App download link updated successfully!')
    } catch (error) {
      setError('Error updating app link: ' + error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {!isAuthenticated ? (
            /* Login Form */
            <div className="p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-6 text-center">Admin Login</h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Login
                </button>
              </form>
            </div>
          ) : (
            /* Admin Dashboard */
            <div className="p-6 space-y-8">
              {/* Messages */}
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg">
                  {success}
                </div>
              )}

              {/* App Settings */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">IPTV App Download Link</h3>
                <div className="flex space-x-4">
                  <input
                    type="url"
                    value={appDownloadLink}
                    onChange={(e) => setAppDownloadLink(e.target.value)}
                    placeholder="Enter app download URL"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleUpdateAppLink}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    Update Link
                  </button>
                </div>
              </div>

              {/* Products Management */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Products Management</h3>
                  <button
                    onClick={handleAddProduct}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Product</span>
                  </button>
                </div>

                {/* Product Form */}
                {isAddingProduct && (
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h4 className="text-md font-semibold mb-4">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h4>
                    <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price (TND)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value as 'IPTV' | 'Android_Box' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="IPTV">IPTV</option>
                          <option value="Android_Box">Android Box</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={productForm.image_url}
                          onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                          placeholder="https://i.postimg.cc/example/image.jpg"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={productForm.featured}
                          onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                          Featured Product
                        </label>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
                        >
                          <Save className="h-4 w-4" />
                          <span>{editingProduct ? 'Update' : 'Add'} Product</span>
                        </button>
                        <button
                          type="button"
                          onClick={resetForm}
                          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Products List */}
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : (
                    products.map((product) => (
                      <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center space-x-4">
                        <img
                          src={product.image_url || 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg'}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg'
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{product.name}</h4>
                            {product.featured && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                Featured
                              </span>
                            )}
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {product.category}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600 mb-2">{product.price} TND</div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}