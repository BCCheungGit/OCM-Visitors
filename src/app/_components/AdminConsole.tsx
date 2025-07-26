import { IdCardProps, ViewType } from "@/types/admintypes";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { TakePhotoModal } from "./modals";
import { manualCheckIn, updateImage } from "@/server/actions";
import Image from "next/image";

interface AdminConsoleProps {
  setView: (view: ViewType) => void;
  setCardValues: Dispatch<SetStateAction<IdCardProps>>;
}

export default function AdminConsole({
  setView,
  setCardValues,
}: AdminConsoleProps) {
  const { t, i18n } = useTranslation();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const { toast } = useToast();
  const baseUrl =
    "https://store.cloudority.com/index.php/apps/files_sharing/ajax/publicpreview.php?x=1920&y=490&a=true&";

  const uploadImage = async (
    folderName: string,
    fileName: string,
    base64Image: string,
  ) => {
    const response = await fetch("/api/owncloud/putimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderName, fileName, base64Image }),
    });
    if (response.ok) {
      const data = await response.json();
      return data.message;
    } else {
      const errorData = await response.json();
      console.error("Error uploading image:", errorData.error);
    }
  };

  const getImageToken = async (folderName: string, fileName: string) => {
    const response = await fetch("/api/owncloud/gettoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderName, fileName }),
    });
    if (response.ok) {
      const data = await response.json();
      return data.token;
    } else {
      console.error("Error getting token:", response.statusText);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      if (url) {
        formData.append("image", url);
      } else {
        toast({
          title: "Image Required",
          description: "Please take a photo and try again.",
          variant: "destructive",
        });
        return;
      }
      let userId = "";
      try {
        const res = await manualCheckIn(formData);
        userId = res.newId || "";
      } catch (error) {
        toast({
          title: "Error",
          description: "Check-in failed",
        });
      }

      await uploadImage(
        "visitorImages",
        userId + ".png",
        formData.get("image") as string,
      );
      const token = await getImageToken("visitorImages", userId + ".png");
      const finalres = await updateImage(
        userId,
        `${baseUrl}file=${userId}.png&t=${token}&scalingup=0`,
      );

      if (finalres) {
        toast({
          title: t("success"),
          description: t("check_in_successful"),
        });
        setCardValues({
          id: userId,
          name: `${formData.get("firstname")} ${formData.get("lastname")}`,
          photo: `${baseUrl}file=${userId}.png&t=${token}&scalingup=0`,
          date: new Date().toLocaleDateString(i18n.language),
          role: "visitor",
        });
        setView(ViewType.MANUAL_ID_CARD);
        setUrl("");
      } else {
        toast({
          title: t("error"),
          description: t("check_in_failed"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Check-in error:", error);
      toast({
        title: t("error"),
        description: `check in error: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      setView(ViewType.MANUAL_ID_CARD);
    }
  };

  return (
    <div className="min-w-screen flex flex-row justify-center items-center p-4 h-full">
      <TakePhotoModal
        isOpen={modalOpen}
        setOpen={setModalOpen}
        url={url}
        setUrl={setUrl}
      />
      <div className="sm:w-fit w-[400px] flex flex-col items-center border-2 p-8 gap-6 mt-5 rounded-lg shadow-xl">
        <h1 className="sm:text-xl text-lg font-semibold">
          {t("manual_check_in")}
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="firstname"
                  className="sm:text-sm text-xs"
                  aria-required
                >
                  {t("first_name")}
                </label>
                <Input required type="text" name="firstname" id="firstname" />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lastname"
                  className="sm:text-sm text-xs"
                  aria-required
                >
                  {t("last_name")}
                </label>
                <Input required type="text" name="lastname" id="lastname" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sm:text-sm text-xs">
                {t("email_optional")}
              </label>
              <Input type="email" name="email" id="email" required={false} />
            </div>
            <div>
              <label htmlFor="phone" className="sm:text-sm text-xs">
                {t("phone_optional")}
              </label>
              <Input type="tel" name="phone" id="phone" required={false} />
            </div>
            {url && (
              <div className="flex flex-col gap-2">
                <p className="sm:text-sm text-xs">{t("image")}:</p>
                <Image
                  src={url}
                  alt="user image"
                  width={100}
                  height={100}
                  className="rounded-md border"
                />
              </div>
            )}
            <Button type="button" onClick={() => setModalOpen(true)}>
              {t("open_camera")}
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? t("submitting") : t("sign_up")}
            </Button>
          </div>
        </form>
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
