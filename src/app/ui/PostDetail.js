import Post from "./Post";
import Comment from "./Comment";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";


export default function PostDetail( { post } ){
    return (
        <div className="flex flex-col items-center">
            <div className="card bg-base-100 w-96 shadow-xl mt-[12px] rounded-b-none" >
                <div className="card-body">
                    <div className="flex">
                        <Image src={"/pfp1.svg"} height={20} width={20} alt="profile avatar"/>
                        <a className="card-title ml-[8px]">{post.account}</a>
                    </div>
                    <p>{post.postText}</p>
                    <div className="card-actions justify-end">
                        <a className="btn btn-ghost"><Image src={"/comment1.svg"} height={20} width={20} alt="comment button"/></a>
                        <a className="btn btn-ghost"><Image src={"/heart1.svg"} height={20} width={20} alt="like button"/></a>
                    </div>
                </div>
            </div>
            {post.comments.map(c => <Comment comment={c} key={uuidv4()}/>)}
        </div>
    )
}