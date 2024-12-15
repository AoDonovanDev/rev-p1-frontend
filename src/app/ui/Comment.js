import Image from "next/image"

export default function Comment( { comment } ) {
    return(
        <div>
            <div className="card bg-base-200 w-96 shadow-xl rounded-none">
            <div className="card-body">
                <div className="flex">
                    <Image src={"/pfp1.svg"} height={20} width={20} alt="profile avatar"/>
                    <a className="card-title ml-[8px] text-sm">{comment.account}</a>
                </div>
                <p className="text-sm">{comment.commentText}</p>
            </div>
            </div>
        </div>
    )
}