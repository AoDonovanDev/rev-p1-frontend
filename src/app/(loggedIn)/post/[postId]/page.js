import { getAccountInfo } from "@/lib/actions"
import { getPostById } from "@/lib/actions"
import PostDetail from "@/app/ui/PostDetail";


export default async function Page({params}){

    const { postId } = params;
    const post = await getPostById(postId);


    console.log(post);


    return (
        <div className="flex flex-col items-center">
            <PostDetail post={post} />
        </div>
    )
}