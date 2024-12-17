'use client'
import { useContext } from "react";
import { AccountContext } from "../AccountContext";
import Post from "./Post"
import { v4 as uuidv4 } from 'uuid';

export default function Feed( { posts } ){

    const accountInfo = useContext(AccountContext);
    const { likedPosts } = accountInfo;


    return (
        <div className="flex flex-col items-center">
            {posts.map(p => {
                console.log(p.postId)
                const isLiked = likedPosts?.filter(lp => lp.postId == p.postId).length > 0;
                return <Post post={p} key={uuidv4()} isLiked={isLiked} accountInfo={accountInfo}/>
                }
            )}
        </div>
    )
}