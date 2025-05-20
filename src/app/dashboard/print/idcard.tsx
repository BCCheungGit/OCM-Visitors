import Image from "next/image";
import { useTranslation } from "react-i18next";
import { QRCode } from "react-qrcode-logo";

interface IDCardProps {
  id: string | undefined;
  name: string | undefined;
  phone: string | undefined;
  photo: string | undefined;
  date: string | undefined;
  role: string | undefined;
}

export const IDCard: React.FC<IDCardProps> = ({
  id,
  name,
  phone,
  photo,
  date,
  role,
}) => {
  const { i18n, t } = useTranslation();

  function generateExpirationDate(): string {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 14);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  }

  return (
    <div className="dark:bg-slate-50 sm:w-[400px] sm:h-[280px] sm:p-[20px] p-[10px] leading-[35px] rounded-xl border-1 border-ocm-purple sm:border-t-[15px] sm:border-b-[15px] border-t-[10px] border-b-[10px] w-[300px] h-[200px] shadow-xl">
      <div className="min-w-full">
        <div className="flex flex-col sm:gap-4 gap-2 justify-center">
          <div className="flex flex-row min-w-full justify-center items-center">
            {role == "admin" ? (
              <div className="dark:text-black sm:text-xl text-sm">
                {t("admin")}
              </div>
            ) : (
              <div className="dark:text-black sm:text-xl text-sm">
                {t("visitor")}
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 min-w-full gap-4">
            <Image
              className="items-center rounded-lg sm:w-[120.3px] sm:h-[150px]"
              src={photo ?? ""}
              alt="Visitor Photo"
              width={80}
              height={106.4}
            />
            <div className="col-span-2">
              <div className="flex flex-col gap-2">
                <div className="font-semibold sm:text-2xl text-lg dark:text-black">
                  {name}
                </div>

                <div className="flex flex-row justify-between">
                  <div className="sm:text-base text-sm dark:text-black">
                    {date}
                  </div>
                  <div className="sm:inline hidden">
                    <QRCode value={id} size={115} />
                  </div>
                  <div className="sm:hidden inline">
                    <QRCode
                      value={generateExpirationDate() + "," + id}
                      size={85}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
