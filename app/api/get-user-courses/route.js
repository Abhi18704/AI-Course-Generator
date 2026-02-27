import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const courses = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.createdBy, email));

    return Response.json({
      success: true,
      courses,
    });

  } catch (err) {
    console.error("GET USER COURSES ERROR:", err);
    return Response.json({ success: false });
  }
}
