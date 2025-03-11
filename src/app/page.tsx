'use client';


import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { TopNav } from "./_components/topnav";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

export default function Home() {
      const { data: session, status } = useSession();
      const router = useRouter();

      const {i18n, t} = useTranslation();
      useEffect(() => {
        if (session) {
          router.push("/dashboard");
        }
      }, [session, router]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;
      return (
        <>
        <TopNav />
      <div className="flex flex-col min-w-screen items-center justify-start mt-10 gap-4 min-h-screen">
        <div className="w-1/4 min-w-96 items-center justify-center flex flex-col gap-4 border-2 rounded-xl shadow-lg p-4">
        <div className="flex flex-row gap-4 items-center justify-center">
        <Image src="/ocmlogo.png" alt="OCM Logo" width={30} height={30} />
        <h1 className="font-semibold">{t('welcome')}</h1>

        </div>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
        <Link className="w-full" href="/sign-up"><Button className="w-full">{t('create_account')}</Button></Link>
        <Link className="w-full" href="/sign-in"><Button className="w-full">{t('sign_in')}</Button></Link>
       </div> 
        </div>
      </div>
    </>
  );


}
