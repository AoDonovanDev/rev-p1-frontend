import Image from "next/image"

export default function AddPostModal(){
    return(
        <>
            <button className="btn btn-primary" onClick={()=>document.getElementById('add_post_modal').showModal()}>NEW POST<Image src={"/newPost2.svg"} height={40} width={40} alt="new post button" className="p-0" /></button>
            <dialog id="add_post_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg my-[20px]">New Post</h3>
                <div className="flex w-full">
                    <form method="dialog" className="flex flex-col justify-around w-full">
                    <textarea className="textarea textarea-bordered self-start w-full" placeholder="Comment" name="commentText"></textarea>
                    <button style={{position: "relative", top: "25px"}}><Image src={"/cancel2.svg"} height={40} width={40} alt="cancel button"/></button>
                    <button className="btn btn-primary self-end" style={{position: "relative", bottom: "175px"}}>Reply</button>
                    </form>
                </div>
            </div>
            </dialog>
        </>
    )
}