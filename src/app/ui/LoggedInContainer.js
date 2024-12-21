'use client';

import Navbar from "./Navbar";
import Feed from "./Feed";
import { usePathname } from "next/navigation";
import { AccountContext } from "../AccountContext";

export default function LoggedInContainer({accountInfo, allPosts, children}){

    const path = usePathname();
    return (
        <AccountContext.Provider value={accountInfo}>
            <div className="lg:mx-[200px]">
                <Navbar/>
                {path.includes("feed")&&<Feed allPosts={allPosts}/>}
                {children}
            </div>
        </AccountContext.Provider>

    )
}