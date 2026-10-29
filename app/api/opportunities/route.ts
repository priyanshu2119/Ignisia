// app/api/opportunities/route.ts — Career opportunities CRUD
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createSecureJsonResponse } from '@/lib/security/headers';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { OpportunityTypeSchema } from '@/lib/types';

const CreateOpportunitySchema = z.object({
  title: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  type: OpportunityTypeSchema,
  description: z.string().min(10).max(5000),
  location: z.string().max(200),
  stipend: z.string().max(50).optional(),
  deadline: z.string().optional(),
  applyLink: z.string().url().optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);

  if (type) {
    const typeParsed = OpportunityTypeSchema.safeParse(type);
    if (!typeParsed.success) {
      return createSecureJsonResponse({ error: `Invalid opportunity type: ${type}` }, 400);
    }
  }

  // TODO: Query Supabase
  return createSecureJsonResponse({
    opportunities: [],
    total: 0,
    limit,
    filter: type,
    message: 'Connect Supabase to populate opportunities.',
  });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rateCheck = checkRateLimit(ip, { maxRequests: 10, windowMs: 60_000 });
  if (!rateCheck.allowed) {
    return createSecureJsonResponse({ error: 'Too many requests' }, 429);
  }

  const body = await req.json();
  const parsed = CreateOpportunitySchema.safeParse(body);
  if (!parsed.success) {
    return createSecureJsonResponse({
      error: 'Validation failed',
      details: parsed.error.issues.map(i => ({ field: i.path.join('.'), message: i.message })),
    }, 400);
  }

  const oppId = `opp-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

  return createSecureJsonResponse({
    success: true,
    opportunity: {
      id: oppId,
      ...parsed.data,
      postedBy: 'pending-auth',
      createdAt: new Date().toISOString(),
    },
    message: 'Opportunity created. Connect Supabase to persist.',
  }, 201);
}
