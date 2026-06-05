-- CreateEnum
CREATE TYPE "IncidentType" AS ENUM ('ACCIDENT', 'ROADWORK', 'ROAD_CLOSED', 'TRAFFIC_JAM');

-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('REPORTED', 'IN_PROGRESS', 'RESOLVED');

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "IncidentType" NOT NULL,
    "status" "IncidentStatus" NOT NULL DEFAULT 'REPORTED',
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "reportedBy" TEXT NOT NULL,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);
