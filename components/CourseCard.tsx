import Image from "next/image";
import Link from "next/link";
import IconBadge from "./IconBadge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import CourseProgress from "./CourseProgress";

interface Props {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number | null;
  category: string;
  price: number;
  progress: number | null;
}
const CourseCard = ({
  id,
  title,
  imageUrl,
  category,
  chaptersLength,
  price,
  progress,
}: Props) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border  rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md">
          <Image
            fill
            className="object-cover rounded-md"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex-flex-col p-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <div className="">
              <CourseProgress size="sm" value={progress} variant={progress === 100 ? "success": "default"} />
            </div>
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
