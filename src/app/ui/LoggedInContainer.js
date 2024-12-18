'use client';

import { useState } from "react";
import Navbar from "./Navbar";
import Feed from "./Feed";

export default function LoggedInContainer(){

    const [view, setView] = useState("all");


    return (

        <div className="lg:mx-[200px]">
            <Navbar view={view} setView={setView}/>
            <Feed view={view}/>
        </div>

    )
}