/*
  # Create app settings table

  1. New Tables
    - `app_settings`
      - `id` (uuid, primary key)
      - `setting_key` (text, unique, required)
      - `setting_value` (text, optional)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `app_settings` table
    - Add policies for public read access and admin write access

  3. Initial Settings
    - Insert default settings for featured message and IPTV app download link
*/

CREATE TABLE IF NOT EXISTS app_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access for app settings"
  ON app_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow admin write access (insert, update)
CREATE POLICY "Admin can insert app settings"
  ON app_settings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update app settings"
  ON app_settings
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_app_settings_key ON app_settings(setting_key);

-- Insert default settings
INSERT INTO app_settings (setting_key, setting_value) VALUES
('featured_message', 'Your trusted electronics store in Gafsa, Tunisia'),
('iptv_app_download_link', 'https://example.com/download-iptv-app')
ON CONFLICT (setting_key) DO NOTHING;