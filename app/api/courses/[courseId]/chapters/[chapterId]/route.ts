import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const tokenId = process.env.MUX_TOKEN_ID!;
const secretKey = process.env.MUX_TOKEN_SECRET!;
const { video } = new Mux({ tokenId, tokenSecret: secretKey });

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    });
    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }
    if (chapter.videoUrl) {
      const existinMuxData = await db.muxData.findFirst({
        where: {
          chapterId,
        },
      });
      if (existinMuxData) {
        await video.assets.delete(existinMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existinMuxData.id,
          },
        });
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
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
    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_DELETE]", error);
    return new NextResponse(`Internal error: ${error}`, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        ...values,
      },
    });

    // todo MUX VIDEO
    if (values.videoUrl) {
      const existinMuxData = await db.muxData.findFirst({
        where: {
          chapterId,
        },
      });
      if (existinMuxData) {
        await video.assets.delete(existinMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existinMuxData.id,
          },
        });
      }
      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0].id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[Chapter_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
