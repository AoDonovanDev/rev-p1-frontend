'use client';

import Navbar from "../Navbar";
import Feed from "../Feed";
import { usePathname, useRouter } from "next/navigation";
import { AccountContext } from "../../AccountContext";
import { useEffect, useReducer, useState } from "react";
import { revalidateFeed } from "@/lib/actions";
import { ViewContext } from "../../ViewContext";

export default function LoggedInContainer({asyncAccountInfo,  children}){

   
    const [accountInfo, setAccountInfo] = useState(asyncAccountInfo);

    


    return (
        <AccountContext.Provider value={{accountInfo, setAccountInfo}}>
            <div className="lg:mx-[200px]">
                {children}
            </div>
        </AccountContext.Provider>

    )
}