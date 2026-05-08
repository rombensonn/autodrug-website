import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { requireProductionSecret } from "@/lib/env";

export const ADMIN_COOKIE_NAME = "autodrug_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

export type AdminSession = {
  exp: number;
  csrf: string;
  iat: number;
};

function sign(payload: string) {
  return createHmac("sha256", requireProductionSecret("SESSION_SECRET"))
    .update(payload)
    .digest("base64url");
}

function encodeSession(session: AdminSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decodeSession(value?: string): AdminSession | null {
  if (!value) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as AdminSession;
    if (!session.exp || session.exp < Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

export function adminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD !== "change_me");
}

export function productionAdminAvailable() {
  return process.env.NODE_ENV !== "production" || adminPasswordConfigured();
}

export function verifyAdminPassword(password: string) {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured || configured === "change_me") return false;
  const left = Buffer.from(createHmac("sha256", "admin").update(password).digest("hex"));
  const right = Buffer.from(createHmac("sha256", "admin").update(configured).digest("hex"));
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createSessionValue() {
  const session: AdminSession = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    csrf: randomBytes(24).toString("base64url")
  };
  return { session, value: encodeSession(session) };
}

export async function getAdminSession() {
  const store = await cookies();
  return decodeSession(store.get(ADMIN_COOKIE_NAME)?.value);
}

export function getAdminSessionFromRequest(request: NextRequest) {
  return decodeSession(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

export function setAdminCookie(response: NextResponse, value: string) {
  response.cookies.set(ADMIN_COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS
  });
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
}

export function csrfMatches(request: NextRequest, session: AdminSession | null) {
  if (!session) return false;
  return request.headers.get("x-csrf-token") === session.csrf;
}
