import { getAccountInfo } from "@/lib/actions"
import { getAllPosts } from "@/lib/actions";
import Feed from "../../ui/Feed";

export default async function Page(){

    const posts = await getAllPosts();
    
    return (
        <Feed posts={posts}/>
    )
}