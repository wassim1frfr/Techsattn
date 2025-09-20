import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: 'IPTV' | 'Android_Box'
  featured: boolean
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  username: string
  password_hash: string
  created_at: string
}

export interface AppSetting {
  id: string
  setting_key: string
  setting_value: string
  updated_at: string
}

// Database functions
export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export const fetchProductsByCategory = async (category: 'IPTV' | 'Android_Box'): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export const fetchAppSetting = async (key: string): Promise<string> => {
  const { data, error } = await supabase
    .from('app_settings')
    .select('setting_value')
    .eq('setting_key', key)
    .single()

  if (error) throw error
  return data?.setting_value || ''
}

export const updateAppSetting = async (key: string, value: string): Promise<void> => {
  const { error } = await supabase
    .from('app_settings')
    .upsert({ setting_key: key, setting_value: value })

  if (error) throw error
}

export const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .insert(product)

  if (error) throw error
}

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)

  if (error) throw error
}

export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Simple admin authentication (in production, use proper hashing)
export const authenticateAdmin = async (username: string, password: string): Promise<boolean> => {
  // For demo purposes, we'll use simple comparison
  // In production, you'd hash the password and compare
  if (username === 'wassim1' && password === 'zed18666') {
    return true
  }
  return false
}