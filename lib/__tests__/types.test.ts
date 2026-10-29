// lib/__tests__/types.test.ts — Unit tests for data models and validation schemas
import { describe, it, expect } from 'vitest';
import {
  UserRoleSchema,
  UserSchema,
  CreateEventSchema,
  EventCategorySchema,
  CreateForumPostSchema,
  ForumCategorySchema,
  NotificationTypeSchema,
  OpportunityTypeSchema,
  ResourceTypeSchema,
} from '../types';

describe('User Role Schema', () => {
  it('should accept all valid roles', () => {
    const roles = ['student', 'hosteler', 'day_scholar', 'alumni', 'faculty', 'admin'];
    roles.forEach(role => {
      expect(UserRoleSchema.parse(role)).toBe(role);
    });
  });

  it('should reject invalid roles', () => {
    expect(() => UserRoleSchema.parse('invalid')).toThrow();
    expect(() => UserRoleSchema.parse('')).toThrow();
  });
});

describe('Event Schemas', () => {
  it('should validate a correct event creation', () => {
    const event = {
      title: 'Tech Fest 2026',
      description: 'Annual technology festival with workshops and competitions',
      category: 'technical',
      date: '2026-11-15',
      location: 'Main Auditorium',
      organizer: 'CS Department',
    };
    const result = CreateEventSchema.parse(event);
    expect(result.title).toBe('Tech Fest 2026');
    expect(result.category).toBe('technical');
  });

  it('should reject event with short description', () => {
    const event = {
      title: 'Event',
      description: 'Short', // Less than 10 chars
      category: 'cultural',
      date: '2026-11-15',
      location: 'Hall A',
      organizer: 'Club',
    };
    expect(() => CreateEventSchema.parse(event)).toThrow();
  });

  it('should accept all event categories', () => {
    const categories = ['academic', 'cultural', 'sports', 'technical', 'social', 'workshop'];
    categories.forEach(cat => {
      expect(EventCategorySchema.parse(cat)).toBe(cat);
    });
  });
});

describe('Forum Schemas', () => {
  it('should validate a correct forum post', () => {
    const post = {
      title: 'Best study spots on campus?',
      content: 'Looking for quiet places to study during exam season. Library is always full.',
      category: 'general',
      isAnonymous: false,
    };
    const result = CreateForumPostSchema.parse(post);
    expect(result.category).toBe('general');
    expect(result.isAnonymous).toBe(false);
  });

  it('should accept anonymous posts', () => {
    const post = {
      title: 'Mental health support',
      content: 'Need someone to talk to about exam stress. Any counsellors available?',
      category: 'general',
      isAnonymous: true,
    };
    const result = CreateForumPostSchema.parse(post);
    expect(result.isAnonymous).toBe(true);
  });

  it('should accept all forum categories', () => {
    const categories = ['general', 'academic', 'hostel', 'events', 'placements', 'anime', 'off-topic'];
    categories.forEach(cat => {
      expect(ForumCategorySchema.parse(cat)).toBe(cat);
    });
  });
});

describe('Notification Types', () => {
  it('should accept all notification types', () => {
    const types = [
      'event_reminder', 'event_registration', 'new_comment', 'new_reply',
      'opportunity_new', 'resource_uploaded', 'mention', 'system',
    ];
    types.forEach(type => {
      expect(NotificationTypeSchema.parse(type)).toBe(type);
    });
  });
});

describe('Opportunity Types', () => {
  it('should accept all opportunity types', () => {
    const types = ['internship', 'placement', 'freelance', 'research', 'scholarship', 'competition'];
    types.forEach(type => {
      expect(OpportunityTypeSchema.parse(type)).toBe(type);
    });
  });
});

describe('Resource Types', () => {
  it('should accept all resource types', () => {
    const types = ['notes', 'previous_paper', 'assignment', 'tutorial', 'book', 'other'];
    types.forEach(type => {
      expect(ResourceTypeSchema.parse(type)).toBe(type);
    });
  });
});
