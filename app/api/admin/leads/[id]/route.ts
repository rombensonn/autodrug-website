import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { csrfMatches, getAdminSessionFromRequest } from "@/lib/auth";

export const runtime = "nodejs";

const statusSchema = z.object({
  status: z.enum(["new", "contacted", "done", "archived"])
});

function authorize(request: NextRequest) {
  const session = getAdminSessionFromRequest(request);
  if (!csrfMatches(request, session)) return false;
  return true;
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Bad id" }, { status: 400 });
  }

  const json = await request.json().catch(() => null);
  const parsed = statusSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Bad status" }, { status: 400 });
  }

  const lead = await prisma.lead.update({
    where: { id },
    data: { status: parsed.data.status }
  });

  return NextResponse.json({ lead });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Bad id" }, { status: 400 });
  }

  await prisma.lead.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
