import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("smt");
  console.log(token)
  if(!token){
    return NextResponse.redirect(`${process.env.BASE_URL}/`);
  }
  try {
    //validate and refresh token
    const response = await fetch(`${process.env.BACKEND_API_URL}/token`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
        },
      body: token.value
        })
    const authDto = await response.json();
    if(!authDto.authenticated){
      return NextResponse.redirect(`${process.env.BASE_URL}/`);
    } else {
      cookieStore.set("smt", token.value);
      return NextResponse.next();
    }
  } catch(e){
    return NextResponse.redirect(`${process.env.BASE_URL}/`);
  }
}
 
export const config = {
  matcher: ['/feed']
}