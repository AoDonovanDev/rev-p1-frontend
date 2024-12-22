import { getAccountInfo, getAllPosts } from "@/lib/actions"
import LoggedInContainer from "../ui/LoggedInContainer"

export default async function LoggedInLayout( { children } ){

    const asyncAccountInfo = await getAccountInfo();
    const allPosts = await getAllPosts();
    asyncAccountInfo.allPosts = allPosts;
    console.log("revalidate this plz")
    return (
        <>
            <LoggedInContainer asyncAccountInfo={asyncAccountInfo} allPosts={allPosts} children={children}/>
        </>
    )
}