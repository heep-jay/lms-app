"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import axios from "axios";
import toast from "react-hot-toast";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";

import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";

interface Props {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1, {
    message: "URL must be at least 1 characters & is required.",
  }),
});

const AttachmentForm = ({ initialData, courseId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated!!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success(`Attachment Deleted`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4  mr-2" />
              Add an attachment
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attatchment) => (
                <div
                  key={attatchment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 text-sky-700 rounded-md "
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attatchment.name}</p>
                  {deletingId === attatchment.id && (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attatchment.id && (
                    <button
                      onClick={() => onDelete(attatchment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4 " />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div className="">
          <FileUpload
            endpoint="courseAttachments"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your student might need to complete the course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
