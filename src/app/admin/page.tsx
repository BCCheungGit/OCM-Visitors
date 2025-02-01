"use client";

import { fetchAllVisitors, isAdmin } from "@/server/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";








export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userList, setUserList] = useState<any | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      if (session) {
        const admin = await isAdmin(session.user.id); 
        if (!admin) {
          router.push("/");
        } else {
          const visitors = await fetchAllVisitors();
          setUserList(JSON.parse(visitors));
        }
      }
    }
    getUserData();

  }, [session])


  return (
    <div>
      {!userList && (
        <p>Loading...</p>
      )}
      {userList && (userList.map((user: any) => (
        <div key={user.id}>
          <h1>{user.firstname} {user.lastname}</h1>
          <p>{user.email}</p>
          <p>{user.phonenumber}</p>
        </div>
      )))}
    </div>
  )
}