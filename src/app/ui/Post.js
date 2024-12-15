'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Post( { post, isLiked } ){

    const router = useRouter();

    function postClick(e, postId){
        if(e.target instanceof HTMLDivElement || e.target instanceof HTMLParagraphElement){
            console.log("its the goddamn post")
            router.push(`/post/${postId}`)
        } else {
            console.log("something else")
        }
    }

    async function toggleLike(){
        
    }

    return(
        <div className="card bg-base-100 w-96 shadow-xl mt-[12px] cursor-pointer" onClick={(e)=>postClick(e, post.postId)}>
            <div className="card-body">
                <div className="flex">
                    <Image src={"/pfp1.svg"} height={20} width={20} alt="profile avatar"/>
                    <a className="card-title ml-[8px]">{post.account}</a>
                </div>
                <p>{post.postText}</p>
                <div className="card-actions justify-end">
                    <a className="btn btn-ghost"><Image src={"/comment1.svg"} height={20} width={20} alt="comment button"/></a>
                    {isLiked ? <a className="btn btn-ghost"><Image src={"/heartRed1.svg"} height={20} width={20} alt="like button"/></a> :
                    <a className="btn btn-ghost"><Image src={"/heart1.svg"} height={20} width={20} alt="like button"/></a>
                    }   
                </div>
            </div>
        </div>
    )
    
}