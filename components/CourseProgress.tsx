

interface Props{
    variant? :"default" | "success";
    value: number;
    size:"default" | "sm"
}

const colorByVariant ={
    default: "text-sky-700",
    success: "text-emerald-700"
}
const sizeByVariant ={
    default: "text-sm",
    success: "text-xs",
}
const CourseProgress = ({variant, value}: Props) => {
  return (
    <div>CourseProgress</div>
  )
}

export default CourseProgress