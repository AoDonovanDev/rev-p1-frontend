import { getAccountInfo, getAllPosts } from "@/lib/actions"
import LoggedInContainer from "../ui/LoggedInContainer"

export default async function LoggedInLayout( { children } ){

    const asyncAccountInfo = await getAccountInfo();
    return (
        <>
            <LoggedInContainer asyncAccountInfo={asyncAccountInfo} children={children}/>
        </>
    )
}