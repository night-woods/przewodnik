-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'LOCATION_ADMIN', 'LOCATION_USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locations" INTEGER[],
ADD COLUMN     "role" "Role";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
