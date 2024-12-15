import { getAccountInfo } from "@/lib/actions"
import { getAllPosts } from "@/lib/actions";
import Post from "../ui/Post";
import { v4 as uuidv4 } from 'uuid';

export default async function Page(){

    const { accJson } = await getAccountInfo();

    const { accountInfo } = JSON.parse(accJson); 

    const { likedPosts } = accountInfo;

    console.log("some info: ", accountInfo, likedPosts)
    const posts = await getAllPosts();
    
    return (
        <div className="flex flex-col items-center">
            {posts.map(p => {
                console.log(p.postId)
                const isLiked = likedPosts.filter(lp => lp.postId == p.postId).length > 0;
                return <Post post={p} key={uuidv4()} isLiked={isLiked}/>
                }
            )}
        </div>
        
    )
}