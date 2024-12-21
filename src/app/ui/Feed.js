'use client'
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";
import Post from "./Post"
import { v4 as uuidv4 } from 'uuid';
import { revalidateFeed } from "@/lib/actions";

export default function Feed({allPosts}){

    const accountInfo = useContext(AccountContext);
    const { postsByFollowing } = accountInfo;
    const [view, setView] = useState({
        name: "all",
        posts: allPosts
    });

    async function toggleView(str){
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
            default:
                setView(view => {
                    return {...view}
                })
        }
        await revalidateFeed();
    }


    return (
        <div className="flex flex-col items-center">
            <div className="cursor-pointer border-b-[2px] pt-[8px] mb-[16px] flex sm:w-5/6 md:1/3 lg:w-1/4">
                <p className={`font-semibold w-1/2 indent-3 ${view.name == "all" ? "border-b-[4px]" : ""}`} onClick={()=>toggleView("all")}>All</p>
                <p className={`font-semibold ml-[8px] w-1/2 text-right indent-8 ${view.name == "following" ? "border-b-[4px]" : ""}`} onClick={()=>toggleView("following")}>Following &nbsp; &nbsp;</p>
            </div>
            {view?.posts.map(p => {
                return <Post post={p} key={uuidv4()}/>
                }
            )}
        </div>
    )
}