'use client';

import { usePathname, useSearchParams, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { debounce } from "@/lib/utils";

export default function SearchBar(){

  let pathName = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  const { replace } = useRouter();
  const { searchType } = {searchType:"post"};

  function handleChange(term){
    const params = new URLSearchParams(searchParams);
    console.log(params.toString());
    if(term){
      params.set('query', term);
    } else {
      params.delete('query');
    }
    params.delete('page');
    replace(`/search/posts?${params.toString()}`)
  };

  const debouncedHandleChange = debounce(handleChange)

  return (
    <input className="input input-bordered join-item mr-[12px]" 
           placeholder={`search ${searchType}s...`}
           name="query"
           id="query"
           defaultValue={searchParams.get('query')?.toString()}
           onChange={(e)=>debouncedHandleChange(e.target.value)}
          />
  );
};