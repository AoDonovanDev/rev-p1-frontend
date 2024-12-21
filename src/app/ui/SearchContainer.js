'use client'

import { useContext, useEffect } from "react";
import { ViewContext } from "../ViewContext";
import SearchBar from "./SearchBar";


export default function SearchContainer({searchResults}){
    const { view, setView } = useContext(ViewContext);
    console.log("search results in container", searchResults)

    useEffect(() => {
        setView({
            name: "search",
            posts: searchResults
        })
    },[])
}