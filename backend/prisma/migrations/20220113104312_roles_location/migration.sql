-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'LOCATION_ADMIN', 'LOCATION_USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locationId" INTEGER,
ADD COLUMN     "role" "Role";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
