"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const session = useSession();
  const router = useRouter();
  console.log(session.data);
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    // redirect("/profile/login");
    router?.push("/login");
  }
  return <div> Profile for {session.data.user?.name}</div>;
  // return <>Profile</>;
};

export default Profile;
