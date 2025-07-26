import ReactToPrint from "react-to-print";
import { IDCard } from "../dashboard/print/idcard";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useRef } from "react";
import { TopNav } from "./topnav";
import { IdCardProps, ViewType } from "@/types/admintypes";

function convertToESTFormat(dateString: string): string {
  const date = new Date(dateString);

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
  cardProps: IdCardProps;
}

const CardComponent: React.FC<CardProps> = ({
  idCardContainerRef,
  cardProps,
}) => {
  return (
    <div ref={idCardContainerRef}>
      <IDCard
        id={cardProps.id}
        date={convertToESTFormat(cardProps.date || "")}
        photo={cardProps.photo}
        name={cardProps.name}
        role={cardProps.role}
      />
    </div>
  );
};
interface ManualIdCardProps {
  id: string | undefined;
  name: string | undefined;
  photo: string | undefined;
  date: string | undefined;
  role: string | undefined;
  setView: Dispatch<SetStateAction<ViewType>>;
}

export default function ManualIdCard({
  id,
  name,
  photo,
  date,
  role,
  setView,
}: ManualIdCardProps) {
  const idCardContainerRef = useRef<HTMLDivElement>(null);
  const cardProps: IdCardProps = {
    id: id,
    name: name,
    photo: photo,
    date: date,
    role: role,
  };
  return (
    <div>
      <div className="min-w-screen flex flex-col gap-4 justify-center items-center h-full mt-10">
        <div className="sm:inline hidden">
          <ReactToPrint
            trigger={() => <Button>Print 列印ID卡</Button>}
            content={() => idCardContainerRef.current}
          />
        </div>
        <CardComponent
          idCardContainerRef={idCardContainerRef}
          cardProps={cardProps}
        />
        <Button onClick={() => setView(ViewType.MANUAL_CHECK_IN)}>
          Back to Manual Check In 返回手動簽到
        </Button>
      </div>
    </div>
  );
}
