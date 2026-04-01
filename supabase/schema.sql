-- ============================================================
-- Loja Moda — Database Schema
-- ============================================================

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT CHECK (category IN ('apparel', 'watch', 'accessory')),
  stock INTEGER NOT NULL DEFAULT 0,
  images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  gift_wrap BOOLEAN DEFAULT false,
  gift_message TEXT,
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stock reservations (evitar double-sell)
CREATE TABLE stock_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  session_id TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX idx_products_slug ON products (slug);
CREATE INDEX idx_products_category ON products (category);
CREATE INDEX idx_products_price ON products (price);
CREATE INDEX idx_products_created_at ON products (created_at DESC);

CREATE INDEX idx_orders_customer_email ON orders (customer_email);
CREATE INDEX idx_orders_status ON orders (status);
CREATE INDEX idx_orders_stripe_session_id ON orders (stripe_session_id);
CREATE INDEX idx_orders_created_at ON orders (created_at DESC);

CREATE INDEX idx_stock_reservations_product_id ON stock_reservations (product_id);
CREATE INDEX idx_stock_reservations_session_id ON stock_reservations (session_id);
CREATE INDEX idx_stock_reservations_expires_at ON stock_reservations (expires_at);

-- ============================================================
-- updated_at trigger function
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are publicly readable" ON products FOR SELECT USING (true);
CREATE POLICY "Orders readable by owner" ON orders FOR SELECT USING (auth.email() = customer_email);
