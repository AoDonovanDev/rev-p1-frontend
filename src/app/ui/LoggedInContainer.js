'use client';

import Navbar from "./Navbar";
import Feed from "./Feed";
import { usePathname } from "next/navigation";
import { AccountContext } from "../AccountContext";
import { useState } from "react";
import { revalidateFeed } from "@/lib/actions";

export default function LoggedInContainer({accountInfo, allPosts, children}){

    const path = usePathname();


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
            default:
                setView(view => {
                    return {...view}
                })
            }
            await revalidateFeed();
        }



    return (
        <AccountContext.Provider value={accountInfo}>
            <div className="lg:mx-[200px]">
                <Navbar toggleView={toggleView}/>
                {path.includes("feed")&&<Feed view={view} toggleView={toggleView}/>}
                {children}
            </div>
        </AccountContext.Provider>

    )
}