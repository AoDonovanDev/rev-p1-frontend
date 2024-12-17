'use client'

import Post from "./Post"
import { v4 as uuidv4 } from 'uuid';

export default function AccountDetail( { account } ){

    return(
        <div className="flex flex-col items-center">
            <div className="card bg-base-200 w-96">
                <div className="card-body">
                    <h2 className="card-title">{account.username}</h2>
                    <p>followers: {account.followedBy.length}</p>
                    <p>following: {account.following.length}</p>
                </div>
            </div>
            {account.posts.length && account.posts.map(p => {
                const isLiked = account.likedPosts.filter(lp => lp.postId == p.postId).length > 0;
                return <Post post={p} isLiked={isLiked} accountInfo={account} key={uuidv4()}/>
                }
            )}
        </div>
    )
}