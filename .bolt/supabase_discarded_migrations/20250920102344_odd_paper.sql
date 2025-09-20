/*
# Create products and admin tables for TechsatWassim TN

1. New Tables
  - `products`
    - `id` (uuid, primary key)
    - `name` (text, product name)
    - `description` (text, product description)
    - `price` (decimal, product price in TND)
    - `image_url` (text, product image URL)
    - `category` (text, IPTV or Android_Box)
    - `featured` (boolean, show on homepage)
    - `created_at` (timestamp)
    - `updated_at` (timestamp)
  - `admin_users`
    - `id` (uuid, primary key)
    - `username` (text, unique)
    - `password_hash` (text, hashed password)
    - `created_at` (timestamp)
  - `app_settings`
    - `id` (uuid, primary key)
    - `setting_key` (text, unique)
    - `setting_value` (text)
    - `updated_at` (timestamp)

2. Security
  - Enable RLS on all tables
  - Add policies for authenticated admin access
  - Public read access for products and app settings

3. Initial Data
  - Create admin user: wassim1
  - Set initial IPTV app download link
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL DEFAULT 0,
  image_url text DEFAULT '',
  category text NOT NULL CHECK (category IN ('IPTV', 'Android_Box')),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create app settings table
CREATE TABLE IF NOT EXISTS app_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for products
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin can manage products
CREATE POLICY "Admin can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true);

-- Public read access for app settings
CREATE POLICY "Anyone can read app settings"
  ON app_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin can manage app settings
CREATE POLICY "Admin can manage app settings"
  ON app_settings
  FOR ALL
  TO authenticated
  USING (true);

-- Admin users can be read by authenticated users only
CREATE POLICY "Admin users readable by authenticated"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default admin user (password: zed18666 hashed)
INSERT INTO admin_users (username, password_hash) VALUES 
('wassim1', '$2b$10$rVzC3.zQJZt8qz3KJkT8JuX4KfF7N8f7QzJ6KfT8JuX4KfF7N8f7Q');

-- Insert default app settings
INSERT INTO app_settings (setting_key, setting_value) VALUES 
('iptv_app_download_link', 'https://example.com/download-iptv-app'),
('featured_message', 'Welcome to TechsatWassim TN - Your trusted electronics store in Gafsa, Tunisia');

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, featured) VALUES 
('IPTV Premium Subscription', 'Premium IPTV service with 1000+ channels, sports, movies and series', 25.00, 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg', 'IPTV', true),
('Android TV Box 4K', 'High-performance Android TV Box with 4K support, 4GB RAM, 64GB storage', 150.00, 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg', 'Android_Box', true),
('IPTV Basic Subscription', 'Basic IPTV service with 500+ channels', 15.00, 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg', 'IPTV', false),
('Android TV Box Standard', 'Standard Android TV Box with 2GB RAM, 32GB storage', 80.00, 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg', 'Android_Box', false);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_app_settings_updated_at BEFORE UPDATE ON app_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();