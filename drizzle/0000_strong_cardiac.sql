CREATE TABLE "CourseList" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"name" varchar NOT NULL,
	"category" varchar NOT NULL,
	"topic" varchar NOT NULL,
	"description" varchar NOT NULL,
	"level" varchar NOT NULL,
	"duration" varchar NOT NULL,
	"courseOutput" json NOT NULL,
	"createdBy" varchar NOT NULL,
	"username" varchar,
	"userProfileImage" varchar,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "CourseList_courseId_unique" UNIQUE("courseId")
);
