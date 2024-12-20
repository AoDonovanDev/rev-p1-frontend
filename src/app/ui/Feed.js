'use client'
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../AccountContext";
import Post from "./Post"
import { v4 as uuidv4 } from 'uuid';

export default function Feed({view, allPosts}){

    const accountInfo = useContext(AccountContext);
    const { likedPosts, postsByFollowing } = accountInfo;
    const [shownPosts, setShownPosts] = useState([]);
    const [newLikedPosts, setNewLikedPosts] = useState(likedPosts)

    useEffect(()=> {
        const shownPosts = view == "all" ? allPosts : postsByFollowing;
        setShownPosts(shownPosts);
    },[view, allPosts])


    
    return (
        <div className="flex flex-col items-center">
            {shownPosts?.map(p => {
                return <Post key={uuidv4()} post={p} likedPosts={newLikedPosts} setNewLikedPosts={setNewLikedPosts}/>
                }
            )}
        </div>
    )
}