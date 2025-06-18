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
import Webcam from "react-webcam";
interface TakePhotoModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onTakePhoto: () => void;
}

export function TakePhotoModal({
  isOpen,
  setOpen,
  onTakePhoto,
}: TakePhotoModalProps) {
  const isMobile = window.innerWidth < 768;
  const width = isMobile ? 400 : 300;
  const height = isMobile ? 300 : 400;
  const videoConstraints = {
    width: width,
    height: height,
    facingMode: "user",
  };
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string>("");
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot({
      width: isMobile ? height : width,
      height: isMobile ? width : height,
    });
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef, setUrl]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent>
        <div className="flex flex-col items-center justify-center gap-4">
          <AlertDialogTitle>Take a Photo</AlertDialogTitle>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            mirrored={true}
          />
        </div>
        <AlertDialogFooter className="flex justify-between w-full items-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onTakePhoto}>Capture</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
