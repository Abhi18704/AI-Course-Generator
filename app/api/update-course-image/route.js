import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const { courseId, imageUrl } = await req.json();

  await db
    .update(CourseList)
    .set({ imageUrl })
    .where(eq(CourseList.courseId, courseId));

  return Response.json({ success: true });
}
