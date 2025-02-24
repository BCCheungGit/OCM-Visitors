"use client";

import Image from "next/image";
import {signIn, signOut, useSession} from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchData } from "@/server/actions";
import { UserNav } from "./UserNav";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";


export function TopNav() {

  const {data: session, status} = useSession();
  const [userData, setUserData] = useState<any | null>(null);
  const {i18n, t} = useTranslation();
  


  const changeLanguage = () => {
    if (i18n.language == "en") {
      i18n.changeLanguage("zh")
    } else {
      i18n.changeLanguage("en")
    }
  }

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


  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;
  return (
      <nav className="flex items-center justify-between w-full p-4 sm:text-xl text-base font-semibold border-b">
        <div className="flex items-center w-1/4">
          <Image
            src="https://avatars.planningcenteronline.com/uploads/organization/217202-1482195203/avatar.1.png"
            alt="Main Church"
            className="sm:w-[80px] sm:h-[80px]"
            width={60}
            height={60}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-2/4">
          <h1 className="sm:text-2xl text-lg text-center">
            <span className="sm:inline hidden">
            {t('title')} 
            </span>
            <span className="sm:hidden inline">OCM 中宣會</span>
          </h1>
          <h2 className="sm:text-xl text-base text-center mt-2">
            <span className="sm:inline hidden">
            {t('subtitle')} 
            </span>
            <span className="sm:hidden inline">訪客登記</span>
          </h2>
        </div>

        <div className="flex justify-end gap-6 items-center w-1/4 p-4">
        <div className="flex flex-row gap-2 justify-center items-center">
          <span className="text-sm font-normal">en</span><Switch className="data-[state=checked]:bg-neutral-500 data-[state=unchecked]:bg-neutral-500" checked={i18n.language == "zh"} onCheckedChange={()=>{changeLanguage()}} /><span className="text-sm font-normal">中文</span>
          {/* <Button onClick={() => changeLanguage()}>{t('change_language')}</Button> */}
        </div>
          {userData && (<UserNav firstname={JSON.parse(userData).user.firstname} photo={JSON.parse(userData).user.image} role={JSON.parse(userData).user.role} />) }
        </div>
      </nav>
  );
}
