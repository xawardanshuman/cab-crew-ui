-- ============================================
-- CAB CREW DATABASE SCHEMA
-- ============================================

-- Create pricing table
CREATE TABLE pricing (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  vehicle_type VARCHAR(50) NOT NULL UNIQUE,
  base_fare DECIMAL(10, 2) NOT NULL,
  per_km DECIMAL(10, 2) NOT NULL,
  min_fare DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create extra_charges table
CREATE TABLE extra_charges (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL UNIQUE,
  amount DECIMAL(10, 2),
  multiplier DECIMAL(3, 2),
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create routes table
CREATE TABLE routes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  location_name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  booking_id VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  pickup VARCHAR(100) NOT NULL,
  dropoff VARCHAR(100) NOT NULL,
  vehicle_type VARCHAR(50) NOT NULL,
  service_type VARCHAR(50) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  distance_km DECIMAL(10, 2),
  fare_estimate DECIMAL(10, 2) NOT NULL,
  fare_breakdown JSONB,
  status VARCHAR(20) DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE admin_users (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INSERT DEFAULT DATA
-- ============================================

-- Insert pricing data
INSERT INTO pricing (vehicle_type, base_fare, per_km, min_fare) VALUES
('Hatchback', 50, 11, 100),
('Sedan', 60, 13, 120),
('SUV', 70, 15, 150);

-- Insert extra charges
INSERT INTO extra_charges (name, amount, type) VALUES
('Night Charge', 200, 'fixed'),
('Waiting Charge', 150, 'hourly');

INSERT INTO extra_charges (name, multiplier, type) VALUES
('Peak Hour Multiplier', 1.2, 'multiplier');

-- Insert Pune routes (20 locations)
INSERT INTO routes (location_name) VALUES
('Kothrud'),
('Hinjewadi'),
('Baner'),
('Wakad'),
('Viman Nagar'),
('KP'),
('Airport'),
('Railway Station'),
('Hadapsar'),
('Magarpatta'),
('Camp'),
('Swargate'),
('Pimpri'),
('Chinchwad'),
('Pashan'),
('Balewadi'),
('Shivaji Nagar'),
('FC Road'),
('Deccan'),
('Aundh');

-- Insert admin user
-- Password: admin123
-- Generate hash with: node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('admin123', 10));"
-- Replace the hash below with your generated hash
INSERT INTO admin_users (email, password_hash) VALUES
('admin@cabcrew.com', '$2b$10$rKvVPZQGhXZq3xE.8YJ5/.YxV8YmH0F5L5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z');

-- Note: Replace the hash above with actual bcrypt hash before deployment