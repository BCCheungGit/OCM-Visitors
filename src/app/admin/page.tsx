"use client";

import { fetchAllVisitors, isAdmin } from "@/server/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../_components/adminTable/data-table";
import { Columns } from "../_components/adminTable/columns";
import { TopNav } from "../_components/topnav";


type Columns = {
  id: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  created_at: string;
  last_signed_in: string;
  events: string;
  active: boolean;
  role: string;
  image: string;
};




export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userList, setUserList] = useState<any | null>(null);
  const [userColumn, setUserColumn] = useState<Columns[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      if (session) {
        const admin = await isAdmin(session.user.id); 
        if (!admin) {
          router.push("/");
        } else {
          const visitors = await fetchAllVisitors();
          setUserList(JSON.parse(visitors));
          const parsedUsers = await Promise.all(JSON.parse(visitors).map(async (user: any) => {
            return {
              ...user,
              created_at: new Date(user.created_at).toLocaleString(),
              last_signed_in: new Date(user.last_signed_in).toLocaleString(),
            } 
          
          }))
          console.log(parsedUsers);
          setUserColumn(parsedUsers);
        }
      }
    }
    getUserData();

  }, [session])


  return (
    <div>
      <TopNav />
      {!userList && (
        <p>Loading...</p>
      )}
      {userList && (
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex sm:ml-5 sm:mr-5 ml-0 mr-0">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all visitors and admins:
            </p>
          </div>
        </div>
        <DataTable data={userColumn} columns={Columns} />
      </div>
      )}
    </div>
  )
}