import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ChapterPages = async({
    params
}:{params: {courseId: string; chapterId:string}
}) => {

    const { userId } = auth();

    if(!userId) redirect('/')
        
    return (
        <div>Chapter page</div>
    )
}

export default ChapterPages;