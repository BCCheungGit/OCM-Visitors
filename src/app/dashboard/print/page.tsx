"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { IDCard } from "./idcard";
import ReactToPrint from "react-to-print";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { checkImage, fetchData, fetchImage } from "@/server/actions";
import { TopNav } from "@/app/_components/topnav";
import { useTranslation } from "react-i18next";

function convertToESTFormat(dateString: string): string {
  const date = new Date(dateString);
  const {i18n, t} = useTranslation();


  return date.toLocaleTimeString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface CardProps {
  idCardContainerRef: React.RefObject<HTMLDivElement>;
  userData: any | null;
}

const CardComponent: React.FC<CardProps> = ({
  idCardContainerRef,
  userData,
}) => {
  return (
    <div ref={idCardContainerRef}>
      <IDCard
        id={userData?.user.id}
        date={convertToESTFormat(userData?.user.last_signed_in)}
        photo={userData?.user.image}
        name={`${userData?.user.firstname} ${userData?.user.lastname}`}
        phone={userData?.user.phonenumber}
        role={userData?.user.role}
      />

    </div>
  );
};



export default function Print() {
  const { data: session, status, update } = useSession({
    required: true,
    onUnauthenticated() {
      return { redirect: "/sign-in" };
    },
  });
  const {i18n, t} = useTranslation();

  const idCardContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      if (session) {
        const user = await fetchData(session.user.id);
        if (typeof user === "object" && user.error) {
          router.push("/");
        } else {
          setUserData(user);
        } 

      }
    }
    getUserData();
  }, [session])

  useEffect(() => {
    const getImageStatus = async () => {
        console.log(session?.user)
      if (session?.user.id) {
        const res = await fetchImage(session.user.id);
        if (typeof res === "object" && res.error) {
          router.push("/dashboard");
        } 
        
      }
    };
    getImageStatus();
  }, [session, session?.user ]);

  return (
    <div>
      <TopNav />
      <div className="min-w-screen flex flex-col gap-4 justify-center items-center h-full mt-10">
        <div className="sm:inline hidden">
          <ReactToPrint
            trigger={() => <Button>{t('print_card')}</Button>}
            content={() => idCardContainerRef.current}
          />
        </div>
        {userData && (
          <CardComponent
            idCardContainerRef={idCardContainerRef}
            userData={JSON.parse(userData)}
          />
        )}
      </div>
    </div>
  );
}
