// Rate limiting simplu, în memorie — suficient pentru un singur runtime Node.
// Pentru producție cu multiple instanțe, se recomandă un store distribuit (ex. Upstash Redis).
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return false;
  }
  timestamps.push(now);
  hits.set(key, timestamps);
  return true;
}
