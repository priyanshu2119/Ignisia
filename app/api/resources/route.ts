// app/api/resources/route.ts — Study resources CRUD
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createSecureJsonResponse } from '@/lib/security/headers';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { ResourceTypeSchema } from '@/lib/types';

const CreateResourceSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  subject: z.string().min(1).max(100),
  resourceType: ResourceTypeSchema,
  externalLink: z.string().url().optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subject = searchParams.get('subject');
  const type = searchParams.get('type');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);

  if (type) {
    const typeParsed = ResourceTypeSchema.safeParse(type);
    if (!typeParsed.success) {
      return createSecureJsonResponse({ error: `Invalid resource type: ${type}` }, 400);
    }
  }

  // TODO: Query Supabase
  return createSecureJsonResponse({
    resources: [],
    total: 0,
    limit,
    filters: { subject, type },
    message: 'Connect Supabase to populate resources.',
  });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rateCheck = checkRateLimit(ip, { maxRequests: 15, windowMs: 60_000 });
  if (!rateCheck.allowed) {
    return createSecureJsonResponse({ error: 'Too many requests' }, 429);
  }

  const body = await req.json();
  const parsed = CreateResourceSchema.safeParse(body);
  if (!parsed.success) {
    return createSecureJsonResponse({
      error: 'Validation failed',
      details: parsed.error.issues.map(i => ({ field: i.path.join('.'), message: i.message })),
    }, 400);
  }

  const resourceId = `res-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

  return createSecureJsonResponse({
    success: true,
    resource: {
      id: resourceId,
      ...parsed.data,
      downloads: 0,
      upvotes: 0,
      uploadedBy: 'pending-auth',
      uploaderName: 'Anonymous',
      createdAt: new Date().toISOString(),
    },
    message: 'Resource created. Connect Supabase to persist.',
  }, 201);
}
