import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
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
  const isMobile = window.innerWidth < 768;
  const width = isMobile ? 400 : 300;
  const height = isMobile ? 300 : 400;
  const videoConstraints = {
    width: width,
    height: height,
    facingMode: "user",
  };
  const webcamRef = useRef<Webcam>(null);
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
                  Retake Photo
                </Button>
                <input name="image" defaultValue={url} hidden />
                <Button
                  className="w-fit"
                  type="submit"
                  onClick={() => setOpen(false)}
                >
                  Use Photo
                </Button>
              </div>
              <img src={typeof url == "string" ? url : ""} alt="captured" />
            </>
          )}
        </div>
        {url == "" && (
          <AlertDialogFooter className="flex justify-between w-full items-center">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={capture}>Capture</Button>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
