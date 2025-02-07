import Image from "next/image";
import { QRCode } from "react-qrcode-logo";

interface IDCardProps {
  id: string | undefined;
  name: string | undefined;
  phone: string | undefined;
  photo: string | undefined;
  date: string | undefined;
}

export const IDCard: React.FC<IDCardProps> = ({
  id,
  name,
  phone,
  photo,
  date,
}) => {
  return (
    <div className="sm:w-[400px] sm:h-[280px] sm:p-[20px] p-[10px] leading-[35px] rounded-xl border-1 border-ocm-purple sm:border-t-[15px] sm:border-b-[15px] border-t-[10px] border-b-[10px] w-[300px] h-[200px] shadow-xl">
      <div className="min-w-full">
        <div className="flex flex-col sm:gap-4 gap-2 justify-center">
          <div className="flex flex-row min-w-full justify-center items-center">
            <div className="sm:text-xl text-sm">VISITOR 訪客</div>
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
                <div className="font-semibold sm:text-2xl text-lg">{name}</div>

                <div className="flex flex-row justify-between">
                  <div className="sm:text-base text-sm">{date}</div>
                  <div className="sm:inline hidden">
                    <QRCode value={id} size={115} />
                  </div>
                  <div className="sm:hidden inline">
                    <QRCode value={id} size={85} />
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
