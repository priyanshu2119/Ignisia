// app/api/forum/route.ts — Campus forum / discussion board
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createSecureJsonResponse } from '@/lib/security/headers';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { CreateForumPostSchema, ForumCategorySchema } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
  const offset = parseInt(searchParams.get('offset') || '0');

  if (category) {
    const catParsed = ForumCategorySchema.safeParse(category);
    if (!catParsed.success) {
      return createSecureJsonResponse({ error: `Invalid category: ${category}` }, 400);
    }
  }

  // TODO: Query Supabase for forum posts
  return createSecureJsonResponse({
    posts: [],
    total: 0,
    limit,
    offset,
    message: 'Connect Supabase to populate forum.',
  });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rateCheck = checkRateLimit(ip, { maxRequests: 10, windowMs: 60_000 });
  if (!rateCheck.allowed) {
    return createSecureJsonResponse({ error: 'Too many requests' }, 429);
  }

  const body = await req.json();
  const parsed = CreateForumPostSchema.safeParse(body);
  if (!parsed.success) {
    return createSecureJsonResponse({
      error: 'Validation failed',
      details: parsed.error.issues.map(i => ({ field: i.path.join('.'), message: i.message })),
    }, 400);
  }

  const postId = `post-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const now = new Date().toISOString();

  return createSecureJsonResponse({
    success: true,
    post: {
      id: postId,
      ...parsed.data,
      authorId: 'pending-auth',
      authorName: parsed.data.isAnonymous ? 'Anonymous' : 'Pending Auth',
      upvotes: 0,
      commentCount: 0,
      createdAt: now,
      updatedAt: now,
    },
    message: 'Post created. Connect Supabase to persist.',
  }, 201);
}
