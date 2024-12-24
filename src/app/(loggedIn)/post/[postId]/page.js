import { getAccountInfo } from "@/lib/actions"
import { getPostById } from "@/lib/actions"
import PostDetail from "@/app/ui/PostDetail";
import LoggedInContainer from "@/app/ui/containers/LoggedInContainer";


export default async function Page({params}){

    const { postId } = await params;
    const post = await getPostById(postId);


    return (
        <div className="flex flex-col items-center h-screen">
            <PostDetail post={post} />
        </div>
    )
}