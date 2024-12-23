'use client';

import Navbar from "./Navbar";
import Feed from "./Feed";
import { usePathname, useRouter } from "next/navigation";
import { AccountContext } from "../AccountContext";
import { useEffect, useReducer, useState } from "react";
import { revalidateFeed } from "@/lib/actions";
import { ViewContext } from "../ViewContext";

export default function LoggedInContainer({asyncAccountInfo, allPosts, children}){

    const path = usePathname();
    const { replace } = useRouter();

    const [view, setView] = useState({
            name: "all",
            posts: allPosts
        })
    const [accountInfo, setAccountInfo] = useState(asyncAccountInfo);

    useEffect(() => {
        setAccountInfo(asyncAccountInfo)
    }, [asyncAccountInfo])

    const { postsByFollowing } = accountInfo;

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
                replace("/feed")
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
                console.log("AHHHHHHHHHHHHHHHHHHHHHHHHH")
                setView(view => {
                    return {...view}
                })
            }
            replace(`/feed`);
        }



    return (
        <AccountContext.Provider value={{accountInfo, setAccountInfo}}>
            <ViewContext.Provider value={{view, setView, toggleView}}>
            <div className="lg:mx-[200px]">
                <Navbar toggleView={toggleView}/>
                {path.includes("feed") && <Feed view={view} toggleView={toggleView}/>}
                {children}
            </div>
            </ViewContext.Provider>
        </AccountContext.Provider>

    )
}