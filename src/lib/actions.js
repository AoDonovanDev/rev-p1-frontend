'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(formData){
    const username = formData.get("username");
    const password = formData.get("password");
    const result = await fetch(`${process.env.BACKEND_API_URL}/login`,{
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    const { authenticated, token } = await result.json();
    if(authenticated){
        const cookieStore = await cookies();
        cookieStore.set("smt", token, {maxAge: 3600});
        redirect("/feed");
    } else {
        redirect("/");
    }
}

export async function logout(){
    const cookieStore = await cookies();
    cookieStore.delete("smt");
    redirect("/");
}

export async function signup(formData){
    const username = formData.get("username");
    const password = formData.get("password");
    const result = await fetch(`${process.env.BACKEND_API_URL}/register`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    const { authenticated, token } = await result.json();
    if(authenticated){
        const cookieStore = await cookies();
        cookieStore.set("smt", token, {maxAge: 3600});
        redirect("/feed")
    } else {
        redirect("/");
    }
}


export async function getAccountInfo(){
    const cookieStore = await cookies();
    const token = cookieStore.get("smt");
    const response = await fetch(`${process.env.BACKEND_API_URL}/accountInfo`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: token.value
    })
    const accInfoDto = await response.json();
    return accInfoDto;
}

export async function getAllPosts(){
    const response = await fetch(`${process.env.BACKEND_API_URL}/posts`);
    const posts = await response.json();
    return posts;
}

export async function getPostById(postId){
    const response = await fetch(`${process.env.BACKEND_API_URL}/posts/${postId}`);
    const post = await response.json();
    return post;
}

export async function addOrRemoveLike(accountId, postId, addRemove){
    await fetch(`${process.env.BACKEND_API_URL}/posts/${addRemove}Like`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            accountId,
            postId
        })
    })
    revalidatePath("/feed");
}