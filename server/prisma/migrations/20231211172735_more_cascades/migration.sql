-- DropForeignKey
ALTER TABLE "PurchaseDevice" DROP CONSTRAINT "PurchaseDevice_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseDevice" DROP CONSTRAINT "PurchaseDevice_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_deviceId_fkey";

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDevice" ADD CONSTRAINT "PurchaseDevice_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDevice" ADD CONSTRAINT "PurchaseDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
