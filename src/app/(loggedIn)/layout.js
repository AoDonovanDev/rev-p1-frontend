import { getAccountInfo, getAllPosts } from "@/lib/actions"
import LoggedInContainer from "../ui/LoggedInContainer"

export default async function LoggedInLayout( { children } ){

    const accountInfo = await getAccountInfo();
    const allPosts = await getAllPosts();
    accountInfo.allPosts = allPosts;
    return (
        <>
            <LoggedInContainer accountInfo={accountInfo} allPosts={allPosts} children={children}/>
        </>
    )
}