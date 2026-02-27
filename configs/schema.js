import { boolean } from "drizzle-orm/gel-core";
import { integer, json, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable('CourseList', {
  id: serial('id').primaryKey(),

  courseId: varchar('courseId').notNull().unique(),

  name: varchar('name').notNull(),
  category: varchar('category').notNull(),
  topic: varchar('topic').notNull(),
  description: varchar("description").notNull(),
  level: varchar('level').notNull(),
  duration: varchar('duration').notNull(),
  includeVideo:varchar('includeVideo').notNull().default('Yes'),
   imageUrl: varchar("imageUrl"), // ✅ ADD THIS
   publish:boolean('publish').default(false),

  courseOutput: json('courseOutput').notNull(),

  createdBy: varchar('createdBy').notNull(),
  userName: varchar('username'),
  userProfileImage: varchar('userProfileImage'),

  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})

export const Chapters=pgTable('Chapters',{
  id:serial('id').primaryKey(),
  courseId:varchar('courseId').notNull(),
  chapterId:integer('chapterId').notNull(),
  content:json('content').notNull(),
  videoId:varchar('videoId').notNull()
});
