"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti";
import axios from "axios";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  chapterId: string;
  courseId: string;
  nextChapterId: string;
  isCompleted: boolean;
}
const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore();
  const Icon = isCompleted ? XCircle : CheckCircle;
  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );
      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }
      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
      toast.success("Progress updated");
      setIsLoading(false)
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="!w-full"
    >
      {isCompleted ? "Not Completed" : "Mark as completed"}
      {isLoading ? (
        <Loader2 className="h-4 w-4 ml-2 animate-spin" />
      ) : (
        <Icon className="h-4 w-4 ml-2" />
      )}
    </Button>
  );
};

export default CourseProgressButton;
