import { getAccountInfo, getAllPosts } from "@/lib/actions"
import LoggedInContainer from "../ui/LoggedInContainer"

export default async function LoggedInLayout( { children } ){

    const accountInfo = await getAccountInfo();
    const allPosts = await getAllPosts();
    accountInfo.allPosts = allPosts;
    console.log("revalidate this plz")
    return (
        <>
            <LoggedInContainer accountInfo={accountInfo} allPosts={allPosts} children={children}/>
        </>
    )
}