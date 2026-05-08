export function sanitizePhoneInput(value: string) {
  return value.replace(/[^\d\s()+-]/g, "").slice(0, 30);
}

export function countPhoneDigits(value: string) {
  return value.replace(/\D/g, "").length;
}
