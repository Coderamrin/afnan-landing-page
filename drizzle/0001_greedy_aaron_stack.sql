DROP TABLE "order_items" CASCADE;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "product_key" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "product_name" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "product_name_en" varchar(100);--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "size" varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "quantity" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "price" numeric(10, 2) NOT NULL;