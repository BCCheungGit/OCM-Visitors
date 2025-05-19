// "use client";
"use client";
import { Button } from "@/components/ui/button";
import { checkImage, fetchData, updateImage } from "@/server/actions";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";

import { TopNav } from "../_components/topnav";


function CameraComponent({
  userData,
  onImageUpload,
}: {
  userData: any;
  onImageUpload: () => void;
}) {

 const baseUrl = "https://store.cloudority.com/index.php/apps/files_sharing/ajax/publicpreview.php?x=1920&y=490&a=true&"

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

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot({
      width: isMobile ? height : width,
      height: isMobile ? width : height,

    });
    if (imageSrc) {
      setUrl(imageSrc);

      setCaptureEnable(false);
    }
  }, [webcamRef, setUrl]);


  const uploadImage = async (folderName: string, fileName: string, base64Image: string) => {
    const response = await fetch("/api/owncloud/putimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderName, fileName, base64Image  }),
    })
    if (response.ok) {
      const data = await response.json();
    } else {
      const errorData = await response.json();
      console.error("Error uploading image:", errorData.error);
    }
  }

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
  }
  
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>
        Welcome, {userData.user.firstname} {userData.user.lastname}
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
            screenshotFormat="image/png"
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
                console.log("uploading image");
                await uploadImage("visitorImages", userData.user.id + ".png", formData.get("image") as string);
                const token = await getImageToken(
                  "visitorImages",
                  userData.user.id + ".png"
                );
                
                console.log("token: ", token);  


                await updateImage(
                  userData.user.id,
                  `${baseUrl}file=${userData.user.id}.png&t=${token}&scalingup=0`
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
  }, [imageStatus, session, session?.user]);

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
    };
    getUserData();
  }, [session]);

  const handleImageUpload = () => {
    setImageStatus(true);
  };

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
        {userData && (
          <CameraComponent
            userData={JSON.parse(userData)}
            onImageUpload={handleImageUpload}
          />
        )}
      </div>
    </div>
  );
}
