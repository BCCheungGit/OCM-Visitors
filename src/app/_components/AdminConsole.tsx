import { ViewType } from "@/types/admintypes";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
interface AdminConsoleProps {
  view: ViewType;
  setView: (view: ViewType) => void;
}

export default function AdminConsole({ view, setView }: AdminConsoleProps) {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Console</h1>
      <p className="text-gray-600">
        This is the admin console. Please select an option from the navigation.
      </p>
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => setView(ViewType.DATA_TABLE)}
          className="btn btn-primary"
        >
          {t("view_users")}
        </Button>
      </div>
    </div>
  );
}
