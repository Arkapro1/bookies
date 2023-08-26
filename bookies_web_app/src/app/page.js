"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const {status}=useSession();
  if(status=="unauthenticated")
  redirect('/pages/homepage/userMainPage');
  if(status=="authenticated"){
  redirect('/pages/homepage/landingPage');
}
}
