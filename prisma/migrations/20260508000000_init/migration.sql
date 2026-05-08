CREATE TYPE "LeadStatus" AS ENUM ('new', 'contacted', 'done', 'archived');

CREATE TABLE "Lead" (
  "id" SERIAL NOT NULL,
  "name" TEXT,
  "phone" TEXT NOT NULL,
  "carBrand" TEXT,
  "carModel" TEXT,
  "carYear" TEXT,
  "service" TEXT,
  "problem" TEXT NOT NULL,
  "preferredDate" TEXT,
  "preferredTime" TEXT,
  "contactMethod" TEXT,
  "needsPartsHelp" BOOLEAN NOT NULL DEFAULT false,
  "sourcePage" TEXT,
  "status" "LeadStatus" NOT NULL DEFAULT 'new',
  "consentAccepted" BOOLEAN NOT NULL DEFAULT false,
  "consentVersion" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AnalyticsEvent" (
  "id" SERIAL NOT NULL,
  "event" TEXT NOT NULL,
  "page" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RateLimitEvent" (
  "id" SERIAL NOT NULL,
  "hashedIp" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RateLimitEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "RateLimitEvent_hashedIp_action_createdAt_idx"
ON "RateLimitEvent"("hashedIp", "action", "createdAt");
