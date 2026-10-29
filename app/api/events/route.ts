// app/api/events/route.ts — Campus events CRUD
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createSecureJsonResponse } from '@/lib/security/headers';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { CreateEventSchema, EventCategorySchema } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
  const offset = parseInt(searchParams.get('offset') || '0');

  // Validate category if provided
  if (category) {
    const catParsed = EventCategorySchema.safeParse(category);
    if (!catParsed.success) {
      return createSecureJsonResponse({ error: `Invalid category: ${category}` }, 400);
    }
  }

  // TODO: Query Supabase for events
  return createSecureJsonResponse({
    events: [],
    total: 0,
    limit,
    offset,
    message: 'Connect Supabase to populate events.',
  });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rateCheck = checkRateLimit(ip, { maxRequests: 10, windowMs: 60_000 });
  if (!rateCheck.allowed) {
    return createSecureJsonResponse({ error: 'Too many requests' }, 429);
  }

  const body = await req.json();
  const parsed = CreateEventSchema.safeParse(body);
  if (!parsed.success) {
    return createSecureJsonResponse({
      error: 'Validation failed',
      details: parsed.error.issues.map(i => ({ field: i.path.join('.'), message: i.message })),
    }, 400);
  }

  // TODO: Save to Supabase with authenticated user as createdBy
  const eventId = `evt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

  return createSecureJsonResponse({
    success: true,
    event: { id: eventId, ...parsed.data, registeredCount: 0, createdAt: new Date().toISOString() },
    message: 'Event created. Connect Supabase to persist.',
  }, 201);
}
