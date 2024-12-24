'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useContext } from "react";
import { usePathname } from "next/navigation";
import AddCommentModal from "./modals/AddCommentModal";
import LikeButton from "./buttons/LikeButton";
import Link from "next/link";
import { AccountContext } from "../AccountContext";
import DeleteButton from "./buttons/DeleteButton";

export default function Post({ post, toggleView }){

    const [commentsCount, setCommentsCount] = useState(post?.comments.length);

    const { accountInfo } = useContext(AccountContext);
    const router = useRouter();
    const path = usePathname();
    const isAccountPage = path.includes("account");
    const timePosted = new Date(post.timePostedEpoch);
  
    function postClick(e, postId){
        if(e.target instanceof HTMLDivElement || e.target instanceof HTMLParagraphElement){
            router.push(`/post/${postId}`)
        } else {
            console.log("something else")
        }
    }
    

    return(
        <div className="card bg-base-100 w-96 shadow-lg mt-[12px] cursor-pointer" onClick={(e)=>postClick(e, post.postId)}>
            <div className="card-body">
                {!isAccountPage &&  <div className="flex">
                    <Image src={"/pfp1.svg"} height={20} width={20} alt="profile avatar"/>
                    <Link className="card-title ml-[8px] hover:bg-base-300" href={`/account/${post.postedBy}`}>{post.account}</Link>
                </div>}
                <p>{post.postText}</p>
                <div className="card-actions justify-end">
                <p className="text-xs self-center">{timePosted.toString().slice(0,21)}</p>
                    <div className="flex items-center">
                    <AddCommentModal post={post} setCommentsCount={setCommentsCount} commentsCount={commentsCount}/>
                    </div>
                    <LikeButton />
                    {accountInfo.accountId == post.postedBy ? <DeleteButton postId={post.postId} toggleView={toggleView}/> : <></>}
                </div>
            </div>
        </div>
    )
    
}