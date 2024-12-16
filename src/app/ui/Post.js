'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { addOrRemoveLike} from "@/lib/actions";
import AddCommentModal from "./AddCommentModal";
import { v4 as uuidv4 } from 'uuid';

export default function Post( { post, isLiked, accountInfo } ){
    console.log(post)
    const [heartFlag, setHeartFlag] = useState(isLiked);
    const [likesCount, setLikesCount] = useState(post.postLikes.length);

    const uid = uuidv4();

    const router = useRouter();
    
    function postClick(e, postId){
        if(e.target instanceof HTMLDivElement || e.target instanceof HTMLParagraphElement){
            router.push(`/post/${postId}`)
        } else {
            console.log("something else")
        }
    }

    async function toggleLike(){
        const flag = heartFlag == true ? false : true;
        if(flag){
            addOrRemoveLike(accountInfo.accountId, post.postId, "add");
            setLikesCount(likesCount+1)
        } else {
            addOrRemoveLike(accountInfo.accountId, post.postId, "remove");
            setLikesCount(likesCount-1)
        }
        setHeartFlag(flag);
        
    }

    return(
        <div className="card bg-base-100 w-96 shadow-xl mt-[12px] cursor-pointer" onClick={(e)=>postClick(e, post.postId)}>
            <div className="card-body">
                <div className="flex">
                    <Image src={"/pfp1.svg"} height={20} width={20} alt="profile avatar"/>
                    <a className="card-title ml-[8px] hover:bg-base-300" href={`/account/${post.postedBy}`}>{post.account}</a>
                </div>
                <p>{post.postText}</p>
                <div className="card-actions justify-end">
                    <AddCommentModal post={post} accountInfo={accountInfo} uid={uid}/>
                    {heartFlag ? <button className="btn btn-ghost" onClick={toggleLike}><Image src={"/heartRed1.svg"} height={20} width={20} alt="like button"/>{likesCount}</button> :
                    <button className="btn btn-ghost" onClick={toggleLike}><Image src={"/heart1.svg"} height={20} width={20} alt="like button"/>{likesCount}</button>}   
                </div>
            </div>
        </div>
    )
    
}