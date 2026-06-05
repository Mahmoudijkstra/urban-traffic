-- CreateEnum
CREATE TYPE "TrafficDensity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "TrafficZone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "radius" DOUBLE PRECISION NOT NULL DEFAULT 500,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrafficZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrafficMeasurement" (
    "id" TEXT NOT NULL,
    "zoneId" TEXT NOT NULL,
    "vehicleCount" INTEGER NOT NULL DEFAULT 0,
    "avgSpeed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "density" "TrafficDensity" NOT NULL,
    "measuredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrafficMeasurement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrafficMeasurement" ADD CONSTRAINT "TrafficMeasurement_zoneId_fkey"
    FOREIGN KEY ("zoneId") REFERENCES "TrafficZone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
