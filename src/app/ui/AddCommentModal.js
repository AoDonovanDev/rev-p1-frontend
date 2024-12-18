import Image from "next/image"
import { v4 as uuidv4 } from 'uuid';
import { addComment } from "@/lib/actions";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AddCommentModal({ post, accountInfo }){

    const [uid, setUid] = useState("");

    const path = usePathname();

    useEffect(()=>{
        setUid(uuidv4())
    }, [])


    async function submit(formData){
        console.log(formData)
        await addComment(formData);
        document.getElementById(`${uid}`).close();
    }

    function close(){
        document.getElementById(`${uid}`).close();
    }

    return (
        <div>
            <button className="btn btn-ghost" onClick={()=>document.getElementById(`${uid}`).showModal()}><Image src={"/comment1.svg"} height={20} width={20} alt="comment button" /></button>
            <dialog id={uid} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">@{post.account}</h3>
                    <p className="py-4">{post.postText}</p>
                    <div className="flex w-full">
                        <form className="flex flex-col justify-around w-full" action={(formData) => submit(formData)}>
                            <textarea className="textarea textarea-bordered self-start w-full" placeholder="Comment" name="commentText"></textarea>
                            <input type="text" hidden defaultValue={post.postId} name="cmPostId"/>
                            <input type="text" hidden defaultValue={accountInfo.accountId} name="commentedBy"/>
                            <input type="text" hidden defaultValue={path} name="path" />
                            <button style={{position: "relative", top: "50px"}} onClick={close}><Image src={"/cancel2.svg"} height={40} width={40} alt="cancel button"/></button>
                            <button className="btn self-end" style={{position: "relative", bottom: "200px"}}>Reply</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
    
}