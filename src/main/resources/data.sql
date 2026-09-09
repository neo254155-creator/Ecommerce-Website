INSERT INTO cateogry (catogry_name)
SELECT 'Electronics'
WHERE NOT EXISTS (SELECT 1 FROM cateogry WHERE catogry_name = 'Electronics');

INSERT INTO cateogry (catogry_name)
SELECT 'Home & Kitchen'
WHERE NOT EXISTS (SELECT 1 FROM cateogry WHERE catogry_name = 'Home & Kitchen');

INSERT INTO cateogry (catogry_name)
SELECT 'Fashion'
WHERE NOT EXISTS (SELECT 1 FROM cateogry WHERE catogry_name = 'Fashion');

INSERT INTO cateogry (catogry_name)
SELECT 'Beauty'
WHERE NOT EXISTS (SELECT 1 FROM cateogry WHERE catogry_name = 'Beauty');

INSERT INTO cateogry (catogry_name)
SELECT 'Sports'
WHERE NOT EXISTS (SELECT 1 FROM cateogry WHERE catogry_name = 'Sports');

INSERT INTO cateogry (catogry_name)
SELECT 'Books'
WHERE NOT EXISTS (SELECT 1 FROM cateogry WHERE catogry_name = 'Books');

INSERT INTO products (product_name, price, stock, description, category_id)
SELECT v.name, v.price, v.stock, v.description, c.id
FROM (VALUES
    ('Wireless Headphones', 2499.00, 30, 'Comfortable over-ear headphones with clear sound.', 'Electronics'),
    ('Mechanical Keyboard', 3299.00, 24, 'Tactile keyboard for work, gaming, and everyday typing.', 'Electronics'),
    ('Smart Watch', 4999.00, 18, 'Fitness tracking, notifications, and a bright touch display.', 'Electronics'),
    ('USB-C Fast Charger', 899.00, 50, 'Fast and reliable charging for compatible devices.', 'Electronics'),
    ('Ceramic Coffee Mug', 399.00, 60, 'Minimal ceramic mug for coffee, tea, or hot chocolate.', 'Home & Kitchen'),
    ('Bamboo Cutting Board', 799.00, 28, 'Durable bamboo board for daily meal preparation.', 'Home & Kitchen'),
    ('Stainless Steel Bottle', 999.00, 42, 'Insulated bottle that keeps drinks cold or hot.', 'Home & Kitchen'),
    ('Cotton Bedsheet Set', 1799.00, 20, 'Soft breathable bedsheet set for a comfortable night.', 'Home & Kitchen'),
    ('Desk Organizer', 549.00, 32, 'Keep stationery, cables, and small items neatly arranged.', 'Home & Kitchen'),
    ('Canvas Backpack', 1499.00, 25, 'Lightweight everyday backpack with multiple compartments.', 'Fashion'),
    ('Classic Wrist Watch', 2199.00, 16, 'Simple analog watch with a comfortable leather strap.', 'Fashion'),
    ('Cotton T-Shirt', 699.00, 45, 'Soft regular-fit cotton t-shirt for everyday wear.', 'Fashion'),
    ('Leather Wallet', 1199.00, 22, 'Slim wallet with practical card and cash compartments.', 'Fashion'),
    ('Running Shoes', 2799.00, 19, 'Lightweight shoes designed for daily running and walking.', 'Fashion'),
    ('Face Moisturizer', 649.00, 40, 'Lightweight moisturizer for smooth and hydrated skin.', 'Beauty'),
    ('Herbal Shampoo', 499.00, 38, 'Gentle everyday shampoo with botanical extracts.', 'Beauty'),
    ('Sunscreen SPF 50', 799.00, 34, 'Broad-spectrum sunscreen for daily outdoor protection.', 'Beauty'),
    ('Aloe Vera Face Wash', 399.00, 44, 'Refreshing face wash suitable for daily cleansing.', 'Beauty'),
    ('Lip Balm Set', 299.00, 55, 'Moisturizing lip balm set with nourishing oils.', 'Beauty'),
    ('Yoga Mat', 899.00, 27, 'Non-slip cushioned mat for yoga, stretching, and exercise.', 'Sports'),
    ('Insulated Sports Bottle', 749.00, 31, 'Leak-resistant bottle for workouts and outdoor activities.', 'Sports'),
    ('Resistance Bands Set', 599.00, 36, 'Five resistance levels for strength and mobility training.', 'Sports'),
    ('Badminton Racket', 1299.00, 14, 'Balanced racket for recreational and training sessions.', 'Sports'),
    ('The Alchemist', 399.00, 25, 'A classic inspirational novel about following your dreams.', 'Books'),
    ('Atomic Habits', 599.00, 30, 'Practical ideas for building better habits every day.', 'Books'),
    ('Clean Code', 899.00, 12, 'A guide to writing readable, maintainable software.', 'Books'),
    ('The Little Prince', 299.00, 22, 'A timeless illustrated story for readers of every age.', 'Books')
) AS v(name, price, stock, description, category_name)
JOIN cateogry c ON c.catogry_name = v.category_name
WHERE NOT EXISTS (
    SELECT 1 FROM products p WHERE p.product_name = v.name
);
