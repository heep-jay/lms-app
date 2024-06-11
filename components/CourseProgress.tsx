import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "default" | "success";
  value: number;
  size: "default" | "sm";
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};
const sizeByVariant = {
  default: "text-sm",
  success: "text-xs",
};
const CourseProgress = ({ variant, value }: Props) => {
  return (
    <div className="w-full">
      <Progress value={value} className="h-2 w-full" variant={variant} />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariant[variant || "default"],
          sizeByVariant[variant || "default"]
        )}
      >
        {Math.round(value)}%
      </p>
    </div>
  );
};

export default CourseProgress;
