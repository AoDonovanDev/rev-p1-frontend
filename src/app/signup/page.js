import { signup } from "@/lib/actions"

export default function Page(){
    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="card bg-primary text-primary-content w-96 h-1/2 py-[40px]">
                <form className="card-body flex flex-col justify-around" action={signup}>
                    <h2 className="card-title flex self-center">Sign up!</h2>
                    <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs text-slate-950" name="username" />
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs  text-slate-950" name="password"/>
                    <input type="password" placeholder="Confirm password" className="input input-bordered w-full max-w-xs  text-slate-950" name="confrimPassword"/>
                    <button className="btn">Sign up</button>
                </form>
            </div>
        </div>
    )
}