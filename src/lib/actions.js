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
    console.log("here's me account", account)
    if(success){
        return account;
    } else {
        redirect("/");
    }
}

export async function getAllPosts(){
    const cookieStore = await cookies();
    const token = cookieStore.get("smt");
    const response = await fetch(`${process.env.BACKEND_API_URL}/posts`, {
        cache: "no-cache",
        headers: {
            "Authorization": `${token.value}`
        }
    });
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
        cache: "no-store",
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
    const { success, account } = accInfoDto;
    if(success){
        return account;
    } else {
        redirect("/");
    }   
}

export async function getPostsByFollowing(){
    const cookieStore = await cookies();
    const token = cookieStore.get("smt");
    const response = await fetch(`${process.env.BACKEND_API_URL}/following/posts`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: token.value
    });
    const postsByFollowing = await response.json();
    return postsByFollowing;
}

export async function addComment(formData){
    const path = formData.get("path");

    const commentData = {
        cmPostId: formData.get("cmPostId"),
        commentedBy: formData.get("commentedBy"),
        commentText: formData.get("commentText")
    }

    const response = await fetch(`${process.env.BACKEND_API_URL}/comments`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentData)
    })
    await response.json();
    redirect(`/post/${formData.get("cmPostId")}`);
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
    newPostDto.comments = [];
    newPostDto.postLikes = [];
    revalidatePath("/feed", "layout");
    return newPostDto;
}

export async function deletePost(postId){
    const cookieStore = await cookies();
    const token = cookieStore.get("smt");
    await fetch(`${process.env.BACKEND_API_URL}/posts/${postId}`, {
        cache: "no-cache",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token.value}`
        },
        body: postId
    })
    revalidatePath("/feed", "layout")
}

export async function searchPosts(searchTerm){
    const response = await fetch(`${process.env.BACKEND_API_URL}/search/posts`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: searchTerm
    })
    const searchResults = await response.json();
    console.log("search results in search action: ", searchResults);
    return searchResults;
}

export async function checkForToken(){
    const cookieStore = await cookies();
    if(cookieStore.get("smt")){
        redirect("/feed");
    }
}

export async function revalidateFeed(){
    revalidatePath("/feed", "layout");
}

export async function addOrRemoveFollower(followingAccountId, followedAccountId, addRemove){

    const follow = {
        followingAccountId,
        followedAccountId
    }
    console.log("follow addremove server action", follow, addRemove)
    await fetch(`${process.env.BACKEND_API_URL}/follow/${addRemove}`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(follow)
    })
    revalidatePath("/feed", "layout");
}

export async function editAccountInfo(formData){
    const cookieStore = await cookies();
    const token = cookieStore.get("smt");
    const accountId = formData.get("accountId");
    const accUpdates = {
        username: formData.get("username"),
        password: formData.get("password")
    }
    const accInfoDtoResponse = await fetch(`${process.env.BACKEND_API_URL}/account/${accountId}/edit`, {
        cache: "no-cache",
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token.value}`
        },
        body: JSON.stringify(accUpdates)
    })
    const accInfoDto = await accInfoDtoResponse.json();
    revalidatePath("/feed", "layout");
    return accInfoDto;
    
}