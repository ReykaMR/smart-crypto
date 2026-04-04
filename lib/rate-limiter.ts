/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or similar
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10); // 1 minute default
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "10", 10); // 10 requests default

export function rateLimit(identifier: string): {
  success: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();

  // Initialize or get existing record
  if (!store[identifier]) {
    store[identifier] = {
      count: 0,
      resetTime: now + WINDOW_MS,
    };
  }

  const record = store[identifier];

  // Reset if window has passed
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + WINDOW_MS;
  }

  // Increment count
  record.count++;

  // Check if limit exceeded
  const remaining = Math.max(0, MAX_REQUESTS - record.count);
  const success = record.count <= MAX_REQUESTS;

  // Cleanup old entries lazily (on each call, cleanup if > 1000 entries)
  if (Object.keys(store).length > 1000) {
    cleanupRateLimiter();
  }

  return {
    success,
    remaining,
    resetTime: record.resetTime,
  };
}

export function cleanupRateLimiter() {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (now > store[key].resetTime) {
      delete store[key];
    }
  });
}
