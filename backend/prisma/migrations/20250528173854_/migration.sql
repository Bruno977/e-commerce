-- DropForeignKey
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_productId_fkey";

-- AlterTable
ALTER TABLE "product_image" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
