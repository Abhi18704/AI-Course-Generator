import { db } from "@/configs/db";
import { CourseList, Chapters } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { courseId } = await req.json();

    // 🧹 Delete chapters first (FK safety)
    await db.delete(Chapters).where(eq(Chapters.courseId, courseId));

    // 🗑 Delete course
    await db.delete(CourseList).where(eq(CourseList.courseId, courseId));

    return Response.json({ success: true });

  } catch (err) {
    console.error("DELETE COURSE ERROR:", err);
    return Response.json({ success: false });
  }
}
