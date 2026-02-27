import { db } from "@/configs/db";
import { Chapters } from "@/configs/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req) {
  try {
    const { courseId, chapterId } = await req.json();

    if (!courseId || !chapterId) {
      return Response.json({
        success: false,
        message: "Missing courseId or chapterId",
      });
    }

    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters.chapterId, chapterId),
          eq(Chapters.courseId, courseId)
        )
      );

    console.log(result);

    if (!result.length) {
      return Response.json({
        success: false,
        message: "Chapter not found",
      });
    }

    return Response.json({
      success: true,
      chapter: result[0],
    });

  } catch (error) {
    console.error("GET CHAPTER CONTENT ERROR:", error);
    return Response.json({
      success: false,
      message: "Server error",
    });
  }
}
