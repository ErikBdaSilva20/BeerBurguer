-- Manual migration to change user ID column from UUID to VARCHAR
-- Run this in your PostgreSQL database

BEGIN;

-- 1. Remove foreign key constraint
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;

-- 2. Change column type
ALTER TABLE users ALTER COLUMN id TYPE VARCHAR(255);

-- 3. Restore foreign key constraint
ALTER TABLE orders ADD CONSTRAINT orders_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id) 
  ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;
