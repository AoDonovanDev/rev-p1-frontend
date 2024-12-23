'use client'

import { AccountContext } from "@/app/AccountContext";
import { useRouter } from "next/navigation"
import { useContext } from "react";
import { logout } from "@/lib/actions";
import Link from "next/link";


export default function Layout({children}){

    const { replace } = useRouter();

    const { accountInfo } = useContext(AccountContext);

    function home(){
        replace("/feed")
    }

    return(
        <>
        <div className="navbar bg-[#CFE4EE] pt-[48px]">
            <div className="navbar-start flex flex-col md:flex-row items-center">
                <div>
                    <button className="btn btn-ghost text-xl" onClick={()=>home()}>BoopSky</button>
                </div>
                <div className="navbar-center flex flex-col justify-items-center">
                 
                </div>
            </div>
            <div className="navbar-end flex flex-col md:flex-row">
              
            <div className="dropdown dropdown-end">
                    <div className="flex">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-round flex">
                            <div className="w-10 rounded-full">
                                <img
                                alt="avatar click here for profile access and logout"
                                src="/pfp1.svg" />
                            </div>
                            <p>{accountInfo.username}</p>
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                        <Link className="justify-between" href={`/account/${accountInfo.accountId}/edit`}>
                            Profile
                        </Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        {children}
        </>

    )
}