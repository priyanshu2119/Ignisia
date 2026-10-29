// lib/types.ts — Core data models for Ignisia campus platform
import { z } from 'zod';

// =============================================================================
// USER ROLES
// =============================================================================

export const UserRoleSchema = z.enum(['student', 'hosteler', 'day_scholar', 'alumni', 'faculty', 'admin']);
export type UserRole = z.infer<typeof UserRoleSchema>;

// =============================================================================
// USER MODEL
// =============================================================================

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: UserRoleSchema,
  avatar: z.string().url().optional(),
  college: z.string().max(200).optional(),
  department: z.string().max(100).optional(),
  year: z.number().int().min(1).max(6).optional(),
  hostelBlock: z.string().max(50).optional(),
  roomNumber: z.string().max(20).optional(),
  bio: z.string().max(500).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type User = z.infer<typeof UserSchema>;

// =============================================================================
// EVENT MODEL
// =============================================================================

export const EventCategorySchema = z.enum(['academic', 'cultural', 'sports', 'technical', 'social', 'workshop']);
export type EventCategory = z.infer<typeof EventCategorySchema>;

export const EventSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().min(10).max(5000),
  category: EventCategorySchema,
  date: z.string(), // ISO date
  time: z.string().optional(),
  location: z.string().max(200),
  organizer: z.string().max(100),
  maxAttendees: z.number().int().positive().optional(),
  registeredCount: z.number().int().min(0).default(0),
  imageUrl: z.string().url().optional(),
  isRegistrationOpen: z.boolean().default(true),
  createdBy: z.string(),
  createdAt: z.string(),
});
export type Event = z.infer<typeof EventSchema>;

export const CreateEventSchema = EventSchema.omit({
  id: true,
  registeredCount: true,
  createdBy: true,
  createdAt: true,
});
export type CreateEvent = z.infer<typeof CreateEventSchema>;

// =============================================================================
// STUDY RESOURCE MODEL
// =============================================================================

export const ResourceTypeSchema = z.enum(['notes', 'previous_paper', 'assignment', 'tutorial', 'book', 'other']);
export type ResourceType = z.infer<typeof ResourceTypeSchema>;

export const StudyResourceSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  subject: z.string().min(1).max(100),
  resourceType: ResourceTypeSchema,
  fileUrl: z.string().url().optional(),
  externalLink: z.string().url().optional(),
  uploadedBy: z.string(),
  uploaderName: z.string(),
  downloads: z.number().int().min(0).default(0),
  upvotes: z.number().int().min(0).default(0),
  tags: z.array(z.string().max(50)).max(10).optional(),
  createdAt: z.string(),
});
export type StudyResource = z.infer<typeof StudyResourceSchema>;

// =============================================================================
// OPPORTUNITY MODEL
// =============================================================================

export const OpportunityTypeSchema = z.enum(['internship', 'placement', 'freelance', 'research', 'scholarship', 'competition']);
export type OpportunityType = z.infer<typeof OpportunityTypeSchema>;

export const OpportunitySchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  type: OpportunityTypeSchema,
  description: z.string().min(10).max(5000),
  location: z.string().max(200),
  stipend: z.string().max(50).optional(),
  deadline: z.string().optional(), // ISO date
  applyLink: z.string().url().optional(),
  postedBy: z.string(),
  createdAt: z.string(),
});
export type Opportunity = z.infer<typeof OpportunitySchema>;
