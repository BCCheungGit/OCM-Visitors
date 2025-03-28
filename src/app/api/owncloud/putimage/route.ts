import axios from "axios";

import { NextResponse } from "next/server";

const BASE_URL = "https://image.cloudority.com"
const USERNAME = process.env.OWNCLOUD_USERNAME || "";
const PASSWORD = process.env.OWNCLOUD_PASSWORD || "";


async function uploadBase64Image(folderPath: string, fileName: string, base64Image: string): Promise<void> {
    try {
        const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');

        const url = `${BASE_URL}/remote.php/dav/files/${USERNAME}/${folderPath}/${fileName}`;
        
        const imageBuffer = Buffer.from(base64Data, 'base64');

        const response = await axios.put(url, imageBuffer, {
            auth: { username: USERNAME, password: PASSWORD },
            headers: {
                "Content-Type": "image/png", 
                "Content-Length": imageBuffer.length.toString(),
            },
        });      
        if (response.status !== 201 && response.status !== 204) {
            throw new Error(`Failed to upload file: ${response.statusText}`);
        } 
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}



export async function POST(req: Request) {
    try {
        const { folderName, fileName, base64Image } = await req.json();


        console.log("Received data:", { folderName, fileName, base64Image });


        if (!folderName || !fileName || !base64Image) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        await uploadBase64Image(folderName, fileName, base64Image);

        return NextResponse.json({ message: `File "${fileName}" uploaded successfully` }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}