import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { courseId } = await req.json();

    await db
      .update(CourseList)
      .set({ publish: true })
      .where(eq(CourseList.courseId, courseId));

    return Response.json({ success: true });

  } catch (err) {
    console.error("PUBLISH ERROR:", err);
    return Response.json({ success: false });
  }
}
