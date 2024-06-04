import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { url } from "inspector";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const { url } = await req.json();

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
    const attachments = await db.attachment.create({
      data: {
        name: url.split("/").pop(),
        url,
        courseId: courseId,
      },
    });
    return NextResponse.json(attachments);
  } catch (error) {
    console.log("[COURSE_ID]_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
