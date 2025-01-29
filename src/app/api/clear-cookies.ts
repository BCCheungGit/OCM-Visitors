import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Set-Cookie', 'next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.status(200).json({ message: "Cookies cleared" });
}
