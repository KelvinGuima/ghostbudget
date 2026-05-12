-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassificationCache" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "ClassificationCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassificationCache_description_key" ON "ClassificationCache"("description");
