ALTER TABLE "orders" ADD COLUMN "product_key" varchar(50) NOT NULL DEFAULT '';
ALTER TABLE "orders" ADD COLUMN "product_name" varchar(100) NOT NULL DEFAULT '';
ALTER TABLE "orders" ADD COLUMN "product_name_en" varchar(100);
ALTER TABLE "orders" ADD COLUMN "size" varchar(10) NOT NULL DEFAULT '';
ALTER TABLE "orders" ADD COLUMN "quantity" integer NOT NULL DEFAULT 1;
ALTER TABLE "orders" ADD COLUMN "price" numeric(10, 2) NOT NULL DEFAULT 0;

DROP TABLE IF EXISTS "order_items";
