'use client'

import Post from "./Post"
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";
import { addOrRemoveFollower } from "@/lib/actions";

export default function AccountDetail( { account } ){


    const accountInfo = useContext(AccountContext);
    const flag = accountInfo?.following.filter(acc => acc.accountId = account.accountId).length > 0;
    const [following, setFollowing] = useState(flag);

    const { likedPosts } = accountInfo;
    const [newLikedPosts, setNewLikedPosts] = useState(likedPosts)

    function toggleFollow(){
        const addRemove = following ? "remove" : "add";
        addOrRemoveFollower(accountInfo.accountId, account.accountId, addRemove);
        setFollowing(following == true ? false : true);
    }

    return(
        <div className="flex flex-col items-center cursor-default">
            <div className="card bg-base-200 w-96">
                <div className="card-body">
                    <div className="flex w-full justify-between">
                        <h2 className="card-title">{account.username}</h2>
                        <div className="flex btn" onClick={toggleFollow}>
                            {following ? <><Image src={"/following1.svg"} height={20} width={20} alt="add follower button"/>
                            <p className="w-[60px]">Following</p></>:
                            <><Image src={"/addFollower3.svg"} height={20} width={20} alt="add follower button"/>
                            <p className="w-[60px]">Follow</p></>
                            }
                        </div>
                    </div>
                    <p>followers: {account.followedBy.length}</p>
                    <p>following: {account.following.length}</p>
                </div>
            </div>
            {account.posts.length && account.posts.map(p => {
                return <Post key={uuidv4()} post={p} likedPosts={newLikedPosts} setNewLikedPosts={setNewLikedPosts}/>
                }
            )}
        </div>
    )
}