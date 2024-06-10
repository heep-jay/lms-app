"use client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import { set } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  price: number;
  courseId: string;
}
const CourseEnrollButton = ({ price, courseId }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async ()=> {
        try {
            setIsLoading(true);
         const response = await axios.post(`/api/courses/${courseId}/checkout`);

         window.location.assign(response.data.url);
            
        } catch (error) {
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false);
        }
    }
  return (
    <Button className="w-full lg:w-auto" size="sm" onClick={onClick} disabled={isLoading}>
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
