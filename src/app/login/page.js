'use client';

import { useFormStatus } from "react-dom"
import { login } from "@/lib/actions"

export default function Page() {

    function SubmitBtn(){
        const { pending } = useFormStatus();
        return pending ? <button className="btn btn-neutral" disabled><span className="loading loading-spinner loading-md"></span></button> : <button className="btn btn-neutral">Submit</button>
    }


    return(
        <div className="flex flex-col w-full h-screen items-center justify-center bg-primary">
            <div className="card bg-base-200 text-info-content w-96 h-1/2 py-[40px]">
                <form className="card-body flex flex-col justify-around" action={login}>
                    <h2 className="card-title flex self-center">Log in</h2>
                    <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs text-slate-950" name="username"/>
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs  text-slate-950" name="password"/>
                    <SubmitBtn />
                </form>
            </div>
        </div>
    )
}