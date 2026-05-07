// Simple in-memory rate limiting (per serverless instance)
const rateMap = new Map();
const RATE_LIMIT = 5;       // max requests
const RATE_WINDOW = 60000;  // per 60 seconds

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, start: now };

  // Reset window if expired
  if (now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { count: 1, start: now });
    return false;
  }

  entry.count++;
  rateMap.set(ip, entry);
  return entry.count > RATE_LIMIT;
}

export default async function handler(req, res) {
  // Method check
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  // Rate limiting
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "too_many_requests" });
  }

  // Email validatie
  const { email, source = "landing" } = req.body || {};
  if (!email || !String(email).includes("@") || String(email).length > 254) {
    return res.status(400).json({ error: "invalid_email" });
  }

  // Supabase env check
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    return res.status(500).json({ error: "missing_supabase_env" });
  }

  // Supabase insert
  const response = await fetch(`${url}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": key,
      "Authorization": `Bearer ${key}`,
      "Prefer": "return=minimal",
    },
    body: JSON.stringify({
      email: String(email).toLowerCase().trim(),
      source,
    }),
  });

  if (response.status === 409) return res.status(409).json({ error: "exists" });
  if (!response.ok) return res.status(500).json({ error: "supabase_failed" });
  return res.status(200).json({ success: true });
}
