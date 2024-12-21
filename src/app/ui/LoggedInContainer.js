'use client';

import Navbar from "./Navbar";
import Feed from "./Feed";
import { usePathname, useRouter } from "next/navigation";
import { AccountContext } from "../AccountContext";
import { useState } from "react";
import { revalidateFeed } from "@/lib/actions";
import { ViewContext } from "../ViewContext";

export default function LoggedInContainer({accountInfo, allPosts, children}){

    const path = usePathname();
    const { replace } = useRouter();


    const { postsByFollowing } = accountInfo;

    const [view, setView] = useState({
            name: "all",
            posts: allPosts
        });
    
    async function toggleView(str, newPost){
        switch(str){
            case "all":
                setView({
                    name: "all",
                    posts: allPosts
                });
                replace("/feed")
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
            await revalidateFeed();
        }



    return (
        <AccountContext.Provider value={accountInfo}>
            <ViewContext.Provider value={{view, setView}}>
            <div className="lg:mx-[200px]">
                <Navbar toggleView={toggleView}/>
                {(path.includes("feed") || path.includes("search")) && <Feed view={view} toggleView={toggleView}/>}
                {children}
            </div>
            </ViewContext.Provider>
        </AccountContext.Provider>

    )
}