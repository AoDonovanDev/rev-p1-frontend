'use client'

import Navbar from "../ui/Navbar"
import { useState, useEffect } from "react"
import { getAccountInfo } from "@/lib/actions"
import { AccountContext } from "../AccountContext"
import { getAllPosts } from "@/lib/actions"

export default function LoggedInLayout( { children } ){

    const [account, setAccount] = useState({});

    useEffect( () => {
        (async()=>{
            const account = await getAccountInfo();
            const allPosts = await getAllPosts();
            account.allPosts = allPosts;
            setAccount(account);
        })()
    }, [])
    console.log(account)
    return (
        <AccountContext.Provider value={account}>
            <div className="lg:mx-[200px]">
                <Navbar />
                {children}
            </div>
        </AccountContext.Provider>
    )
}