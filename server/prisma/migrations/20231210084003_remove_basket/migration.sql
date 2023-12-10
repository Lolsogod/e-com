/*
  Warnings:

  - You are about to drop the `Basket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BasketDevice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Basket" DROP CONSTRAINT "Basket_userId_fkey";

-- DropForeignKey
ALTER TABLE "BasketDevice" DROP CONSTRAINT "BasketDevice_basketId_fkey";

-- DropForeignKey
ALTER TABLE "BasketDevice" DROP CONSTRAINT "BasketDevice_deviceId_fkey";

-- DropTable
DROP TABLE "Basket";

-- DropTable
DROP TABLE "BasketDevice";
