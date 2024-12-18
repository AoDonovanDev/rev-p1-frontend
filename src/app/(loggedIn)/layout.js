'use client'

import Navbar from "../ui/Navbar"
import { useState, useEffect } from "react"
import { getAccountInfo } from "@/lib/actions"
import { AccountContext } from "../AccountContext"
import { getAllPosts } from "@/lib/actions"
import LoggedInContainer from "../ui/LoggedInContainer"

export default function LoggedInLayout( { children } ){

    const [account, setAccount] = useState({});

    useEffect( () => {
        (async()=>{
            const account = await getAccountInfo();
            const allPosts = await getAllPosts();
            account.allPosts = allPosts;
            console.log("loagin me data")
            setAccount(account);
        })()
    }, [])
    console.log(account)
    return (
        <AccountContext.Provider value={account}>
            <LoggedInContainer />
            {children}
        </AccountContext.Provider>
    )
}