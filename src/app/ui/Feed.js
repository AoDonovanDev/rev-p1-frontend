'use client'
import { useState } from "react"
import Post from "./Post"
import { v4 as uuidv4 } from 'uuid';

export default function Feed( { accountInfo, likedPosts, posts } ){
    return (
        <div className="flex flex-col items-center">
            {posts.map(p => {
                console.log(p.postId)
                const isLiked = likedPosts.filter(lp => lp.postId == p.postId).length > 0;
                return <Post post={p} key={uuidv4()} isLiked={isLiked} accountInfo={accountInfo}/>
                }
            )}
        </div>
    )
}