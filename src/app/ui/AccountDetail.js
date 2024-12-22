'use client'

import Post from "./Post"
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";
import { addOrRemoveFollower } from "@/lib/actions";
import { ViewContext } from "../ViewContext";

export default function AccountDetail( { account } ){


    const { accountInfo, setAccountInfo } = useContext(AccountContext);
    const flag = accountInfo?.following.filter(acc => acc.accountId == account.accountId).length > 0;
    const [following, setFollowing] = useState(flag);
    const { likedPosts } = accountInfo;
    const [newLikedPosts, setNewLikedPosts] = useState(likedPosts)

    async function toggleFollow(){
        const addRemove = following ? "remove" : "add";
        await addOrRemoveFollower(accountInfo.accountId, account.accountId, addRemove);
        setFollowing(following == true ? false : true);
        setAccountInfo(acc => {
            const copy = {...acc};
            if(addRemove == "remove"){
                copy.following = copy.following.filter(f => f.accountId != account.accountId);
                console.log("should be removed? ", copy.following)
                copy.postsByFollowing = copy.postsByFollowing.filter(p => p.postedBy != account.accountId);
            } else {
                copy.following = [...copy.following, account];
                copy.postsByFollowing = [...copy.postsByFollowing, ...account.posts]
            }
            console.log("huge setstate: ", addRemove, copy)
            return copy;            
        })

    }

    return(
        <div className="flex flex-col items-center cursor-default">
            <div className="card bg-base-200 w-96">
                <div className="card-body">
                    <div className="flex w-full justify-between">
                        <h2 className="card-title">{account.username}</h2>
                        {accountInfo.accountId != account.accountId && <div className="flex btn" onClick={toggleFollow}>
                            {following ? <><Image src={"/following1.svg"} height={20} width={20} alt="add follower button"/>
                            <p className="w-[60px]">Following</p></>:
                            <><Image src={"/addFollower3.svg"} height={20} width={20} alt="add follower button"/>
                            <p className="w-[60px]">Follow</p></>
                            }
                        </div>}
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