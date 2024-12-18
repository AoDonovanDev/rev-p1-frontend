'use client'
import { useContext } from "react";
import { AccountContext } from "../AccountContext";
import Post from "./Post"
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "next/navigation";

export default function Feed(){

    const accountInfo = useContext(AccountContext);
    const { likedPosts, postsByFollowing, allPosts } = accountInfo;
    const { view } = useParams();
    
    const shownPosts = view == "all" ? allPosts : postsByFollowing;

    return (
        <div className="flex flex-col items-center">
            {shownPosts?.map(p => {
                const isLiked = likedPosts?.filter(lp => lp.postId == p.postId).length > 0;
                return <Post post={p} key={uuidv4()} isLiked={isLiked} accountInfo={accountInfo}/>
                }
            )}
        </div>
    )
}