'use client'

import Image from "next/image"
import { addOrRemoveLike } from "@/lib/actions";
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";
import { ViewContext } from "../ViewContext";

export default function LikeButton({post}){
    
    const { accountInfo, setAccountInfo } = useContext(AccountContext);
    const { setView } = useContext(ViewContext);
    const [likeState, setLikeState] = useState({
        isLiked: post.postLikes.includes(accountInfo.accountId),
        likesCount: post.postLikes.length
    })
    

    function toggleLike(){
        const newLikeState = {...likeState}
        if(!newLikeState.isLiked){
            addOrRemoveLike(accountInfo.accountId, post.postId, "add");
            newLikeState.likesCount += 1;
        } else {
            addOrRemoveLike(accountInfo.accountId, post.postId, "remove");
            newLikeState.likesCount -= 1;
        }
        setLikeState({
            ...newLikeState,
            isLiked: newLikeState.isLiked ? false: true
        })
        
    }
    
    return(
        likeState.isLiked ? <button className="btn btn-ghost" onClick={toggleLike}><Image src={"/heartRed1.svg"} height={20} width={20} alt="like button"/>{likeState.likesCount}</button> :
                    <button className="btn btn-ghost" onClick={toggleLike}><Image src={"/heart1.svg"} height={20} width={20} alt="like button"/>{likeState.likesCount}</button>  
    )
}