// lib/security/headers.ts — Security headers for Next.js API routes and middleware

export function setSecurityHeaders(headers: Headers): void {
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(self), geolocation=()');
}

export function createSecureJsonResponse(data: unknown, status = 200): Response {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  setSecurityHeaders(headers);
  return new Response(JSON.stringify(data), { status, headers });
}
