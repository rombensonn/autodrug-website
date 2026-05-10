const DEFAULT_LEAD_ENDPOINT = "/api/lead.php";

export function getLeadEndpoint() {
  const configured = process.env.NEXT_PUBLIC_LEAD_ENDPOINT?.trim();
  return configured || DEFAULT_LEAD_ENDPOINT;
}
