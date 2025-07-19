import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import Webcam from "react-webcam";
interface TakePhotoModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
}

export function TakePhotoModal({
  isOpen,
  setOpen,
  url,
  setUrl,
}: TakePhotoModalProps) {
  const baseUrl =
    "https://store.cloudority.com/index.php/apps/files_sharing/ajax/publicpreview.php?x=1920&y=490&a=true&";
  const [isPending, startTransition] = useTransition();
  const isMobile = window.innerWidth < 768;
  const width = isMobile ? 400 : 300;
  const height = isMobile ? 300 : 400;
  const videoConstraints = {
    width: width,
    height: height,
    facingMode: "user",
  };
  const webcamRef = useRef<Webcam>(null);
  const [loading, setLoading] = useState(false);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot({
      width: isMobile ? height : width,
      height: isMobile ? width : height,
    });
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef, setUrl]);

  const handleUpload = async (formData: FormData) => {
    setLoading(true);
    try {
    } catch (error: any) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent>
        <div className="flex flex-col items-center justify-center gap-4">
          <AlertDialogTitle>Take a Photo</AlertDialogTitle>

          {url == "" ? (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints}
                mirrored={true}
              />
            </>
          ) : (
            <>
              <div className="flex flex-row justify-center w-full gap-4">
                <Button
                  onClick={() => {
                    setUrl("");
                  }}
                  className="w-fit"
                >
                  Delete
                </Button>
                <input name="image" defaultValue={url} hidden />
                <Button
                  className="w-fit"
                  type="submit"
                  disabled={loading || isPending}
                >
                  {loading || isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader className="animate-spin w-4 h-4" /> Uploading...
                    </span>
                  ) : (
                    "Upload Image"
                  )}
                </Button>
              </div>
              <img src={typeof url == "string" ? url : ""} alt="captured" />
            </>
          )}
        </div>
        <AlertDialogFooter className="flex justify-between w-full items-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={capture}>Capture</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
