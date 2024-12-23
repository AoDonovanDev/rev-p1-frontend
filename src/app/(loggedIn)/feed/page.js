import { getAllPosts } from "@/lib/actions"
import FeedContainer from "@/app/ui/FeedContainer";

export default async function Page(){

    const allPosts = await getAllPosts();

    return(
       <>
        <FeedContainer allPosts={allPosts}/>
       </>
    )
}