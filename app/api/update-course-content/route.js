import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { courseId, updatedCourse } = await req.json();

    if (!courseId || !updatedCourse) {
      return Response.json(
        { success: false, error: "Missing courseId or updatedCourse" },
        { status: 400 }
      );
    }

    await db
      .update(CourseList)
      .set({
        courseOutput: updatedCourse
      })
      .where(eq(CourseList.courseId, courseId));

    return Response.json({
      success: true,
      message: "Course content updated successfully",
    });

  } catch (error) {
    console.error("UPDATE COURSE CONTENT ERROR:", error);

    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
