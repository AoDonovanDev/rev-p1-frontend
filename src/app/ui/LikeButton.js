'use client'

import Image from "next/image"
import { addOrRemoveLike } from "@/lib/actions";
import { useContext } from "react";
import { AccountContext } from "../AccountContext";

export default function LikeButton({heartFlag, likesCount, setHeartFlag, setPostState, postState, setNewLikedPosts}){
    
    const accountInfo = useContext(AccountContext);

    async function toggleLike(){
        const flag = heartFlag == true ? false : true;
        if(flag){
            addOrRemoveLike(accountInfo.accountId, postState.postId, "add");
            setNewLikedPosts(lp => {
                const copy = [...lp];
                copy.push(postState);
                return copy
            });
            setPostState(ps => {
                const copy = {...ps};
                copy.postLikes.push(accountInfo.accountId);
                return copy
            })
        } else {
            addOrRemoveLike(accountInfo.accountId, postState.postId, "remove");
            setNewLikedPosts(lp => {
                const copy = lp;
                return copy.filter(lp => lp.postId != postState.postId)
            });
            setPostState(ps => {
                const copy = {...ps};
                copy.postLikes = copy.postLikes.pop()
                return copy;
            })
        }
        setHeartFlag(flag);
    }
    
    return(
         heartFlag ? <button className="btn btn-ghost" onClick={toggleLike}><Image src={"/heartRed1.svg"} height={20} width={20} alt="like button"/>{likesCount}</button> :
                    <button className="btn btn-ghost" onClick={toggleLike}><Image src={"/heart1.svg"} height={20} width={20} alt="like button"/>{likesCount}</button>  
    )
}