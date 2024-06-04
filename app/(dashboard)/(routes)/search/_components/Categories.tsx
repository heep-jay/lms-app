"use client";
import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
  FcGraduationCap,
  FcBearish,
} from "react-icons/fc";
import CategoryItem from "./CategoryItem";

interface Props {
  items: Category[];
}
const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  Engineering: FcEngineering,
  Arts: FcMusic,
  Filming: FcFilmReel,
  "Maths & Physics": FcGraduationCap,
  Trading: FcBearish,
};
const Categories = ({ items }: Props) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-4">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          value={item.id}
          icon={iconMap[item.name]}
        />
      ))}
    </div>
  );
};

export default Categories;
