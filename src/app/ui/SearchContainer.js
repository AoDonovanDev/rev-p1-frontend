'use client'

import { useContext, useEffect } from "react";
import { ViewContext } from "../ViewContext";
import { useState } from "react";
import Post from "./Post";
import { v4 as uuidv4 } from 'uuid';


export default function SearchContainer({searchResults}){
   
    const [view, setView] = useState(searchResults)

    useEffect(() => {
        setView(view)
    }, searchResults);


    function toggleView(str){
        if(str == "delete"){
          setView(view => {
            const copy = [...view];
            copy.posts = copy.posts.filter(p => p.postId != newPost);
            return copy;
          })
        }
      }


    return(
        <div className="flex flex-col items-center">
            {view && view.map(p => <Post key={uuidv4()} post={p} toggleView={toggleView}/>)}
        </div>
        
    )
}