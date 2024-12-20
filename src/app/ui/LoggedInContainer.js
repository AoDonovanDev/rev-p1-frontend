'use client';

import { useState, useContext } from "react";
import Navbar from "./Navbar";
import Feed from "./Feed";
import { usePathname } from "next/navigation";
import { AccountContext } from "../AccountContext";

export default function LoggedInContainer({accountInfo, allPosts, children}){

    const [view, setView] = useState("all");
    const path = usePathname();
    return (
        <AccountContext.Provider value={accountInfo}>
            <div className="lg:mx-[200px]">
                <Navbar view={view} setView={setView}/>
                {path.includes("feed")&&<Feed view={view} allPosts={allPosts}/>}
                {children}
            </div>
        </AccountContext.Provider>

    )
}