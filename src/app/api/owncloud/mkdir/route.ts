import axios from "axios";

import { NextResponse } from "next/server";

const BASE_URL = "https://image.cloudority.com"
const USERNAME = process.env.OWNCLOUD_USERNAME || "";
const PASSWORD = process.env.OWNCLOUD_PASSWORD || "";

async function createFolder(folderPath: string): Promise<void>{

    try {
       const url = `${BASE_URL}/remote.php/dav/files/${USERNAME}/${folderPath}`;

        const response = await axios.request({
            method: "MKCOL",
            url: url,
            auth: {
                username: USERNAME,
                password: PASSWORD
            }
        })
        if (response.status !== 201) {
            throw new Error(`Failed to create folder: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error creating folder:", error);
        throw error;
    }
}

export async function POST(req: Request) {
  try {
    const { folderName } = await req.json();

    if (!folderName) {
      return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
    }

    await createFolder(folderName);

    return NextResponse.json({ message: `Folder "${folderName}" created successfully` }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create folder" }, { status: 500 });
  }
}