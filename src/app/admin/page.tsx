"use client";

import { fetchAllVisitors, isAdmin } from "@/server/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TopNav } from "../_components/topnav";
import { useTranslation } from "react-i18next";
import type { ColumnType } from "@/types/admintypes";
import { ViewType } from "@/types/admintypes";
import AdminData from "@/app/_components/AdminData";
import AdminConsole from "@/app/_components/AdminConsole";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [view, setView] = useState<ViewType>(ViewType.DATA_TABLE);

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

  return (
    <div>
      <TopNav />

      {view === ViewType.DATA_TABLE ? (
        <AdminData view={view} setView={setView} />
      ) : (
        <AdminConsole view={view} setView={setView} />
      )}
    </div>
  );
}
