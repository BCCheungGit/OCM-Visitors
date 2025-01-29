// "use client";
"use client";
import { Button } from "@/components/ui/button";
import { checkImage, fetchData, updateImage } from "@/server/actions";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";

import { TopNav } from "../_components/topnav";

import { Session } from "next-auth";



function CameraComponent({
  session,
  onImageUpload,
}: {
  session: Session | null;
  onImageUpload: () => void;
}) {
  const isMobile = window.innerWidth < 768;
  const width = isMobile ? 400 : 300;
  const height = isMobile ? 300 : 400;
  console.log("mobile: ", isMobile);
  const videoConstraints = {
    width: width,
    height: height,
    facingMode: "user",
  };
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot({
      width: isMobile ? height : width,
      height: isMobile ? width : height,
    });
    if (imageSrc) {
      setUrl(imageSrc);
      console.log(imageSrc);

      setCaptureEnable(false);
      console.log(imageSrc);
    }
  }, [webcamRef, setUrl]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>
        Welcome, {session?.user?.firstname} {session?.user?.lastname}
      </div>
      {!url && (
        <>
          <div className="flex flex-row gap-4">
            <Button
              onClick={() => {
                if (isCaptureEnable) {
                  setCaptureEnable(false);
                  setUrl(null);
                } else {
                  setCaptureEnable(true);
                }
              }}
            >
              {isCaptureEnable ? "Close Camera" : "Open Camera"}{" "}
            </Button>
            {isCaptureEnable && <Button onClick={capture}>Capture</Button>}
          </div>
        </>
      )}
      {isCaptureEnable && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            mirrored={true}
          />
        </>
      )}
      {url && (
        <>
          <div className="flex flex-row justify-center w-full gap-4">
            <Button
              onClick={() => {
                setUrl(null);
              }}
              className="w-fit"
            >
              Delete
            </Button>
            <form
              action={async (formData) => {
                await updateImage(
                  session?.user.id,
                  formData.get("image") as string
                );
                onImageUpload();
              }}
            >
              <input name="image" defaultValue={url} hidden />
              <Button className="w-fit" type="submit">
                Upload Image
              </Button>
            </form>
          </div>
          <img src={url} alt="captured" />
        </>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { data: session, status, update } = useSession();
  const [imageStatus, setImageStatus] = useState<boolean>(false);
  const router = useRouter();
  const [userData, setUserData] = useState<any | null>(null);
  useEffect(() => {
    const getImageStatus = async () => {
      if (session?.user?.id) {
        const result = await checkImage(session.user.id);
        if (result || imageStatus) {
          router.push("/dashboard/print");
        }
        setImageStatus(result);
      }
    };
    getImageStatus();
  }, [imageStatus, session, session?.user ]);

  useEffect(() => {
    const getUserData = async () => {
      if (session) {
        const user = await fetchData(session.user.id);
        if (typeof user === "object" && user.error) {
          router.push("/");
        } else {
          setUserData(user);
        }
      }
    }
    getUserData();
  })

  const handleImageUpload = () => {
    setImageStatus(true);
    
  } 

  if (status === "loading") {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (!session) {
    router.push("/sign-up");
  }

  return (
    <div>
      <TopNav />
      <div className="min-w-screen flex flex-col gap-4 justify-center items-center h-full mt-10">
        {userData}
        {/* <CameraComponent session={session} onImageUpload={handleImageUpload} /> */}
      </div>
    </div>
  );
}
