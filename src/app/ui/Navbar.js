'use client'

import Link from "next/link"
import { logout } from "@/lib/actions"
import AddPostModal from "./modals/AddPostModal"
import { AccountContext } from "../AccountContext"
import { useContext } from "react"
import { usePathname } from "next/navigation"
import SearchBar from "./SearchBar"
import { useRouter } from "next/navigation"

export default function Navbar({toggleView}){

    const { accountInfo } = useContext(AccountContext);
    const path = usePathname();
    const { replace } = useRouter();
   
    function home(){
        replace("/feed")
    }

    return (
        <div className="navbar bg-[#CFE4EE] pt-[48px]">
            <div className="navbar-start flex flex-col md:flex-row items-center">
                <div>
                    <button className="btn btn-ghost text-xl" onClick={()=>home()}>BoopSky</button>
                </div>
                <div className="navbar-center flex flex-col justify-items-center">
                    <Link href={"/search/posts"}>Search</Link>
                </div>
            </div>
            <div className="navbar-end flex flex-col md:flex-row">
                <AddPostModal toggleView={toggleView}/>
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
    )
}