'use client';

import { deletePost } from "@/lib/actions"

import Image from "next/image"


function submit(postId){
    deletePost(postId)
}

export default function DeleteButton({postId}){
    return(
        <button type="button" className="self-center btn btn-ghost p-0" onClick={()=>submit(postId)}><Image src={"/trash1.svg"} height={15} width={15} alt="delete button"/></button>
    )
}