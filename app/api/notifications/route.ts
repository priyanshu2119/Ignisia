// app/api/notifications/route.ts — User notifications
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createSecureJsonResponse } from '@/lib/security/headers';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { NotificationTypeSchema } from '@/lib/types';

const CreateNotificationSchema = z.object({
  userId: z.string().min(1),
  type: NotificationTypeSchema,
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  link: z.string().url().optional(),
});

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return createSecureJsonResponse({ error: 'Authentication required' }, 401);
  }

  const { searchParams } = new URL(req.url);
  const unreadOnly = searchParams.get('unread') === 'true';
  const limit = Math.min(parseInt(searchParams.get('limit') || '30'), 100);

  // TODO: Query Supabase for user's notifications
  return createSecureJsonResponse({
    notifications: [],
    total: 0,
    unreadCount: 0,
    limit,
    filter: unreadOnly ? 'unread' : 'all',
    message: 'Connect Supabase to populate notifications.',
  });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rateCheck = checkRateLimit(ip, { maxRequests: 20, windowMs: 60_000 });
  if (!rateCheck.allowed) {
    return createSecureJsonResponse({ error: 'Too many requests' }, 429);
  }

  const body = await req.json();
  const parsed = CreateNotificationSchema.safeParse(body);
  if (!parsed.success) {
    return createSecureJsonResponse({
      error: 'Validation failed',
      details: parsed.error.issues.map(i => ({ field: i.path.join('.'), message: i.message })),
    }, 400);
  }

  const notifId = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

  return createSecureJsonResponse({
    success: true,
    notification: {
      id: notifId,
      ...parsed.data,
      isRead: false,
      createdAt: new Date().toISOString(),
    },
    message: 'Notification created. Connect Supabase to persist.',
  }, 201);
}

/** Mark notifications as read */
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const schema = z.object({
    notificationIds: z.array(z.string()).min(1).max(100),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return createSecureJsonResponse({
      error: 'Validation failed',
      details: parsed.error.issues.map(i => ({ field: i.path.join('.'), message: i.message })),
    }, 400);
  }

  // TODO: Update Supabase records
  return createSecureJsonResponse({
    success: true,
    markedAsRead: parsed.data.notificationIds.length,
    message: 'Notifications marked as read. Connect Supabase to persist.',
  });
}
