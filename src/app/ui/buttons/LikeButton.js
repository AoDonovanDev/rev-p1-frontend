'use client'

import Image from "next/image"
import { addOrRemoveLike } from "@/lib/actions";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../../AccountContext";
import { ViewContext } from "../../ViewContext";
import { useRouter } from "next/navigation";
import { PostContext } from "../../PostContext";

export default function LikeButton(){
    
    const { accountInfo, setAccountInfo } = useContext(AccountContext);
    const postContext = useContext(PostContext)
    const [post, setPost] = useState(postContext);
    const [likeState, setLikeState] = useState({})

    useEffect(() => {
        setLikeState({
            isLiked: post.postLikes?.includes(accountInfo.accountId),
            likesCount: post.postLikes?.length
        })
    }, []);

    function toggleLike(){
        const newLikeState = {...likeState}
        if(!newLikeState.isLiked){
            addOrRemoveLike(accountInfo.accountId, post.postId, "add");
            newLikeState.likesCount += 1;
            setPost(p => {
                const copy = {...p};
                copy.postLikes = [...copy.postLikes, accountInfo.accountId];
                return copy;
            })
        } else {
            addOrRemoveLike(accountInfo.accountId, post.postId, "remove");
            newLikeState.likesCount -= 1;
            setPost(p => {
                const copy = {...p};
                copy.postLikes = copy.postLikes.filter(accId => accId != accountInfo.accountId);
                return copy;
            })
        }
        setLikeState({
            ...newLikeState,
            isLiked: newLikeState.isLiked ? false: true
        })
    }
    
    return(
        likeState.isLiked ? <button className="btn btn-ghost" onClick={toggleLike}><Image src={"/heartRed1.svg"} height={20} width={20} alt="like button"/>{post.postLikes?.length}</button> :
                    <button className="btn btn-ghost" onClick={toggleLike}><Image src={"/heart1.svg"} height={20} width={20} alt="like button"/>{post.postLikes?.length}</button>  
    )
}