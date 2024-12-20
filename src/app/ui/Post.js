'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useContext, useEffect } from "react";
import { AccountContext } from "../AccountContext";
import { addOrRemoveLike} from "@/lib/actions";
import { usePathname } from "next/navigation";
import AddCommentModal from "./AddCommentModal";
import LikeButton from "./LikeButton";
import Link from "next/link";

export default function Post( { post, likedPosts, setNewLikedPosts } ){
    const [heartFlag, setHeartFlag] = useState(likedPosts.filter(p => p.postId == post.postId).length > 0);
    const [postState, setPostState] = useState(post);
    const [commentsCount, setCommentsCount] = useState(post.comments.length);

    const router = useRouter();
    const path = usePathname();
    const isAccountPage = path.includes("account");
    const timePosted = new Date(post.timePostedEpoch);
  
    function postClick(e, postId){
        if(e.target instanceof HTMLDivElement || e.target instanceof HTMLParagraphElement){
            router.push(`/post/${postId}`)
        } else {
            console.log("something else")
        }
    }
    


    return(
        <div className="card bg-base-100 w-96 shadow-xl mt-[12px] cursor-pointer" onClick={(e)=>postClick(e, post.postId)}>
            <div className="card-body">
                {!isAccountPage &&  <div className="flex">
                    <Image src={"/pfp1.svg"} height={20} width={20} alt="profile avatar"/>
                    <Link className="card-title ml-[8px] hover:bg-base-300" href={`/account/${post.postedBy}`}>{post.account}</Link>
                </div>}
                <p>{post.postText}</p>
                <div className="card-actions justify-end">
                <p className="text-xs self-center">{timePosted.toString().slice(0,21)}</p>
                    <div className="flex items-center">
                        <AddCommentModal post={post} setCommentsCount={setCommentsCount} commentsCount={commentsCount}/>
                    </div>
                    <LikeButton heartFlag={heartFlag} likesCount={postState.postLikes.length} setHeartFlag={setHeartFlag} setPostState={setPostState} postState={postState} setNewLikedPosts={setNewLikedPosts}/>
                </div>
            </div>
        </div>
    )
    
}