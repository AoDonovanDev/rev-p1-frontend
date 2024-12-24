import SearchContainer from "@/app/ui/containers/SearchContainer";
import { searchPosts } from "@/lib/actions";
import SearchBar from "@/app/ui/SearchBar";
import FeedContainer from "@/app/ui/containers/FeedContainer";

export default async function Page({ params, searchParams }){

  
  const { query } = await searchParams || '';

  const { searchType } = await params;

  if(!query) return<></>
  

  const searchResults = await searchPosts(query);

  console.log(query, searchResults)
  if(!searchResults) return <></>

  return (
    <>
      {searchResults && <SearchContainer searchResults={searchResults} />}
    </>
    
  )
}
