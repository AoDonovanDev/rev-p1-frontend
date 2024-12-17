import Image from "next/image"
import { v4 as uuidv4 } from 'uuid';

import { useEffect, useState } from "react";

export default function AddCommentModal({ post, accountInfo }){

    const [uid, setUid] = useState("")

    useEffect(()=>{
        setUid(uuidv4())
    }, [])

    return (
        <div>
            <button className="btn btn-ghost" onClick={()=>document.getElementById(`${uid}`).showModal()}><Image src={"/comment1.svg"} height={20} width={20} alt="comment button" /></button>
            <dialog id={uid} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">@{post.account}</h3>
                    <p className="py-4">{post.postText}</p>
                    <div className="flex w-full">
                        <form method="dialog" className="flex flex-col justify-around w-full">
                            <textarea className="textarea textarea-bordered self-start w-full" placeholder="Comment" name="commentText"></textarea>
                            <button style={{position: "relative", top: "50px"}}><Image src={"/cancel2.svg"} height={40} width={40} alt="cancel button"/></button>
                            <button className="btn self-end" style={{position: "relative", bottom: "200px"}}>Reply</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
    
}