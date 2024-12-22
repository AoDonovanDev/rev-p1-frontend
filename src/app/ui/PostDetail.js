'use client'

import Comment from "./Comment";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";
import Post from "./Post";
import { useContext } from "react";
import { AccountContext } from "../AccountContext";


export default function PostDetail( { post } ){

    const { accountInfo } = useContext(AccountContext);
    const { likedPosts } = accountInfo;

    return (
        <div className="flex flex-col items-center">
            <Post post={post} accountInfo={accountInfo} likedPosts={likedPosts}/>
            {post.comments.map(c => <Comment comment={c} key={uuidv4()}/>)}
        </div>
    )
}