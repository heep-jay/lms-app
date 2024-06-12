import IconBadge from "@/components/IconBadge";
import { LucideIcon } from "lucide-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { number } from "zod";

interface Props {
  label: string;
  icon: LucideIcon;
  variant?: "default" | "success";
  numberOfItems: number;
}

const InfoCard = ({ icon, label, numberOfItems, variant }: Props) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge icon={icon} variant={variant} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
