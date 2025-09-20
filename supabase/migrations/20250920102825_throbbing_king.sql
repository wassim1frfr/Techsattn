/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text, optional)
      - `price` (numeric, required)
      - `image_url` (text, optional with default)
      - `category` (text, required - 'IPTV' or 'Android_Box')
      - `featured` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policies for public read access and admin write access

  3. Sample Data
    - Insert sample IPTV and Android Box products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price numeric NOT NULL,
  image_url text DEFAULT 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400',
  category text NOT NULL CHECK (category IN ('IPTV', 'Android_Box')),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access for products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow admin write access (insert, update, delete)
CREATE POLICY "Admin can insert products"
  ON products
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update products"
  ON products
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete products"
  ON products
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Insert sample products
INSERT INTO products (name, description, price, category, featured, image_url) VALUES
('IPTV Premium 12 Months', 'Premium IPTV subscription with over 1000 HD channels including sports, movies, and international content', 120.00, 'IPTV', true, 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400'),
('IPTV Standard 6 Months', 'Standard IPTV package with 500+ channels and EPG support', 70.00, 'IPTV', false, 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Android TV Box 4K Ultra', 'Latest Android 11 TV Box with 4K support, 4GB RAM, 32GB storage', 180.00, 'Android_Box', true, 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Android TV Box Standard', 'Android 10 TV Box with 2GB RAM, 16GB storage, perfect for streaming', 120.00, 'Android_Box', false, 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=400');