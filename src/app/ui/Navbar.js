'use client'

import Link from "next/link"
import { logout } from "@/lib/actions"
import Image from "next/image"
import AddPostModal from "./AddPostModal"
import { AccountContext } from "../AccountContext"
import { useContext } from "react"

export default function Navbar(){

    const account = useContext(AccountContext);

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link className="btn btn-ghost text-xl" href="/feed">BoopSky</Link>
            </div>
            <div className="navbar-center flex flex-col flex mt-[64px]">
                <div className="cursor-pointer border-b-[2px] px-[8px] py-[8px] mb-[16px] flex w-full justify-between">
                    <p className="font-semibold">Following</p>
                    <p className="ml-[8px] font-semibold">All</p>
                </div>
                <div className="flex">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto mr-[16px]" />
                    <AddPostModal />
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