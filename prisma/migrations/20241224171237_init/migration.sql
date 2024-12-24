-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "shorted_url" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);
