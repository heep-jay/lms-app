import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Courses = async () => {
  const { userId } = auth();

  if (!userId) redirect("/");
  const courses = await db.course.findMany({
    where: {
      userId: userId,
    },
  });
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default Courses;
