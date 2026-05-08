import { NextRequest, NextResponse } from "next/server";
import { LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getAdminSessionFromRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = request.nextUrl.searchParams.get("status");
  const search = request.nextUrl.searchParams.get("search");
  const allowedStatuses = Object.values(LeadStatus);
  const statusFilter =
    status && allowedStatuses.includes(status as LeadStatus)
      ? (status as LeadStatus)
      : undefined;

  const leads = await prisma.lead.findMany({
    where: {
      status: statusFilter,
      phone: search ? { contains: search } : undefined
    },
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return NextResponse.json({ leads });
}
