'use client'
import Post from "./Post"
import { v4 as uuidv4 } from 'uuid';
import { PostContext } from "../PostContext";

export default function Feed({view, toggleView}){
    return (
        <div className="flex flex-col items-center pb-[40px] min-h-fit">
            <div className="cursor-pointer border-b-[2px] pt-[8px] mb-[16px] flex sm:w-full md:w-1/3">
                <p className={`font-semibold w-1/2 indent-3 ${view.name == "all" ? "border-b-[4px] border-zinc-400" : ""}`} onClick={()=>toggleView("all")}>All</p>
                <p className={`font-semibold ml-[8px] w-1/2 text-right indent-8 ${view.name == "following" ? "border-b-[4px] border-zinc-400" : ""}`} onClick={()=>toggleView("following")}>Following &nbsp; &nbsp;</p>
            </div>
            {view?.posts?.map(p => {
                return <PostContext.Provider value={p} key={uuidv4()} ><Post post={p} toggleView={toggleView} /> </PostContext.Provider>
                }
            )}
        </div>
    )
}