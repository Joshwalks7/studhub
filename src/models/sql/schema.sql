-- StudHub database schema
--
-- connect-pg-simple creates and manages the session table separately.
-- This schema covers permanent marketplace data.

CREATE TABLE IF NOT EXISTS users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    seller_status VARCHAR(20) NOT NULL DEFAULT 'not_applied'
        CHECK (seller_status IN ('not_applied', 'pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS listings (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    seller_id BIGINT NOT NULL REFERENCES users(id),
    listing_name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    condition VARCHAR(30) NOT NULL,
    completion_percent NUMERIC(5, 2) NOT NULL
        CHECK (completion_percent >= 0 AND completion_percent <= 100),
    quantity_available INTEGER NOT NULL DEFAULT 1
        CHECK (quantity_available >= 0),
    image_url TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'available'
        CHECK (status IN ('available', 'reserved', 'sold')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    buyer_id BIGINT NOT NULL REFERENCES users(id),
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
    sales_tax NUMERIC(10, 2) NOT NULL CHECK (sales_tax >= 0),
    shipping NUMERIC(10, 2) NOT NULL CHECK (shipping >= 0),
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    listing_id BIGINT NOT NULL REFERENCES listings(id),
    seller_id BIGINT NOT NULL REFERENCES users(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    item_total NUMERIC(10, 2) NOT NULL CHECK (item_total >= 0),
    fulfillment_status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (fulfillment_status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS listings_seller_id_idx
    ON listings (seller_id);

CREATE INDEX IF NOT EXISTS listings_status_idx
    ON listings (status);

CREATE INDEX IF NOT EXISTS orders_buyer_id_idx
    ON orders (buyer_id);

CREATE INDEX IF NOT EXISTS order_items_order_id_idx
    ON order_items (order_id);

CREATE INDEX IF NOT EXISTS order_items_seller_id_idx
    ON order_items (seller_id);
