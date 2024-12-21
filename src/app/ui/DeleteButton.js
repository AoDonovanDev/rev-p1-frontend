'use client';

import { deletePost } from "@/lib/actions"

import Image from "next/image"


export default function DeleteButton({postId, toggleView}){

    function submit(postId){
        deletePost(postId);
        toggleView("delete", postId);
    }
    
    return(
        <button type="button" className="self-center btn btn-ghost p-0" onClick={()=>submit(postId)}><Image src={"/trash1.svg"} height={15} width={15} alt="delete button"/></button>
    )
}