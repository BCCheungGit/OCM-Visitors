"use client";

import Image from "next/image";
import {signIn, signOut, useSession} from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchData } from "@/server/actions";
import { UserNav } from "./UserNav";

export function TopNav() {

  const {data: session, status} = useSession();
  const [userData, setUserData] = useState<any | null>(null);
  useEffect(() => {
    const getUserData = async () => {
      if (session) {
        const user = await fetchData(session.user.id);
        if (typeof user === "object" && user.error) {
          setUserData(null); 
        } else {
          setUserData(user);
        }
      }
    }
    getUserData();
  }, [session]) 
  return (
      <nav className="flex items-center justify-between w-full p-4 sm:text-xl text-base font-semibold border-b">
        <div className="flex items-center w-1/4">
          <Image
            src="https://avatars.planningcenteronline.com/uploads/organization/217202-1482195203/avatar.1.png"
            alt="Main Church"
            className="sm:w-[120px] sm:h-[120px]"
            width={80}
            height={80}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-2/4">
          <h1 className="sm:text-2xl text-lg text-center">
            <span className="sm:inline hidden">
              Oversea Chinese Mission 中華海外宣道會
            </span>
            <span className="sm:hidden inline">OCM 中宣會</span>
          </h1>
          <h2 className="sm:text-xl text-base text-center mt-2">
            <span className="sm:inline hidden">
              Visitor Registration 訪客登記
            </span>
            <span className="sm:hidden inline">訪客登記</span>
          </h2>
        </div>
        <div className="flex justify-end gap-4 items-center w-1/4">
          {userData && (<UserNav firstname={JSON.parse(userData).user.firstname} photo={JSON.parse(userData).user.image} />) }
        </div>
      </nav>
  );
}
