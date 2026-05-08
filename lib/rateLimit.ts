import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { getClientIp, hashIp } from "@/lib/hashIp";

export async function checkRateLimit(headers: Headers, action: string) {
  const hashedIp = hashIp(getClientIp(headers));
  const windowStart = new Date(Date.now() - env.RATE_LIMIT_WINDOW_SECONDS * 1000);

  const count = await prisma.rateLimitEvent.count({
    where: {
      hashedIp,
      action,
      createdAt: { gte: windowStart }
    }
  });

  if (count >= env.RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false };
  }

  await prisma.rateLimitEvent.create({
    data: { hashedIp, action }
  });

  await prisma.rateLimitEvent.deleteMany({
    where: {
      createdAt: {
        lt: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    }
  });

  return { allowed: true };
}
