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
    const { success, account } = accInfoDto;
    if(success){
        return account;
    } else {
        redirect("/");
    }
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

export async function addOrRemoveLike(plAccountId, plPostId, addRemove){
    await fetch(`${process.env.BACKEND_API_URL}/posts/${addRemove}Like`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            plAccountId,
            plPostId
        })
    })
}

export async function getAccountByAccountId(accountId){
    const response = await fetch(`${process.env.BACKEND_API_URL}/accounts/${accountId}`, {
        cache: "no-cache"
    });
    const accInfoDto = await response.json();
    console.log(accountId, accInfoDto)
    const { success, account } = accInfoDto;
    if(success){
        return account;
    } else {
        redirect("/");
    }   
}

export async function addComment(formData){
    const response = await fetch(`${process.env.BACKEND_API_URL}/comments`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cmPostId: formData.get("cmPostId"),
            commentedBy: formData.get("commentedBy"),
            commentText: formData.get("commentText")
        })
    })
    const newComment = await response.json();
    console.log(newComment);
    revalidatePath(formData.get("path"));
}

export async function addPost(formData){
    const timePostedEpoch = Date.now();
    const response = await fetch(`${process.env.BACKEND_API_URL}/posts`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            postedBy: formData.get("accountId"),
            postText: formData.get("postText"),
            timePostedEpoch
        })
    })
    const newPostDto = await response.json();
    console.log("server action add post: ", formData, newPostDto);
    revalidatePath("/feed");
}

export async function checkForToken(){
    const cookieStore = await cookies();
    if(cookieStore.get("smt")){
        redirect("/feed");
    }
}