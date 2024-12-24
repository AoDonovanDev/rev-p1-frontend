'use client'

import { useContext, useEffect, useState } from "react";
import Feed from "../Feed";
import { AccountContext } from "../../AccountContext";
import { ViewContext } from "../../ViewContext";
import Navbar from "../Navbar";
import { revalidateFeed } from "@/lib/actions";

export default function FeedContainer({ allPosts }){
    
    const { accountInfo } = useContext(AccountContext)
    const { postsByFollowing } = accountInfo;
    const [view, setView] = useState({
        name: "all",
        posts: allPosts
    })


    async function toggleView(str, newPost){
        switch(str){
            case "all":
                setView({
                    name: "all",
                    posts: allPosts
                });
                break;
            case "following":
                setView({
                    name: "following",
                    posts: postsByFollowing
                })
                break;
            case "add":
                setView(view => {
                    const copy = {...view};
                    copy.posts = [...copy.posts, newPost];
                    return copy;

                })
                break;
            case "delete":
                setView(view => {
                    const copy = {...view};
                    copy.posts = copy.posts.filter(p => p.postId != newPost);
                    return copy;
                })
            default:
                setView(view => {
                    return {...view}
                })
            }
            revalidateFeed();
        }

    useEffect(()=> {
        setView(view => {
            const copy = {...view};
            return copy;
        })
    }, [accountInfo])



    return (
        <ViewContext.Provider value={{view, setView}}>
            <Navbar toggleView={toggleView}/>
            <Feed view={view} toggleView={toggleView}/>
        </ViewContext.Provider>
    )
}