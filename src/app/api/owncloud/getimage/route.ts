import axios from "axios";

import { NextResponse } from "next/server";

const BASE_URL = "https://image.cloudority.com"
const USERNAME = process.env.OWNCLOUD_USERNAME || "";
const PASSWORD = process.env.OWNCLOUD_PASSWORD || "";


async function getBinaryImageAs64(folderName: string, fileName: string): Promise<String> {
    try {
        const credentials = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
        const url = `${BASE_URL}/remote.php/dav/files/${USERNAME}/${folderName}/${fileName}`;
        const response = await axios.get(url, {
            headers: {
                "Accept": "image/png",
                "Authorization": `Basic ${credentials}`
            },
            responseType: 'arraybuffer'
        });
        if (response.status == 404) {
            throw new Error(`File not found: ${response.statusText}`);
        }
        if (response.status !== 200) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const imageBuffer = Buffer.from(response.data, 'binary');
        const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
        return base64Image;

    } catch (error) {
        console.error("Error fetching image:", error);
        throw error;
    }
}


export async function GET(req: Request) {
    try {

        const { searchParams } = new URL(req.url);
        const folderName = searchParams.get("folderName") || "images";
        const fileName = searchParams.get("fileName") || "default.png";
      
        console.log("Received data:", { folderName, fileName });

        if (!folderName || !fileName) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        const retImage = await getBinaryImageAs64(folderName, fileName);

        return NextResponse.json({ image: retImage }, { status: 200 });

    } catch (e: any) {
        console.error("Error:", {
            message: e.message,
            response: e.response?.data,
            status: e.response?.status
        })

        return NextResponse.json({ error: "Failed to get image" }, { status: 500 });
    }
}
