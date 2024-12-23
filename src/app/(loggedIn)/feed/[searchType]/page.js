import SearchContainer from "@/app/ui/SearchContainer";
import { searchPosts } from "@/lib/actions";
import SearchBar from "@/app/ui/SearchBar";
import FeedContainer from "@/app/ui/FeedContainer";

export default async function Page({ params, searchParams }){

  
  const { query } = await searchParams || '';

  const { searchType } = await params;

  console.log(query, searchType)

  const searchResults = await searchPosts(query);

  return (
    <>
    {searchResults && <FeedContainer allPosts={searchResults}/>}
    </>
    
  )
}