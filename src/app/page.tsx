'use client';


import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { TopNav } from "./_components/topnav";
import { useSession } from "next-auth/react";

export default function Home() {
      const { data: session, status } = useSession();
      const router = useRouter();

      useEffect(() => {
        if (session) {
          router.push("/dashboard");
        }
      }, [session, router]);
      return (
        <>
        <TopNav />
      <div className="flex flex-col min-w-screen items-center justify-start mt-10 gap-4 min-h-screen">
        <div className="w-1/4 min-w-96 items-center justify-center flex flex-col gap-4 border-2 rounded-xl shadow-lg p-4">
        <div className="flex flex-row gap-4 items-center justify-center">
        <Image src="https://avatars.planningcenteronline.com/uploads/organization/217202-1482195203/avatar.1.png" alt="OCM Logo" width={30} height={30} />
        <h1 className="font-semibold">Welcome to OCM!</h1>

        </div>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
        <Link className="w-full" href="/sign-up"><Button className="w-full">Create Account</Button></Link>
        <Link className="w-full" href="/sign-in"><Button className="w-full">Sign In</Button></Link>
       </div> 
        </div>
      </div>
    </>
  );


}
