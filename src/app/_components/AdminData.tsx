import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ColumnType } from "@/types/admintypes";
import { fetchAllVisitors } from "@/server/actions";
import { Columnszh, Columns } from "./adminTable/columns";
import { DataTable } from "./adminTable/data-table";
import { ViewType } from "@/types/admintypes";
import { Button } from "@/components/ui/button";
interface AdminDataProps {
  view: ViewType;
  setView: (view: ViewType) => void;
}

export default function AdminData({ view, setView }: AdminDataProps) {
  const [userList, setUserList] = useState<any | null>(null);
  const [userColumn, setUserColumn] = useState<ColumnType[]>([]);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const getUserData = async () => {
      const visitors = await fetchAllVisitors();
      setUserList(JSON.parse(visitors));
      const parsedUsers = await Promise.all(
        JSON.parse(visitors).map(async (user: any) => {
          return {
            ...user,
            created_at: new Date(user.created_at).toLocaleString(),
            last_signed_in: new Date(user.last_signed_in).toLocaleString(),
          };
        }),
      );
      setUserColumn(parsedUsers);
    };
    getUserData();
  }, []);

  return (
    <div>
      {!userList && <p>Loading...</p>}
      {userList && (
        <div className="h-full flex-1 flex-col space-y-8 p-8 flex sm:ml-5 sm:mr-5 ml-0 mr-0">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {t("welcome_back")}
              </h2>
              <p className="text-muted-foreground">{t("heres_a_list")}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setView(ViewType.MANUAL_CHECK_IN)}
                className="btn btn-primary"
              >
                {t("manual_check_in")}
              </Button>
            </div>
          </div>
          {i18n.language == "en" ? (
            <DataTable data={userColumn} columns={Columns} />
          ) : (
            <DataTable data={userColumn} columns={Columnszh} />
          )}
        </div>
      )}
    </div>
  );
}
