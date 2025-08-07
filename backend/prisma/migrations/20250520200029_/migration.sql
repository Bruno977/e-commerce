-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION NOT NULL,
    "discount" INTEGER,
    "stock" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_image" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "product_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryProducts_B_index" ON "_CategoryProducts"("B");

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryProducts" ADD CONSTRAINT "_CategoryProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryProducts" ADD CONSTRAINT "_CategoryProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
