'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useContext } from "react";
import { AccountContext } from "../AccountContext";
import { addOrRemoveLike} from "@/lib/actions";
import { usePathname } from "next/navigation";
import AddCommentModal from "./AddCommentModal";

export default function Post( { post, isLiked, accountInfo } ){
    const [heartFlag, setHeartFlag] = useState(isLiked);
    const [likesCount, setLikesCount] = useState(post.postLikes.length);

    const router = useRouter();
    const path = usePathname();
    const isAccountPage = path.includes("account");
  
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
                {!isAccountPage &&  <div className="flex">
                    <Image src={"/pfp1.svg"} height={20} width={20} alt="profile avatar"/>
                    <a className="card-title ml-[8px] hover:bg-base-300" href={`/account/${post.postedBy}`}>{post.account}</a>
                </div>}
                <p>{post.postText}</p>
                <div className="card-actions justify-end">
                    <AddCommentModal post={post} accountInfo={accountInfo}/>
                    {heartFlag ? <button className="btn btn-ghost" onClick={toggleLike}><Image src={"/heartRed1.svg"} height={20} width={20} alt="like button"/>{likesCount}</button> :
                    <button className="btn btn-ghost" onClick={toggleLike}><Image src={"/heart1.svg"} height={20} width={20} alt="like button"/>{likesCount}</button>}   
                </div>
            </div>
        </div>
    )
    
}