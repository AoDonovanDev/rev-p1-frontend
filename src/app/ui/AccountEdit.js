'use client'

import { useContext, useState } from "react"
import { AccountContext } from "../AccountContext"
import { editAccountInfo } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { revalidateFeed } from "@/lib/actions";
import { ViewContext } from "../ViewContext";
import { redirect } from "next/navigation";
import { getAllPosts } from "@/lib/actions";

export default function AccountEdit({accountId}){

    const { accountInfo, setAccountInfo } = useContext(AccountContext);
    const { setView, toggleView } = useContext(ViewContext);
    const { replace } = useRouter();

    const [warning, setWarning] = useState("")

    async function handleSubmit(formData){
        const username = formData.get("username");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if(password != confirmPassword || !password || !confirmPassword){
            setWarning("Passwords must be valid and match");
            return;
        } 

        const accInfoDto = await editAccountInfo(formData);

        if(accInfoDto.success){
            setAccountInfo(accInfoDto.account);
            replace("/feed");        
            setView({
                name: "all",
                posts: allPosts
            })
        }

    }
    return (
        <div className="w-full flex place-content-center">
            <div className="w-1/2 flex flex-col">
                <form className="mt-[80px] bg-base-300 py-[40px] px-[40px] shadow-lg rounded-md" action={handleSubmit}>
                    <h1 className="font-bold my-[12px]">Change your username or password</h1>
                    <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" placeholder="Username" defaultValue={accountInfo.username} name="username" id="username"/>
                    </label>
                    <h2 className="mt-[12px] ml-[12px] text-red-300 font-bold">{warning}</h2>
                    <label className="input input-bordered flex items-center gap-2 mt-[12px]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                    </svg>
                    <input type="password" name="password" id="password"/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mt-[12px]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                    </svg>
                    <input type="password" name="confirmPassword" id="confirmPassword"/>
                    </label>
                    <input type="text" hidden defaultValue={accountId} name="accountId" id="accountId"/>
                    <div className="flex w-full justfiy-end place-content-end mt-[32px]">
                        <button className="btn btn-info">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}