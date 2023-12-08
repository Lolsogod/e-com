/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Card";

-- CreateTable
CREATE TABLE "Basket" (
    "id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasketDevice" (
    "id" SERIAL NOT NULL,
    "BasketId" INTEGER NOT NULL,
    "DeviceId" INTEGER NOT NULL,

    CONSTRAINT "BasketDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "img" TEXT NOT NULL,
    "TypeId" INTEGER NOT NULL,
    "BrandId" INTEGER NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "rate" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "DeviceId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceInfo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "DeviceId" INTEGER NOT NULL,

    CONSTRAINT "DeviceInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeBrand" (
    "id" SERIAL NOT NULL,
    "TypeId" INTEGER NOT NULL,
    "BrandId" INTEGER NOT NULL,

    CONSTRAINT "TypeBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BrandToType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Basket_UserId_key" ON "Basket"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_key" ON "Device"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceInfo_DeviceId_key" ON "DeviceInfo"("DeviceId");

-- CreateIndex
CREATE UNIQUE INDEX "_BrandToType_AB_unique" ON "_BrandToType"("A", "B");

-- CreateIndex
CREATE INDEX "_BrandToType_B_index" ON "_BrandToType"("B");

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasketDevice" ADD CONSTRAINT "BasketDevice_BasketId_fkey" FOREIGN KEY ("BasketId") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasketDevice" ADD CONSTRAINT "BasketDevice_DeviceId_fkey" FOREIGN KEY ("DeviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_TypeId_fkey" FOREIGN KEY ("TypeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_BrandId_fkey" FOREIGN KEY ("BrandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_DeviceId_fkey" FOREIGN KEY ("DeviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceInfo" ADD CONSTRAINT "DeviceInfo_DeviceId_fkey" FOREIGN KEY ("DeviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeBrand" ADD CONSTRAINT "TypeBrand_TypeId_fkey" FOREIGN KEY ("TypeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeBrand" ADD CONSTRAINT "TypeBrand_BrandId_fkey" FOREIGN KEY ("BrandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrandToType" ADD CONSTRAINT "_BrandToType_A_fkey" FOREIGN KEY ("A") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrandToType" ADD CONSTRAINT "_BrandToType_B_fkey" FOREIGN KEY ("B") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
