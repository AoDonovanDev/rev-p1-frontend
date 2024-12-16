import Post from "./Post"

export default function AccountDetail( {account} ){
    return(
        <div className="flex flex-col items-center">
            <div className="card bg-base-200 w-96">
                <div className="card-body">
                    <h2 className="card-title">{account.username}</h2>
                    <p>followers: {account.followedBy.length}</p>
                    <p>following: {account.following.length}</p>
                </div>
            </div>
            {account.posts.length && account.posts.map(p => <Post post={p}/>)}
        </div>
    )
}