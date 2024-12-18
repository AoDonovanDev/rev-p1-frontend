'use client'
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../AccountContext";
import Post from "./Post"
import { v4 as uuidv4 } from 'uuid';

export default function Feed({view}){

    const accountInfo = useContext(AccountContext);
    const { likedPosts, postsByFollowing, allPosts } = accountInfo;
    const [shownPosts, setShownPosts] = useState([])
    

    useEffect(()=> {
        console.log("here is the view: ", view)
        const shownPosts = view == "all" ? allPosts : postsByFollowing;
        setShownPosts(shownPosts);
    },[view])

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