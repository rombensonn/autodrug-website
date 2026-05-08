import { NextRequest, NextResponse } from "next/server";
import { createSessionValue, productionAdminAvailable, setAdminCookie, verifyAdminPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!productionAdminAvailable()) {
    return NextResponse.json(
      { success: false, error: "Админ-панель недоступна: ADMIN_PASSWORD не задан." },
      { status: 503 }
    );
  }

  const { password } = (await request.json().catch(() => ({}))) as { password?: string };
  if (!password || !verifyAdminPassword(password)) {
    return NextResponse.json(
      { success: false, error: "Неверный пароль." },
      { status: 401 }
    );
  }

  const { session, value } = createSessionValue();
  const response = NextResponse.json({ success: true, csrf: session.csrf });
  setAdminCookie(response, value);
  return response;
}
