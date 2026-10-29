// app/api/auth/route.ts — Authentication endpoints (login, register, me)
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createSecureJsonResponse } from '@/lib/security/headers';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { UserRoleSchema } from '@/lib/types';

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1).max(100),
  role: UserRoleSchema,
  college: z.string().max(200).optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rateCheck = checkRateLimit(ip, { maxRequests: 10, windowMs: 60_000 });
  if (!rateCheck.allowed) {
    return createSecureJsonResponse({ error: 'Too many requests' }, 429);
  }

  const body = await req.json();
  const action = body.action; // 'register' or 'login'

  if (action === 'register') {
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return createSecureJsonResponse({
        error: 'Validation failed',
        details: parsed.error.issues.map(i => ({ field: i.path.join('.'), message: i.message })),
      }, 400);
    }

    // TODO: Save to Supabase Auth + create user profile in DB
    // For now, return mock success response
    return createSecureJsonResponse({
      success: true,
      user: {
        id: `user-${Date.now()}`,
        email: parsed.data.email,
        name: parsed.data.name,
        role: parsed.data.role,
        college: parsed.data.college,
      },
      message: 'Registration successful. Connect Supabase for real auth.',
    }, 201);
  }

  if (action === 'login') {
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return createSecureJsonResponse({
        error: 'Validation failed',
        details: parsed.error.issues.map(i => ({ field: i.path.join('.'), message: i.message })),
      }, 400);
    }

    // TODO: Verify against Supabase Auth
    return createSecureJsonResponse({
      success: true,
      token: `mock-jwt-${Date.now()}`,
      message: 'Login successful. Connect Supabase for real auth.',
    });
  }

  return createSecureJsonResponse({ error: 'Invalid action. Use "register" or "login"' }, 400);
}

export async function GET(req: NextRequest) {
  // GET /api/auth — Get current user (requires valid session/token)
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return createSecureJsonResponse({ error: 'Authentication required' }, 401);
  }

  // TODO: Verify JWT/session with Supabase
  return createSecureJsonResponse({
    user: null,
    message: 'Connect Supabase Auth for real user sessions.',
  });
}
