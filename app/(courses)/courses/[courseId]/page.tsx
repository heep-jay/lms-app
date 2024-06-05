import { db } from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
const WatchCourse = async ({ params }: { params: { courseId: string } }) => {
  const courseId = params.courseId;

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    redirect("/");
  }

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};

export default WatchCourse;
