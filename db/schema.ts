import { pgTable, text, serial, timestamp, varchar, uuid } from 'drizzle-orm/pg-core';

export const notices = pgTable('notices', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 50 }).notNull(), // Academic, Events, Holidays, General
  date: timestamp('date').notNull(),
  attachmentUrl: text('attachment_url'), // Optional PDF or image attachment
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const studyMaterials = pgTable('study_materials', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  fileUrl: text('file_url').notNull(),
  class: varchar('class', { length: 10 }).notNull(), // 9, 10, 11, 12
  subject: varchar('subject', { length: 100 }).notNull(),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
});

export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // pending, read, resolved
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Notice = typeof notices.$inferSelect;
export type NewNotice = typeof notices.$inferInsert;

export type StudyMaterial = typeof studyMaterials.$inferSelect;
export type NewStudyMaterial = typeof studyMaterials.$inferInsert;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert; 


export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // References auth.users
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 20 }).default('student').notNull(), // student, admin
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
