import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { courseId, userEmail, updatedCourseOutput } = await req.json();

    // ================= GET COURSE =================
    if (!updatedCourseOutput) {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, courseId),
            eq(CourseList.createdBy, userEmail)
          )
        );

      return Response.json({
        success: true,
        course: result[0],
      });
    }

    // ================= UPDATE COURSE =================
    await db
      .update(CourseList)
      .set({
        courseOutput: updatedCourseOutput,
      })
      .where(eq(CourseList.courseId, courseId));

    return Response.json({
      success: true,
      message: "Course updated successfully",
    });

  } catch (error) {
    console.error("COURSE API ERROR:", error);
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
