'use client'

import Link from "next/link"
import { logout } from "@/lib/actions"
import AddPostModal from "./AddPostModal"
import { AccountContext } from "../AccountContext"
import { useContext } from "react"
import { usePathname } from "next/navigation"

export default function Navbar({toggleView}){

    const account = useContext(AccountContext);
    const path = usePathname();
   

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link className="btn btn-ghost text-xl" href="/feed">BoopSky</Link>
            </div>
            <div className="navbar-center flex flex-col flex mt-[64px]">
                <div className="flex">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto mr-[16px]" />
                    <AddPostModal toggleView={toggleView}/>
                </div>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div className="flex items-center">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                alt="avatar click here for profile access and logout"
                                src="/pfp1.svg" />
                            </div>
                        </div>
                        <p>{account.username}</p>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                        <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </a>
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