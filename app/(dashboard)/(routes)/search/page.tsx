import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CoursesList from "@/components/CoursesList";

interface Props {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const Search = async ({ searchParams }: Props) => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  //fetch Categories
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  //fetch courses with progress
  const courses = await getCourses({
    userId,
    ...searchParams,
  });
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Search;
