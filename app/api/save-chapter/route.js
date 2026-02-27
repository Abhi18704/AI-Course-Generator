import { db } from "@/configs/db";
import { Chapters } from "@/configs/schema";
import service from "@/configs/service";

export async function POST(req) {
  try {
    const { courseId, chapterId, content, chapterName, topic } = await req.json();

    const videos = await service.getVideos(`${topic} ${chapterName} tutorial`);
    const videoId = videos[0]?.id?.videoId || "";

    await db.insert(Chapters).values({
      courseId,
      chapterId,
      content,
      videoId,
    });

    return Response.json({ success: true });

  } catch (err) {
    console.error("SAVE CHAPTER ERROR:", err);
    return Response.json({ success: false });
  }
}
