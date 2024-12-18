'use client'

import Navbar from "../ui/Navbar"
import { useState, useEffect } from "react"
import { getAccountInfo } from "@/lib/actions"
import { AccountContext } from "../AccountContext"

export default function LoggedInLayout( { children } ){

    const [account, setAccount] = useState({});

    useEffect( () => {
        (async()=>{
            const account = await getAccountInfo();
            setAccount(account);
        })()
    }, [])

    return (
        <AccountContext.Provider value={account}>
            <div className="lg:mx-[200px]">
                <Navbar />
                {children}
            </div>
        </AccountContext.Provider>
    )
}