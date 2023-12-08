-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_content_key" ON "Card"("content");
