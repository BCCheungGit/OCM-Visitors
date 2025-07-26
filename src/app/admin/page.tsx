"use client";

import { isAdmin } from "@/server/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TopNav } from "../_components/topnav";
import { IdCardProps, ViewType } from "@/types/admintypes";
import AdminData from "@/app/_components/AdminData";
import AdminConsole from "@/app/_components/AdminConsole";
import ManualIdCard from "../_components/ManualIdCard";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [view, setView] = useState<ViewType>(ViewType.DATA_TABLE);

  const [cardValues, setCardValues] = useState<IdCardProps>({
    id: undefined,
    name: undefined,
    photo: undefined,
    date: undefined,
    role: undefined,
  });

  useEffect(() => {
    const getUserData = async () => {
      if (session) {
        const admin = await isAdmin(session.user.id);
        if (!admin) {
          router.push("/");
        }
      }
    };
    getUserData();
  }, [session]);

  let content: React.ReactNode | null = null;
  if (view === ViewType.DATA_TABLE) {
    content = <AdminData setView={setView} />;
  } else if (view === ViewType.MANUAL_CHECK_IN) {
    content = <AdminConsole setView={setView} setCardValues={setCardValues} />;
  } else {
    content = (
      <ManualIdCard
        id={cardValues.id}
        name={cardValues.name}
        photo={cardValues.photo}
        date={cardValues.date}
        role={cardValues.role}
        setView={setView}
      />
    );
  }
  return (
    <div>
      <TopNav />
      {content}
    </div>
  );
}
