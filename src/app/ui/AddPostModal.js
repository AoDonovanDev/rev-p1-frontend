'use client'

import { useContext } from "react"
import Image from "next/image"
import { AccountContext } from "../AccountContext"
import { addPost } from "@/lib/actions"

export default function AddPostModal(){

    const accountInfo = useContext(AccountContext);

    async function submit(formData){
        await addPost(formData);
        document.getElementById("add_post_modal").close();
    }

    function close(){
        document.getElementById("add_post_modal").close();
    }

    return(
        <>
            <button className="btn btn-primary" onClick={()=>document.getElementById('add_post_modal').showModal()}>NEW POST<Image src={"/newPost2.svg"} height={40} width={40} alt="new post button" className="p-0" /></button>
            <dialog id="add_post_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg my-[20px]">New Post</h3>
                <div className="flex w-full">
                    <form className="flex flex-col justify-around w-full" action={(formData)=>submit(formData)}>
                        <textarea className="textarea textarea-bordered self-start w-full" placeholder="What's up?" name="postText"></textarea>
                        <input type="text" hidden defaultValue={accountInfo.accountId} name="accountId" />
                        <button type="button" style={{position: "relative", top: "25px"}} onClick={close}><Image src={"/cancel2.svg"} height={40} width={40} alt="cancel button"/></button>
                        <button className="btn btn-primary self-end" style={{position: "relative", bottom: "175px"}}>POST</button>
                    </form>
                </div>
            </div>
            </dialog>
        </>
    )
}