import Link from "next/link"
import { logout } from "@/lib/actions"
import Image from "next/image"

export default function Navbar(){
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link className="btn btn-ghost text-xl" href="/feed">BoopSky</Link>
                <button className="btn btn-ghost p-0"><Image src={"/newPost1.svg"} height={60} width={60} alt="new post button" className="p-0"/></button>
            </div>
            <div className="navbar-center flex justify-between w-1/4 cursor-pointer border-b-[2px] px-[8px]">
                <p className="font-semibold">Following</p>
                <p className="ml-[8px] font-semibold">All</p>
            </div>
            <div className="navbar-end">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img
                        alt="avatar click here for profile access and logout"
                        src="/pfp1.svg" />
                        </div>
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