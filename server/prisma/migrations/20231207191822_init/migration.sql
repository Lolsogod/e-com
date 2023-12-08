/*
  Warnings:

  - You are about to drop the column `UserId` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `BasketId` on the `BasketDevice` table. All the data in the column will be lost.
  - You are about to drop the column `DeviceId` on the `BasketDevice` table. All the data in the column will be lost.
  - You are about to drop the column `BrandId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `TypeId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `DeviceId` on the `DeviceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `DeviceId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `BrandId` on the `TypeBrand` table. All the data in the column will be lost.
  - You are about to drop the column `TypeId` on the `TypeBrand` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Basket` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[deviceId]` on the table `DeviceInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basketId` to the `BasketDevice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `BasketDevice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandId` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `DeviceInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandId` to the `TypeBrand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `TypeBrand` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Basket" DROP CONSTRAINT "Basket_UserId_fkey";

-- DropForeignKey
ALTER TABLE "BasketDevice" DROP CONSTRAINT "BasketDevice_BasketId_fkey";

-- DropForeignKey
ALTER TABLE "BasketDevice" DROP CONSTRAINT "BasketDevice_DeviceId_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_BrandId_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_TypeId_fkey";

-- DropForeignKey
ALTER TABLE "DeviceInfo" DROP CONSTRAINT "DeviceInfo_DeviceId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_DeviceId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_UserId_fkey";

-- DropForeignKey
ALTER TABLE "TypeBrand" DROP CONSTRAINT "TypeBrand_BrandId_fkey";

-- DropForeignKey
ALTER TABLE "TypeBrand" DROP CONSTRAINT "TypeBrand_TypeId_fkey";

-- DropIndex
DROP INDEX "Basket_UserId_key";

-- DropIndex
DROP INDEX "DeviceInfo_DeviceId_key";

-- AlterTable
ALTER TABLE "Basket" DROP COLUMN "UserId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BasketDevice" DROP COLUMN "BasketId",
DROP COLUMN "DeviceId",
ADD COLUMN     "basketId" INTEGER NOT NULL,
ADD COLUMN     "deviceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "BrandId",
DROP COLUMN "TypeId",
DROP COLUMN "rating",
ADD COLUMN     "avgRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "brandId" INTEGER NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DeviceInfo" DROP COLUMN "DeviceId",
ADD COLUMN     "deviceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "DeviceId",
DROP COLUMN "UserId",
ADD COLUMN     "deviceId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TypeBrand" DROP COLUMN "BrandId",
DROP COLUMN "TypeId",
ADD COLUMN     "brandId" INTEGER NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Basket_userId_key" ON "Basket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceInfo_deviceId_key" ON "DeviceInfo"("deviceId");

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasketDevice" ADD CONSTRAINT "BasketDevice_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasketDevice" ADD CONSTRAINT "BasketDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceInfo" ADD CONSTRAINT "DeviceInfo_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeBrand" ADD CONSTRAINT "TypeBrand_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeBrand" ADD CONSTRAINT "TypeBrand_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
