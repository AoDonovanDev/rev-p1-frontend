import { getAccountInfo } from "@/lib/actions"
import { getAllPosts } from "@/lib/actions";
import Feed from "../../ui/Feed";

export default async function Page(){

    const account = await getAccountInfo();

    const { likedPosts } = account;

    console.log("some info: ", account, likedPosts)
    const posts = await getAllPosts();
    
    return (
        <Feed accountInfo={account} likedPosts={likedPosts} posts={posts}/>
    )
}