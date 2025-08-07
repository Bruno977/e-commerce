/*
  Warnings:

  - You are about to drop the `product_image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_productId_fkey";

-- DropTable
DROP TABLE "product_image";

-- CreateTable
CREATE TABLE "attachment" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "attachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attachment" ADD CONSTRAINT "attachment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
