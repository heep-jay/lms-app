import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updateChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });
    if (!publishedChapters.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(updateChapter);
  } catch (error) {
    console.log("[UNPUBLISH CHAPTER ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
