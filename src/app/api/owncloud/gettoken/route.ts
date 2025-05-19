import axios from "axios";

import { NextResponse } from "next/server";
import { xml2json } from 'xml-js';
const BASE_URL = "https://store.cloudority.com/ocs/v1.php/apps/files_sharing/api/v1/shares"
const USERNAME = process.env.OWNCLOUD_USERNAME || "";
const PASSWORD = process.env.OWNCLOUD_PASSWORD || "";




async function getToken(folderName: string, fileName: string): Promise<String> {
    try {
        const credentials = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
        const url = `${BASE_URL}`;
        const response = await axios.post(url,
            new URLSearchParams({
                name: `${fileName} public link`,
                path: `${folderName}/${fileName}`,
                shareType: '3',
                publicUpload: "false",
                password: '',
                permissions: '1',
                expireDate: '',
                attributes: '[]'
            }),
            {
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'OCS-APIRequest': 'true',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                responseType: 'text',
            });
        if (response.status !== 200) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const xml = response.data;
        
        const json = xml2json(xml, { compact: true, spaces: 4 });
        const jsonData = JSON.parse(json);
        const token = jsonData.ocs.data.token._text;
        if (token) {
            console.log("Token:", token); 
            return token;
        } else {
            throw new Error("Token not found in response data");
        }
    } catch (error: any) {
        console.error("Error getting token:", error);
        throw error;
    }

}


export async function POST(req: Request) {
    try {
        const { folderName, fileName } = await req.json();
        console.log("Received data:", { folderName, fileName });
        if (!folderName || !fileName) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }
        const retToken = await getToken(folderName, fileName);
        return NextResponse.json({ token: retToken }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to create public share" }, { status: 500 });
    }
}


